# Loan Management System API

This is a RESTful API built with Node.js and Express, providing functionalities for user authentication, customer management, loan management, and repayment tracking. It uses MongoDB for data persistence.

## Features

* **User Authentication:**
    * User registration (`/register`)
    * User login (`/login`) with JWT token-based authentication.
    * Protected routes using JWT authentication middleware.
    * Fetching all registered users (`/users`).
* **Customer Management:**
    * Registering new customers (`/customer`).
    * Fetching all customers (`/customer`).
    * Fetching customers associated with a specific user ID (`/customer/:userid`).
    * Fetching a specific customer by user ID and customer ID (`/customer/:userid/:id`).
    * Deleting a specific customer by user ID and customer ID (`/customer/:userid/:id`).
    * Updating customer information by user ID and customer ID (`/customer/:userid/:id`).
* **Loan Management:**
    * Creating new loan records (`/loan`).
    * Fetching all loan records (`/loan`).
    * Fetching all loan records associated with a specific user ID (`/loan/:userid/`).
    * Fetching a specific loan record by user ID and loan ID (`/loan/:userid/:id`).
* **Repayment Tracking:**
    * Recording loan repayments (`/repayment`).
    * Generating a summary of loan activities (total loans, total amount, total repayments) (`/summary`).
    * Fetching all overdue loans (`/overdue`).
* **Receipt Generation:**
    * Generating PDF receipts for loan repayments (`/receipt/:id`).

## Technologies Used

* Node.js
* Express
* MongoDB
* Mongoose
* jsonwebtoken
* bcrypt
* date-fns
* body-parser
* cors
* dotenv
* PDFKit (for receipt generation - likely used within `./receiptGenerator.js`)

## Setup

1.  **Clone the repository** (if you have one).
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file** in the root directory and add your MongoDB connection string:
    ```env
    MONGODB_URI="your_mongodb_connection_string"
    JWT_SECRET="your_jwt_secret_key" # Consider a more descriptive name
    ```
    Replace `"your_mongodb_connection_string"` with your actual MongoDB Atlas connection string and `"your_jwt_secret_key"` with a strong, random secret key for JWT.
4.  **Run the server:**
    ```bash
    npm start
    ```
    The server will start on port 3000. You should see the message `✅ Server is running and DB Connected...` in your console.
