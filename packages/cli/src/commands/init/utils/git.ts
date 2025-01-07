import ora from 'ora'
import simpleGit from 'simple-git'

const git = simpleGit()

export async function cloneRepo(repoUrl: string, dest: string) {
  const spinner = ora('Cloning repository...').start()
  await git.clone(repoUrl, dest)
  spinner.succeed('Repository cloned successfully')
}
