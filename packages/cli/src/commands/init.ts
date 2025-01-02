import chalk from 'chalk'
import * as fsSync from 'fs'
import * as fs from 'fs/promises'
import inquirer from 'inquirer'
import ora from 'ora'
import * as path from 'path'

const monorepoPath = path.resolve('../../')
const foldersToSkip = [
  'cockroach-data',
  'cli',
  'node_modules',
  'dist',
  'build',
  '.next',
  '.git',
]

async function updatePackageJsonName(destinationPath: string, newName: string) {
  const packageJsonPath = path.join(destinationPath, 'package.json')
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'))
  packageJson.name = newName
  await fs.writeFile(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2),
    'utf8',
  )
}

async function removeAuthorFromPackageJson(packageJsonPath: string) {
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'))
  if (packageJson.author) {
    delete packageJson.author
    await fs.writeFile(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2),
      'utf8',
    )
  }
}

async function copyFileWithReplacement(
  src: string,
  dest: string,
  workspace: string,
) {
  return new Promise((resolve, reject) => {
    const readStream = fsSync.createReadStream(src, { encoding: 'utf8' })
    const writeStream = fsSync.createWriteStream(dest, { encoding: 'utf8' })

    readStream.on('data', (chunk) => {
      const modifiedChunk = chunk
        .toString('utf-8')
        .replace(/@ecom\//g, `${workspace}/`)
      writeStream.write(modifiedChunk)
    })

    readStream.on('end', () => {
      writeStream.end()
      resolve('done')
    })

    readStream.on('error', reject)
    writeStream.on('error', reject)
  })
}

async function copyDirectory(src: string, dest: string, workspace: string) {
  await fs.mkdir(dest, { recursive: true })
  const entries = await fs.readdir(src, { withFileTypes: true })

  for (let entry of entries) {
    if (foldersToSkip.includes(entry.name)) {
      continue
    }

    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath, workspace)
    } else if (entry.name === 'package.json') {
      await copyFileWithReplacement(srcPath, destPath, workspace)
      await removeAuthorFromPackageJson(destPath)
    } else {
      await copyFileWithReplacement(srcPath, destPath, workspace)
    }
  }
}

export const initCommand = async () => {
  const { destination, workspace } = await inquirer.prompt([
    {
      type: 'input',
      name: 'destination',
      message: 'Where would you like to create your monorepo?',
      default: 'monorepo-starter',
    },
    {
      type: 'input',
      name: 'workspace',
      message: 'What would you like to name your workspace?',
      default: '@repo',
    },
  ])

  const destinationPath = path.resolve(process.cwd(), destination)

  try {
    await fs.access(destinationPath)
    console.error(
      chalk.red(
        'The directory already exists. Please choose a different name.',
      ),
    )
    return
  } catch {
    // Directory does not exist, proceed with creation
  }

  const spinner = ora('Initializing monorepo...').start()

  try {
    await fs.mkdir(destinationPath, { recursive: true })

    await copyDirectory(monorepoPath, destinationPath, workspace)
    const folderName = path.basename(destinationPath)
    await updatePackageJsonName(destinationPath, folderName)

    spinner.succeed(`Monorepo initialized at ${destinationPath}`)
    console.log(`Run ${chalk.yellow('yarn install')} to install dependencies.`)
    console.log('\n\n' + chalk.hex('#35A4FB')('Happy hacking! 😊'))
  } catch (error) {
    spinner.fail('Failed to initialize monorepo')
    console.error(error)
  }
}
