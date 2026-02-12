# Intersindical Canarias - Hospital University of Tenerife Management System

## Overview

This project is a comprehensive management system for **Intersindical Canarias**, designed to manage users and provide a quiz/opposition training platform for various professional branches at the University Hospital of Tenerife.

The system is composed of two main parts:
1.  **Backend**: A Node.js/Express API that manages authentication, user storage, and email notifications.
2.  **Frontend**: A React/Vite application that provides the user interface for taking quizzes and an administration panel for user management.

## Tech Stack

### Backend
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: MariaDB (via Sequelize ORM)
*   **Authentication**: JWT (JSON Web Tokens)
*   **Email**: Nodemailer
*   **Key Libraries**: `bcrypt` (hashing), `morgan` (logging), `cors` (Cross-Origin Resource Sharing)

### Frontend
*   **Build Tool**: Vite
*   **Framework**: React
*   **UI Library**: Material UI (MUI)
*   **Routing**: React Router DOM
*   **HTTP Client**: Axios

## Project Structure

```
intersindicalCanarias/
├── backend/                # Server-side logic
│   ├── api/
│   │   ├── controllers/    # Request handlers (Auth, etc.)
│   │   ├── models/         # Sequelize database models
│   │   └── routes/         # API endpoint definitions
│   ├── database/           # DB connection and associations
│   └── index.js            # Entry point
├── frontend/               # Client-side application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Full page views
│   │   ├── questionsData/  # Quiz data (json/js files)
│   │   ├── router/         # Navigation configuration
│   │   └── services/       # API integration
│   └── vite.config.js      # Vite configuration
└── README.md               # Project documentation
```

## Setup & Installation

### Prerequisites
*   Node.js (v16+ recommended)
*   MariaDB or MySQL server

### Backend Setup
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment Variables:
    Create a `.env` file in the `backend` folder based on the example/requirements:
    ```env
    DATABASE=your_database_name
    USERNAME=your_db_user
    PASSWORD=your_db_password
    HOST=your_db_host
    DIALECT=mariadb
    PORT=3000
    SECRET=your_jwt_secret
    SMTP_HOST=your_smtp_host
    ... (SMTP credentials)
    ```
4.  Start the server:
    ```bash
    npm start
    # or for development
    npm run dev
    ```

### Frontend Setup
1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## Features

*   **User Authentication**: Secure Sign-up and Login using JWT.
*   **Role-Based Access**: Separation between regular users and administrators.
*   **Quiz Engine**: Specialized test/exam interface for different professional categories (Laboral, Estatutaria).
*   **Administration Panel**: Interface to manage registered users.
*   **Email Notifications**: Automated emails for registration and password recovery.

## Architecture Notes

*   **User Model**: The `Admin` model serves as the primary user entity. It allows for distinguishing between regular users and administrators via the `isAdmin` flag.
*   **Multi-Hospital Support**: The system supports users from various hospitals and work centers.

## Deployment

The application is designed to be deployed with the backend serving as an API and the frontend as a static site (built via `vite build`) or served via a separate frontend server.
