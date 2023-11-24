# Token-Based Authentication with Node, React, and TypeScript

This project implements Token-Based Authentication (JWT) using Node.js for the backend and React with TypeScript for the frontend.

## Overview

Token-Based Authentication is a secure way to authenticate users by issuing a unique token upon successful login. This token is then used to access protected routes or resources.

### Features

- **JWT Implementation**: Secure user authentication using JSON Web Tokens.
- **Node.js Backend**: Backend server built using Node.js for handling authentication and authorization.
- **React Frontend**: User interface developed with React and TypeScript for seamless interaction.

## Challenges Faced

Throughout the development process, a few challenges were encountered, including:

- **Cross-Origin Resource Sharing (CORS)**: Handling CORS issues when making requests from the frontend to the backend.
- **Type Safety in Frontend**: Ensuring type safety in the React components and handling TypeScript-specific issues.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js installed on your machine.

### Backend Setup

1. Navigate to the `backend` directory.
2. Install dependencies using `npm install`.
3. Set up environment variables for database connection, JWT secret, etc.
4. Start the server using `npm start`.

### Frontend Setup

1. Navigate to the `frontend` directory.
2. Install dependencies using `npm install`.
3. Configure backend API URL in the environment file.
4. Start the frontend using `npm start`.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend server.
- **React**: JavaScript library for building the user interface.
- **TypeScript**: Superset of JavaScript providing static typing for enhanced code quality.
- **JSON Web Tokens (JWT)**: Secure method for user authentication.
- **Express**: Web framework for Node.js backend.

