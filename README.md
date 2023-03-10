# G2_Assessment

This project consists of a client-side application built using React and Material-UI, and a server-side application built using Node.js and Express. The server-side application connects to a PostgreSQL database and provides API endpoints that the client-side application uses to fetch and manipulate data.

## Installation

1. Clone this repository to your local machine.
2. Navigate to the client folder and run `npm install` to install client-side dependencies.
3. Navigate to the server folder and run `npm install` to install server-side dependencies.
4. Import the `DB_dump.sql` file into your PostgreSQL database to create the necessary tables and data.

## Usage

1. Navigate to the server folder, configure the `.env` file with `port` number and run `npm start` to start the server-side application.
2. Navigate to the client folder, configure the `.env` file with `API_URL` and run `npm start` to start the client-side application.
3. Open your web browser and navigate to `http://localhost:3000` to use the application.

## Features

- The client-side application provides a user interface for viewing data stored in the PostgreSQL database.
- The server-side application provides RESTful API endpoints that the client-side application uses to fetch and manipulate data.
- The server-side application uses the pg library to connect to the PostgreSQL database and perform SQL queries.

## Technologies Used

- React
- Material-UI
- Material-UI data-grid
- Node.js
- Express
- PostgreSQL

## License

This project is licensed under the MIT License.
