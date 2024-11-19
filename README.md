# User Management App

## Overview

The User Management App is a simple CRUD (Create, Read, Update, Delete) web application built using **Node.js**, **Express**, and **MongoDB**. The app allows you to manage users by adding, updating, deleting, and viewing user information such as their name, email, company, and job title.

## Routes

- **GET /**: Displays a list of all users.
- **GET /contacts**: Shows a form to add a new user.
- **POST /contacts**: Submits the form and adds a new user to the system.
- **GET /contacts/:id**: Displays a form to edit an existing user's details.
- **PUT /contacts/:id**: Updates the details of an existing user.
- **DELETE /contacts/:id**: Deletes a user from the database.

## Technical Details

This app uses the following technologies:

- **Node.js**: A runtime environment for executing JavaScript server-side.
- **Express.js**: A lightweight web framework for building server-side applications in Node.js.
- **MongoDB**: A NoSQL database for storing user data. Mongoose is used to interact with MongoDB.
- **EJS**: A templating engine used to dynamically render HTML views on the client side.
- **Joi**: A data validation library used to validate user inputs in the app.

## Challenges & Solutions

### Handling Asynchronous Operations

One of the major challenges I faced during development was properly handling asynchronous operations, especially with database queries. There were instances where errors were not properly handled, which could lead to unexpected application crashes.

**Solution**: To address this, I created a custom middleware function called `wrapAsync`. This middleware was used to wrap all asynchronous route handlers, ensuring that any errors are passed to the global error handler. This approach centralized error handling and reduced redundancy in the code.

### MongoDB Database Connection

Connecting the app to MongoDB initially presented some challenges, especially when setting up MongoDB Atlas or ensuring the local MongoDB server was running.

**Solution**: I made sure to include proper checks for database connection status in the `index.js` file and ensured the MongoDB instance was running before attempting a connection. If using MongoDB Atlas, I verified the connection string was correct.
