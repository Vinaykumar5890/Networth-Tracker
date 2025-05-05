#  Loan Management System API

This README provides a comprehensive overview of the Loan Management System API built with Node.js, Express.js, and MongoDB. It outlines the available endpoints, their functionalities, request/response structures, and authentication mechanisms.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Database Connection](#database-connection)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [User Authentication](#user-authentication)
  - [User Management](#user-management)
  - [Customer Management](#customer-management)
  - [Loan Management](#loan-management)
  - [Repayment Management](#repayment-management)
  - [Summary](#summary)
  - [Overdue Loans](#overdue-loans)
  - [Receipt Generation](#receipt-generation)
- [Models](#models)
- [Error Handling](#error-handling)
- [Running the Application](#running-the-application)
- [Similar Themes](#similar-themes)

## Overview

This API provides functionalities for managing users, customers, loans, and repayments. It includes features for user registration and login, customer creation and management, loan creation and retrieval, recording repayments, generating receipts, and providing summary information. The API utilizes JWT for authentication to secure access to protected routes.

## Technologies Used

- **Node.js:** JavaScript runtime environment.
- **Express.js:** Minimal and flexible Node.js web application framework.
- **MongoDB:** NoSQL database for storing application data.
- **Mongoose:** MongoDB object modeling tool designed to work in an asynchronous environment.
- **jsonwebtoken:** Library for creating and verifying JSON Web Tokens for authentication.
- **bcrypt:** Library for hashing passwords securely.
- **cors:** Middleware to enable Cross-Origin Resource Sharing.
- **date-fns:** Modern JavaScript date utility library.
- **body-parser:** Middleware to parse request bodies.
- **dotenv:** Module to load environment variables from a `.env` file.

## Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Vinaykumar5890/Networth-Tracker/edit/main/README.MD
    cd Networth-Tracker
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the root directory and configure the following environment variables:
    ```env
    MONGODB_URI=mongodb+srv://<username>:<password>@<cluster_url>/<database_name>?retryWrites=true&w=majority&appName=Cluster0
    JWT_SECRET=your-secret-key
    PORT=3000
    ```
    Replace the placeholders with your actual MongoDB connection string and a secret key for JWT.

## Environment Variables

- `MONGODB_URI`: The connection string for your MongoDB database.
- `JWT_SECRET`: The secret key used to sign and verify JWT tokens. **Keep this secure!**
- `PORT`: The port on which the server will listen (default is 3000).

## Database Connection

The application connects to the MongoDB database using Mongoose. The connection URI is read from the `MONGODB_URI` environment variable.

```javascript
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(err));
