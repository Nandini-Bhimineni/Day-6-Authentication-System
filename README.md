# Authentication System API

A simple Node.js Authentication System using Express, MongoDB, JWT, and Bcrypt.

---

## Features

- User Registration
- User Login
- Password Hashing using Bcrypt
- JWT Authentication
- Protected Routes
- MongoDB Database Connection
- Input Validations
- Error Handling

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- BcryptJS
- Dotenv

---

## Project Structure

```bash
project/
│
├── models/
│   └── User.js
│
├── routes/
│   └── authRoutes.js
│
├── middleware/
│   └── authMiddleware.js
│
├── .env
├── server.js
├── package.json


---


Install Dependencies

npm install


---

Create .env File

MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key


---

Run Project

npm start

Server runs on:

http://localhost:5000


---

API Endpoints

Register User

POST

/auth/register

Request Body

{
  "name": "Nandu",
  "email": "nandu@gmail.com",
  "password": "123456"
}

Response

{
  "message": "User Registered Successfully"
}


---

Login User

POST

/auth/login

Request Body

{
  "email": "nandu@gmail.com",
  "password": "123456"
}

Response

{
  "message": "Login Successful",
  "token": "jwt_token"
}


---

Protected Route

GET

/auth/profile

Headers

Authorization : jwt_token

Response

{
  "_id": "...",
  "name": "Nandu",
  "email": "nandu@gmail.com"
}


---

Validations

Empty fields validation

Email format validation

Password length validation



---

Status Codes

Status Code	Meaning

200	Success
201	Created
400	Bad Request
401	Unauthorized
500	Server Error



---

Author

Nandini
