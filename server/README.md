# Server README

This folder contains the server-side application for the project. The server is built using Node.js and Express, and provides API endpoints that the client-side application uses to fetch and manipulate data.

## Installation

- Run npm install to install the required dependencies.
- Import the DB_dump.sql file into your PostgreSQL database to create the necessary tables and data.
- Create a .env file with the following variables:
  - PORT=3001
  - PGHOST=localhost
  - PGPORT=5432
  - PGDATABASE=your_database_name
  - PGUSER=your_database_username
  - PGPASSWORD=your_database_password

Replace your_database_name, your_database_username, and your_database_password with your own PostgreSQL database credentials.

## Usage

- Run npm start to start the server.
- The server will run on http://localhost:3001.

## Endpoints

- GET /api/v1/accounts: Returns a list of all accounts.
- GET /api/v1/accounts: Returns a list of all business units.
- GET /api/v1/finance_data: Returns a list of all financial data. Accepts account name & business_unit name as query params

## Technologies Used

1. Node.js
2. Express
3. PostgreSQL
4. cors
5. dotenv
6. express
7. helmet
8. knex

## License

This project is licensed under the MIT License.
