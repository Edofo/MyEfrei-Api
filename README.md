# Project Name

Description of the project.

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `yarn install`

## Configuration

1. Create a `.env` file in the root directory.
2. Set the following environment variables in the `.env` file:

```
PORT=4000
DATABASE_URL=postgresql://postgres:root@127.0.0.1:5432/webservice
JWT_SECRET=token
```

## Database Setup

To setup the database, execute the following command:

```
yarn prisma:generate
```

This will generate the Prisma client and the Prisma schema. Make sure you have the necessary database connection details configured in your .env file before running the generator.

## Database Migration

To run database migrations, execute the following command:

```
yarn prisma:migrate
```

This will continue executing the Prisma migration scripts and update the database accordingly. Make sure you have the necessary database connection details configured in your .env file before running the migration.

## Database Seeding

To run database seeding, execute the following command:

```
yarn seed
```

This will run the prisma/seed.ts script using ts-node to populate the database with initial data.

## Running the Application

To run the application, execute the following command:

```
yarn start:dev # For development
yarn start:prod # For production
```

## Usage

API GraphQL For MyEfrei Project

## Credits

-   Nolan LEBOUCHER

Happy coding!
