# Turbo Stack CLI

**Turbo Stack CLI** is a command-line tool to bootstrap a preconfigured monorepo architecture optimized for modern development workflows. It simplifies creating a scalable and consistent development environment.

## Features

- **TurboRepo Integration**: Efficient build system with caching and parallelization ([Learn more](https://turbo.build/repo)).
- **i still**
  - **Web**: A Next.js app preconfigured for building modern web applications ([Learn more](https://nextjs.org/)).
  - **Workshop**: A Storybook app using Vite and React ([Learn more](https://storybook.js.org/)).
- **Reusable Packages**:
  - **UI**: Optionally based on ShadCN UI ([Learn more](https://shadcn.dev/)).
  - **Database**: Prisma ORM setup with TSUP for building ([Learn more about Prisma](https://www.prisma.io/) | [Learn more about TSUP](https://tsup.egoist.dev/)).
  - **Config**: Centralized configuration for Prettier ([Learn more](https://prettier.io/)), ESLint ([Learn more](https://eslint.org/)), and TypeScript ([Learn more](https://www.typescriptlang.org/)).
- **Continuous Integration**: Predefined GitHub Actions workflow to ensure code quality ([Learn more](https://docs.github.com/en/actions)).
- **Developer Tooling**: VSCode settings and various utility configurations.

---

## Generated Project Structure

```
.
├── .github                   # Contains CI workflows.
│   └── workflows             # Predefined GitHub Actions.
├── .turbo                    # TurboRepo configuration.
│   ├── cache                 # Cache directory for TurboRepo builds.
│   ├── cookies               # TurboRepo state management.
│   └── daemon                # TurboRepo daemon configurations.
├── .vscode                   # VSCode workspace configurations.
│   └── settings.json         # Settings for consistent development experience.
├── apps                      # Applications in the monorepo.
│   ├── web                   # Next.js app configured with next-intl.
│   └── workshop              # Storybook app using Vite and React.
├── packages                  # Shared libraries and configurations.
│   ├── config                # Centralized ESLint, Prettier, and TypeScript configs.
│   ├── database              # Prisma ORM setup with TSUP packaging.
│   └── ui                    # Optionally based on ShadCN reusable UI components.
├── .env                      # Environment variables.
├── .eslintrc.js              # ESLint configuration.
├── .gitignore                # Files and directories ignored by Git.
├── .npmrc                    # npm settings.
├── .prettierignore           # Files and directories ignored by Prettier.
├── .prettierrc.js            # Prettier configuration.
├── README.md                 # Project documentation.
├── cspell.json               # Spell checker configuration ([Learn more](https://cspell.org/)).
├── docker-compose.yml        # Docker services configuration.
├── package.json              # Monorepo's package manifest.
├── tsconfig.json             # Base TypeScript configuration.
├── turbo.json                # TurboRepo configuration.
└── yarn.lock                 # Yarn dependency lockfile.
```

### Folder and File Descriptions

#### **.github/workflows**

Contains the CI workflows. The preconfigured workflow checks:

1. Spelling (using `cspell`).
2. Linting (using ESLint).
3. Type-checking (using TypeScript).
4. Build integrity (ensures packages/apps build successfully).

#### **.turbo**

TurboRepo's configuration folder, managing caching and execution contexts.

#### **.vscode/settings.json**

Default Visual Studio Code workspace settings for a consistent developer experience.

#### **apps/web**

Next.js application preconfigured with `next-intl` for handling translations and localization efficiently ([Learn more about next-intl](https://github.com/amannn/next-intl)).

#### **apps/workshop**

Storybook application built with Vite and React to showcase and test reusable components ([Learn more](https://storybook.js.org/)).

#### **packages/ui**

Reusable UI components optionally based on ShadCN UI ([Learn more](https://shadcn.dev/)).

- Includes foundational components like `Button`, `Input`, `Select`, and more.

#### **packages/database**

Prisma ORM configuration for managing database queries ([Learn more](https://www.prisma.io/)).

- Built with TSUP for packaging.

#### **packages/config**

Shared configurations for the monorepo:

- Prettier
- ESLint
- TypeScript

#### **Root Files**

- `.env`: Environment variables.
- `.eslintrc.js`: ESLint configuration file.
- `.gitignore`: Ignored files for version control.
- `.npmrc`: npm settings file.
- `.prettierignore` and `.prettierrc.js`: Prettier configurations.
- `cspell.json`: Spell checking settings ([Learn more](https://cspell.org/)).
- `docker-compose.yml`: Configuration for running services with Docker.
- `package.json`: Monorepo's package manifest.
- `tsconfig.json`: Base TypeScript configuration.
- `turbo.json`: TurboRepo configuration.
- `yarn.lock`: Yarn dependency lockfile.

---

## Usage

### Installation

1. Install the CLI globally:

   ```bash
   npm install -g mono-starter
   ```

2. Create a new monorepo:

   ```bash
   npx mono-starter init
   ```

3. Follow the prompts to set up the project.

### Post-Initialization Steps

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Run the preconfigured CI workflow locally:

   ```bash
   yarn lint
   yarn type-check
   yarn build
   ```

3. Start development servers:

   - Web app:
     ```bash
     yarn dev:web
     ```
   - Workshop:
     ```bash
     yarn dev:workshop
     ```

---

## Documentation for Generated Files

### **Next.js App (Web)**

- **Features**: Internationalization using `next-intl`.
- **Start**: `yarn dev:web`.

### **Storybook App (Workshop)**

- **Features**: Component testing and documentation.
- **Start**: `yarn dev:workshop`.

### **UI Package**

- **Technology**: Optionally based on ShadCN.
- **Usage**: Import components in the web app or workshop.

### **Database Package**

- **Technology**: Prisma.
- **Usage**: Shared ORM for all apps in the monorepo.

### **Config Package**

- **Technology**: Centralized ESLint, Prettier, and TypeScript configurations.
- **Usage**: Automatically applied across the monorepo.

---

## Contributing

Feel free to contribute by submitting issues or pull requests. Ensure all workflows pass locally before submitting.

---

## License

MIT License
