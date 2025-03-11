# simple_task

# SimpleTask – To-Do List Web Application

This repository contains a **full-stack** to-do list web application called **SimpleTask**. It provides user authentication, task management with CRUD operations, CSV file imports for bulk task creation, and search/filter functionality. Users can securely register, log in, and manage their personal tasks—complete with due dates, priorities, categories, and more.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Installation & Setup Guide](#installation--setup-guide)
6. [Environment Variables](#environment-variables)
7. [API Documentation](#api-documentation)
   - [Authentication Routes](#authentication-routes)
   - [Task Routes](#task-routes)
   - [CSV Import](#csv-import)
8. [How to Use the App](#how-to-use-the-app)

---
## Project Overview

**SimpleTask** is designed to help users organize and track their tasks. By creating an account, users can add new tasks, set priorities and due dates, categorize their tasks, and mark tasks as completed. The application supports secure JWT-based authentication and stores user and task data in a PostgreSQL database using Sequelize. Tasks can also be imported in bulk via a CSV file upload, saving time when migrating or adding multiple tasks at once.

---

## Features
1. **User Registration & Login**: Users can create an account and authenticate with a secure password (hashed via 'bcryptjs'). JSON Web Tokens (JWT) are issued at login and must be provided for all subsequent task-related requests.
2. **Task Management (CRUD)**:
- **Create** a new task with title, description, priority, status, due date, and category.
- **Read** (view) tasks, either all or filtered by priority, status, category, or search term.
- **Update** an existing task (edit title, description, status, etc.).
- **Delete** a task that's no longer needed.
3. **Search & Filtering**: Easily locate tasks by title (partial search) and filter by priority, status, or category.
4. **CSV Import**: Users can upload a CSV file to add multiple tasks in bulk. The server parses and inserts them into the user's task list.
**Responsive Frontend**: A React-based interface with pages for user authentication, viewing tasks, creating tasks, importing CSV, and more.
6. **Secure Data**: Passwords are hashed with 'bcryptjs'
* JWTs authenticate requests to
protected endpoints. Only the authenticated user can view, modify, or delete their own tasks.
**PostgreSQL Database**: Data is stored in a PostgreSQL database, managed through Sequelize
ORM for easy model definitions and queries.

---
## Technology Stack

### Frontend
- **React** (with Hooks)
- **React Router** for client-side routing
- **Axios** for making HTTP requests to the backend
- **HTML5/CSS3** for UI and styling

### Backend
- **Node.js** & **Express** for the server
- **PostgreSQL** as the main database
- **Sequelize** (ORM) for interacting with PostgreSQL
- **JWT (jsonwebtoken)** for authentication
- **bcryptjs** for password hashing
- **Multer** for handling file uploads (CSV)
- **csv-parser** for parsing CSV files

### Other Tools
- **dotenv** for environment variable management
- **nodemon** (development) for auto-restarts
- **Git** & **GitHub** for version control

---

## Project Structure

**Key Files**:

- **backend/server.js**: Initializes Express, connects to PostgreSQL through Sequelize, sets up `User` and `Task` models, defines routes for authentication and tasks, handles CSV file import logic, and starts the server.
- **backend/models/task.model.js** & **backend/models/user.model.js**: Define Sequelize models for tasks and users, specifying columns and relationships.
- **backend/middleware/authMiddleware.js**: A function that checks the validity of a JWT token in the `Authorization` header, ensuring only logged-in users can access certain routes.
- **frontend/src/pages**: Contains the main pages (Home, Login, Register, TaskMenu, AllTasks, CreateTask, ImportTasks).
- **frontend/src/components**: Contains reusable components (e.g., `TaskSearchFilter.jsx`, `CSVUpload.jsx`) that handle UI logic like searching, filtering, and CSV uploads.

---

## Installation & Setup Guide

### Prerequisites
1. **Node.js** (v14+ recommended) and **npm** or **yarn** installed on your machine.
2. **PostgreSQL** installed and running. Create a database named `appdb` (or any name of your choice). Also have a Postgres user with privileges to access this database.
3. **Git** installed, if you are cloning from a remote repository.

### 1. Clone the Repository
```bash
git clone <REPOSITORY_URL>
cd simpletask
Replace <REPOSITORY_URL> with the actual HTTPS or SSH link to your GitHub repository if it’s remote.

2. Install Backend Dependencies

Navigate into the backend folder and install:
cd backend
npm install
This installs all Node/Express/Sequelize dependencies (bcryptjs, jsonwebtoken, multer, csv-parser, etc.).

3. Configure the Backend .env

Create a file named .env inside backend/ (this file is ignored by Git). Example:
DB_NAME=appdb
DB_USER=proj
DB_PASS=12345
DB_HOST=localhost
DB_PORT=5432

JWT_SECRET=mysupersecretkey
PORT=5001
• DB_NAME: PostgreSQL database name
• DB_USER: Postgres username
• DB_PASS: Postgres password
• DB_HOST: Usually localhost if running locally
• DB_PORT: Default Postgres port is 5432
• JWT_SECRET: Random string for signing JWT tokens
• PORT: The port on which your Express server will run (defaults to 5001 in the provided code)

Security Note: Never commit the actual .env file to source control because it contains sensitive credentials.

4. Install Frontend Dependencies

Open a new terminal (or go back to the root folder) and enter:
cd ../frontend
npm install
This installs all React dependencies, such as React Router, Axios, etc.

5. Configure the Frontend .env

If you need environment variables in the frontend (e.g., to specify the API URL), create an .env in frontend/:
VITE_API_URL=http://localhost:5001
You can then reference import.meta.env.VITE_API_URL in your code for API requests (if using Vite) or use REACT_APP_ variables if using Create React App. Adjust to match your actual setup.

6. Start the Backend Server

Inside the backend folder:
npm run dev
or
npm start
depending on your package.json scripts. The console should print something like:
Connected to PostgreSQL successfully
Server running on http://localhost:5001
indicating the server is up and connected to the database.

7. Start the Frontend

Open a new terminal, go to frontend directory:
npm run dev
For a Vite project, this launches the React dev server on http://127.0.0.1:5173 (by default) or for Create React App, it’s usually http://localhost:3000. The terminal or console output will confirm which address to open in your browser.

8. Verify & Access the App
• Backend: Check http://localhost:5001 (or your PORT) if there is a basic route message like “Server is running” or test a route like /auth/register.
• Frontend: Open your browser at the dev server URL (e.g., http://localhost:5173 or http://localhost:3000). You should see the home or login page for SimpleTask.
Environment Variables

In the backend .env:
• DB_NAME: Database name (e.g., appdb).
• DB_USER: Database username (e.g., proj).
• DB_PASS: Database user’s password (e.g., 12345).
• DB_HOST: Host for PostgreSQL (often localhost).
• DB_PORT: Port for PostgreSQL (5432 by default).
• JWT_SECRET: Secret key used to sign JWT tokens (pick a long, random string).
• PORT: Port for the Express backend to listen on (e.g., 5001).

In the frontend .env :
• VITE_API_URL or REACT_APP_API_URL: Base URL to the backend (e.g., http://localhost:5001).
The app’s code will use this to direct API calls to the server.

API Documentation

All routes that manage tasks require a valid JWT token in the Authorization header (format: Bearer <token>). Without a valid token, the server returns 401 Unauthorized. The token is obtained through the login process.

Authentication Routes

1. POST /auth/register

Description: Registers a new user account.
Body (JSON):
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
• username (string)
• email (string, must be unique)
• password (string, hashed before storing)

Response:
• 201 Created on success:
{
  "message": "User registered successfully"
}
• 409 Conflict if email is already taken, or 400 if fields are missing.

2. POST /auth/login

Description: Logs in an existing user and returns a JWT token.
Body (JSON):
{
  "email": "test@example.com",
  "password": "password123"
}
Response:
{
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}
• 401 Unauthorized if credentials are invalid.
Task Routes

All /tasks routes are protected. Include your JWT token in the Authorization header as Bearer <token>.

1. POST /tasks

Description: Create a new task.
Body (JSON):
{
  "title": "My Task",
  "description": "Some details",
  "priority": "Medium",       // optional: "Low", "Medium", or "High"
  "status": "New",            // optional: "New", "In Progress", "Completed"
  "dueDate": "2025-02-28",    // date in YYYY-MM-DD format
  "category": "Work"          // optional
}
• title (required string)
• description (optional string)
• priority (enum: Low, Medium, High; default is Medium)
• status (enum: New, In Progress, Completed; default is New)
• dueDate (optional date string)
• category (optional string)

Response:
• 201 Created: Returns the new task object with fields like id, title, etc.
{
  "id": 1,
  "title": "My Task",
  "description": "Some details",
  "priority": "Medium",
  "status": "New",
  "dueDate": "2025-02-28",
  "category": "Work",
  "completed": false,
  "userId": 123
}
• 400 if the title is missing or invalid.

2. GET /tasks

Description: Retrieve tasks for the logged-in user. Supports query params for search/filter.
Query Parameters:
• search (string): filters by task title containing this substring (case-insensitive).
• priority (string): e.g. priority=High.
• status (string): e.g. status=Completed.
• category (string): e.g. category=Work.

Example: GET /tasks?search=buy&priority=High

Response:
[
  {
    "id": 1,
    "title": "Buy groceries",
    "description": "Milk, Eggs, Bread",
    "priority": "High",
    "status": "New",
    "dueDate": null,
    "category": "Personal",
    "completed": false,
    "userId": 123
  },
  ...
]
• 200 OK: Array of matching tasks (empty array if none found).

3. PUT /tasks/:id

Description: Update a task by its ID.
Body (JSON): Provide only the fields you want to update, e.g.:
{
  "title": "Updated Title",
  "status": "In Progress"
}
Response:
{ "message": "Task updated" }
or the updated task details if the code is designed to return them.
• 404 if no task matches the given ID for the user.

4. DELETE /tasks/:id

Description: Delete a task by ID.
Response:
{ "message": "Task deleted" }
• 404 if not found or not owned by the user.
CSV Import

POST /tasks/import

Description: Bulk-create tasks from a CSV file upload. The CSV might have columns like title,description,priority,status,dueDate,category.

Request:
• Content-Type: multipart/form-data
• Field name for file: file
• Example CSV content:
title,description,priority,status,dueDate,category
"Buy groceries","Milk, Eggs, Bread","High","New",,"Home"
"Finish project","Finalize the draft","Medium","In Progress","2025-03-01","Work"


Response:
{
  "message": "Imported 2 tasks."
}
• 400 if no file is uploaded.
• 500 if parsing fails or DB insertion errors occur.
How to Use the App
1. Register: Go to the /register route in the frontend or click “Register” on the home page. Provide a username, email, and password. On success, you may be prompted to log in or auto-logged in.
2. Login: Enter your email and password to receive a JWT token (handled automatically by the frontend). Once logged in, you’ll see your personalized task dashboard.
3. View Tasks: The main dashboard displays your tasks. Use filtering and search fields (e.g., by title, priority, status, or category) to find specific tasks quickly.
4. Add New Task: Click a button or link labeled “Create Task” (or “Add Task”). Fill in the details (title, description, priority, etc.) and submit. The newly created task appears in your list.
5. Edit Tasks: Next to each task, there is typically an “Edit” option. Update any fields in the inline form and save. The changes reflect in the list.
6. Toggle Completion: Some tasks have a checkbox or button to mark them completed or revert them to pending. The UI updates to show the new status.
7. Delete Tasks: A “Delete” button (often a trash icon) removes the task upon confirmation.
8. Import Tasks (CSV): Navigate to the “Import Tasks” page or button. Select a CSV file (with correct columns like title,description,priority,status,dueDate,category). Upload it, and the tasks appear in your list. A confirmation message indicates how many tasks were imported.
9. Logout: End your session by clicking “Logout”. The JWT is cleared, preventing further edits until you log in again.

That’s it! You now have a fully functional to-do list app with PostgreSQL as the database, JWT-based authentication, CSV import, and a clean React UI for managing tasks.
Enjoy using SimpleTask! If you encounter any issues during setup, double-check your .env files, PostgreSQL credentials, and that both servers (frontend and backend) are running on compatible ports.


