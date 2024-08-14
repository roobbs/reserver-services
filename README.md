# Service Provider Application API

This is the backend for my Reserver application, t serves as a REST API for this frontend application, allowing users to manage services, dates, create their own services and more. This backend aplication uses Google Oauth and JWT authentication using Passport JS.

## Table of Contents
- [Description](#description)
- [Technologies Used](#technologies-used)
- [Features](#features)

## Description
The Service Provider Application API is built using Node.js and Express. It provides endpoints for managing service providers, their services, and user authentication. The database is managed with MongoDB, with Mongoose used for data modeling. User authentication is handled using PassportJS with JWTs (JSON Web Tokens), and passwords are securely stored using bcryptjs.

## Technologies Used
- **Node.js**: JavaScript runtime for building the server-side application.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **PassportJS**: Middleware for authentication.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **bcryptjs**: Library for hashing passwords.

## Features
- **Service Management**: Create, read, update, and delete services offered by providers.
- **User Authentication**: Register and log in users securely.
- **Business Management**: Manage businesses associated with users, including listing all businesses except the user's own.
- **Token-based Authentication**: Uses JWTs for managing user sessions.
- **Secure Password Storage**: Passwords are hashed using bcryptjs.
