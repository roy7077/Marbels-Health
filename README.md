# Marbels Health

Marbels Health is a web application for managing user information. It allows you to create, view, edit, and delete users. The frontend is built with React and TypeScript, and the backend is built with Node.js, Express.js, and MongoDB.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Application](#running-the-application)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- Create new users
- View all users
- Edit user details
- Delete users

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/roy7077/Marbels-Health.git
    cd Marbels-Health
    ```

2. Install the dependencies for both frontend and backend:

    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

## Running the Application

### Frontend

1. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Start the React development server:

    ```bash
    npm start
    ```

   The frontend should now be running at `http://localhost:3000`.

### Backend

1. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Start the Node.js server:

    ```bash
    npm start
    ```

   The backend should now be running at `http://localhost:8080`.

   Note: The backend is also hosted on Render. You can access it at `https://marbels-health.onrender.com/`.

## API Endpoints

### User Endpoints

- **Get All Users**
> GET /api/v1/showAllUsers

Query Parameters:
- `page`: Page number (default is 1)
- `limit`: Number of users per page (default is 2)

- **Get User Details**
> GET /api/v1/userDetails

Query Parameters:
- `userID`: ID of the user

- **Create User**
> POST /api/v1/createUser

Request Body:
- `name`: string
- `emailID`: string
- `contactNumber`: string
- `DOB`: string
- `userDescription`: string

- **Update User**
> PUT /api/v1/updateUser

Request Body:
- `userID`: string
- `name`: string
- `emailID`: string
- `contactNumber`: string
- `DOB`: string
- `userDescription`: string

- **Delete User**
> DELETE /api/v1/removeUser


Query Parameters:
- `userID`: ID of the user

## Technologies Used

- **Frontend:**
- React
- TypeScript
- CSS

- **Backend:**
- Node.js
- Express.js
- MongoDB

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

