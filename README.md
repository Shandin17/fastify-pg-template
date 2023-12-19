Switch between the different branches to choose the template that best suits your needs.

# Project Name

## Table of Contents

1. [Build and Start](#build-and-start)
2. [Development Workflow](#development-workflow)
3. [Database Migrations](#database-migrations)
4. [Tests](#tests)
5. [Linting and Formatting](#linting-and-formatting)

## Build and Start

`npm run build`: Removes the `dist` directory and compiles TypeScript files

`npm run start`: Starts the application from the built files in the `dist` directory

`npm run build:start`: Builds the application and starts it

## Development Workflow

`npm run watch`: Starts the TypeScript compiler in watch mode

`npm run dev`: Starts the app in development mode, automatically restarting the server when changes are detected

## Database Migrations

`npm run db:migrate`: executes the SQL migration files against the database

`npm run db:migrate:dev`: creates new migration .sql files, executes the SQL migration file against the database and generates Prisma Client (type-safe database client)

`npm run db:generate`: Generates Prisma Client (type-safe database client)

## Tests

`npm run test`: Runs your project tests

## Linting and Formatting

`npm run lint`: Runs linting with ESLint and checks formatting with Prettier

`npm run fmt`: Formats your code with Prettier
