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
