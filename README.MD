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


## Authentication
The API uses JSON Web Tokens (JWT) for authentication.
 -` Login `: Upon successful login (/login), the API returns a JWT token.
 -` Authorization`: Protected routes require the JWT token to be included in the Authorization header as a Bearer token.
 -` Middleware`: The authenticateToken middleware verifies the JWT token before allowing access to protected routes.
``` json 
function authenticateToken(request, response, next) {
  // ... (code for token verification)
}
```

** API Endpoints **

### User Authentication

  - POST `/register`: Registers a new user.

  - Request Body:

  ``` json
 {
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "securepassword"
  }

 ```
### Response:
 
 ``` bash
Status 200: "Register    Succesfully 
```

``` bash
  Status 400: "User Already Exist", "All fields are required", "Password Too Short"
```

``` bash 
Status 500: "Internal Server Error"
```


 - POST `/login`: Logs in a existing user and returns a JWT token.
  
- Request Body:
   
``` json 
{
  "email": "existinguser@example.com",
  "password": "correctpassword"
}
```

   - Response:

     ``` bash 
       Status 200:
       {
      "jwtToken": "your.jwt.token"
       }

    ```

   ``` bash 
    Status 400: "User Doesn't Exits",    "All fields are required"        Invalid Password"

  ```

```bash 

      Status 500: "Server Error"
            User Management

```



- GET `/users`: Retrieves a list of all registered users (requires authentication).

   -Headers: Authorization:` Bearer <your_jwt_token> `

   - Response:

     ``` bash 
Status 200: An array of user objects.

```
    ```bash 
      Status 401: "Your Not Authorized User"

```
``` bash 
      Status 500: "Internal Server Error"
```
###Customer Management

 - POST `/customer`: Registers a new customer (requires authentication).

   - Headers: Authorization: Bearer  `<your_jwt_token>`

   - Request Body:

  ``` json  
{
  "userid": "user123",
  "name": "John Doe",
  "phone": "1234567890",
  "trustScore": 0.8
}
```

   - Response:
     ``` bash 
Status 200: "Customer Register Succesfully"
 ```
```bash
      Status 400: "Customer Already Exist", "All fields are required"
```
```bash
      Status 401: "Your Not Authorized User"
```
```bash
      Status 500: "Internal Server Error"
```

 - GET `/customer`: Retrieves a list of all registered customers (requires authentication).

   - Headers: Authorization: Bearer <your_jwt_token>

   - Response:

     ```bash
Status 200: An array of customer 
objects.
```
```bash 
      Status 401: "Your Not Authorized User"
```
```bash
      Status 500: "Internal Server Error"
```
 - GET `/customer/:userid`: Retrieves customers associated with a specific user ID (requires authentication).

   - Headers: Authorization: Bearer <your_jwt_token>

   - Path Parameter: userid (the ID of the user).

   - Response:
     ``` bash 
Status 200: An array of customer objects for the given user.
```
``` bash 
     Status 401: "Your Not Authorized User"
```
```bash
      Status 404: {"message": "No customer found for this user."}
```
```bash
      Status 500: "Internal Server Error"
```

 - GET `/customer/:userid/:id`: Retrieves a specific customer by user ID and customer ID (requires authentication).

   -Headers: Authorization: Bearer <your_jwt_token>

   - Path Parameters:
      -userid (the email of the user).
      - id (the ID of the customer).
   - Response:
     ```bash 
Status 200: A single customer object.
```
```bash 
      Status 400: "All fields are required"
```
```bash 
      Status 401: "Your Not Authorized User"
```
```bash 
      Status 404: {"message": "No customer found for this user."}
```
```bash
      Status 500: "Internal Server Error"
```
 - DELETE `/customer/:userid/:id`: 

Deletes a specific customer by user ID and customer ID (requires authentication).

   - Headers: Authorization: Bearer <your_jwt_token>

   -Path Parameters:
     - userid (the email of the user).
     - id (the ID of the customer).
   - Response:
```bash 
      Status 200: "Customer Deleted Succesfully"
```
```bash 
      Status 400: "All fields are required"
```
```bash
      Status 401: "Your Not Authorized User"
```
```bash 
      Status 404: {"message": "No customer found for this user."}
```
```bash
      Status 500: "Internal Server Error"
```
 - PUT `/customer/:userid/:id`: Updates a specific customer by user ID and customer ID (requires authentication).

   - Headers: Authorization: Bearer <your_jwt_token>
   - Path Parameters:
     - userid (the email of the user).
     -id (the ID of the customer).
   * Request Body: The customer object with updated fields.
```json
     {
  "name": "Jane Doe",
  "phone": "0987654321",
  "trustScore": 0.9
}
```

   - Response:
    ```bash 
 Status 200: The updated customer object.
```
```bash
      Status 400: "All fields are required"
```
```bash 
      Status 401: "Your Not Authorized User"
```
```bash
      Status 404: {"message": "No customer found for this user."}
```
```bash 
      Status 500: "Internal Server Error"
```
### Loan Management
 -POST `/loan` : Creates a new loan (requires authentication).

   -Headers: Authorization: Bearer <your_jwt_token>

   - Request Body:
``` json
     {
  "customerid": "customer123",
  "userid": "user123",
  "item": "Personal Loan",
  "amount": 10000,
  "issueDate": "2025-05-10",
  "dueDate": "2026-05-10",
  "frequency": "monthly",
  "interest": 0.05,
  "graceDays": 7
}
```

   - Response:
     ```bash 
Status 201: "Loan Created Successfully"
```

    ```bash * Status 401: "Your Not Authorized User"
```
```bash
      Status 500: "Error creating loan"
```
- GET `/loan`: Retrieves a list of all loans (requires authentication).

   - Headers: Authorization: Bearer <your_jwt_token>

   -Response:
```bash
      Status 200: An array of loan objects.
```
```bash
      Status 401: "Your Not Authorized User"
```
```bash
      Status 500: "Error fetching loans"
```
 - GET `/loan/:userid/`: Retrieves all loans associated with a specific user ID like email (requires authentication).

   - Headers: Authorization: Bearer <your_jwt_token>

   -Path Parameter: userid (the email of the user).

   - Response:
```bash
      Status 200: An array of loan objects for the given user.
```
```bash
      Status 400: "All fields are required"
```
```bash
      Status 401: "Your Not Authorized User"
```
```bash
      Status 404: {"message": "No customer found for this user."}
```
```bash
      Status 500: "Internal Server Error"
```
 -GET `/loan/:userid/:id`: Retrieves a specific loan by user ID and loan ID (requires authentication).

   - Headers: Authorization: Bearer <your_jwt_token>

   - Path Parameters:
     -userid (the email of the user).
     -id (the ID of the loan).
   - Response:
     ```bash
      Status 200: A single loan object.
```
```bash 
      Status 400: "All fields are required"
```
```bash
     Status 401: "Your Not Authorized User"
```
```bash
     * Status 404: {"message": "No Loans found for this user."}
```
```bash
      Status 500: "Internal Server Error"
```

### Repayment Management
 - POST `/repayment`: Records a loan repayment (requires authentication).

   -Headers: Authorization: Bearer <your_jwt_token>

   - Request Body:

```json
     {
  "loanid": "loan123",
  "amount": 2000,
  "date": "2025-06-10"
}
```

   - Response:
```bash
      Status 201: "Repayment Recorded"
```
```bash
      Status 401: "Your Not Authorized User"
```
```bash
      Status 404: "Loan not found"
      Status 500: "Error recording repayment"
```

### Summary
 - GET /summary: Retrieves a summary of total loans, total loan amount, and total repayments (requires authentication).
   - Headers: Authorization: Bearer <your_jwt_token>
   -Response:
     ```bash 
Status 200:
```
```json 
       {
  "totalLoans": 50,
  "totalAmount": 500000,
  "totalRepayments": 100
}
```
  ```bash
      Status 401: "Your Not Authorized User"
      Status 500: "Error fetching summary"
```

### Overdue Loans
 - GET `/overdue`: Retrieves a list of all overdue loans (where status is "pending") (requires authentication).

   - Headers: Authorization: Bearer <your_jwt_token>

   - Response:

   ```bash
      Status 200: An array of overdue loan objects.
      Status 401: "Your Not Authorized User"
      Status 500: "Error fetching overdue loans"
```

### Receipt Generation
 - GET `/receipt/:id`: Generates a PDF receipt for a specific loan ID.

   - Path Parameter: id (the ID of the loan).

   - Response: A PDF file stream as the response.

###Models

The application uses Mongoose to define the data models:

 - Registeruser (./model.js): Represents registered users with username, email, and password (hashed).
 - Customer (./model1.js): Represents customer information with userid, name, phone, and trustScore.
 - Loan (./model2.js): Represents loan details with customerid, userid, item, amount, issueDate, dueDate, frequency, interest, graceDays, and balance.
 -  Repayment (./model3.js): Represents repayment records with loanid, amount, and date.

### Error Handling

- The API implements basic error handling by returning appropriate HTTP status codes and error messages in the response body. Common error scenarios include:

 - 400 Bad Request: Invalid input data, missing required fields.
 - 401 Unauthorized: Invalid or missing JWT token for protected routes.
 -  404 Not Found: Requested resource not found.
 - 500 Internal Server Error: An unexpected error occurred on the server.

### Running the Application

 - Navigate to the project directory:
   cd Networth-Tracker 

 - Start the server:

  ```bash
   npm start
```

-The server will start listening on the port specified in the .env file (default is 3000). You can then access the API endpoints using tools like Postman or curl.

### Similar Themes
 - Financial Management Systems
 - Microfinance Applications
 - Lending Platforms


