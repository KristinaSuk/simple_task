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