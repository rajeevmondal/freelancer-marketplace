[README.md](https://github.com/user-attachments/files/32304545/README.md)
# Freelancer Marketplace

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application that connects clients with freelancers through a simple project marketplace workflow.

Clients can create projects, review freelancer applications, accept or reject proposals, and mark projects as completed. Freelancers can browse available projects, submit proposals with bid amounts, and track their application and project status.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Application Workflow](#application-workflow)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Authentication and Authorization](#authentication-and-authorization)
- [Database Models](#database-models)
- [Frontend Pages](#frontend-pages)
- [Testing](#testing)
- [Git and GitHub](#git-and-github)
- [Security Notes](#security-notes)
- [Future Enhancements](#future-enhancements)
- [Author](#author)

---

## Project Overview

Freelancer Marketplace is a role-based online platform designed to provide a basic marketplace workflow between clients and freelancers.

The application has two user roles:

### Client

A Client can:

- Register and log in
- Manage their profile
- Create projects
- View their own projects
- View freelancer applications for their projects
- Accept applications
- Reject applications
- Mark an in-progress project as completed

### Freelancer

A Freelancer can:

- Register and log in
- Manage their profile
- Browse available projects
- Search and filter projects
- Apply to projects
- Submit a proposal
- Submit a bid amount
- Prevent duplicate applications
- View submitted applications
- Track application and project status

---

## Features

### Authentication

- User registration
- User login
- Password hashing using bcryptjs
- JWT-based authentication
- Protected API routes
- Role-based authorization
- Logout functionality
- Persistent login using browser localStorage

### Client Features

- Client dashboard
- Project creation
- Project listing
- My Projects section
- Project status tracking
- Application management
- Accept application
- Reject application
- Complete project
- Dashboard statistics

### Freelancer Features

- Freelancer dashboard
- Browse available projects
- Project search
- Skill-based filtering
- Budget filtering
- Status filtering
- Apply to project
- Proposal submission
- Bid amount submission
- Duplicate application protection
- My Applications page
- Application/project status tracking

### Profile Management

Users can update:

- Name
- Skills
- Bio

The application also provides a protected profile endpoint for retrieving the logged-in user's profile.

### Responsive UI

The frontend is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile

---

## Technology Stack

### Frontend

- React.js
- React Router
- Axios
- Vite
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcryptjs
- CORS
- dotenv
- Nodemon

### Development Tools

- VS Code
- Git
- GitHub
- MongoDB Atlas
- Postman / API testing tools
- npm

---

## Project Architecture

```text
freelancer-marketplace/
│
├── .gitignore
├── README.md
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   └── applicationController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Application.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   └── applicationRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProjectCard.jsx
    │   │   └── ProtectedRoute.jsx
    │   │
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   │
    │   ├── pages/
    │   │   ├── ClientDashboard.jsx
    │   │   ├── FreelancerDashboard.jsx
    │   │   ├── Login.jsx
    │   │   ├── Profile.jsx
    │   │   ├── Register.jsx
    │   │   └── MyApplications.jsx
    │   │
    │   ├── services/
    │   │   └── api.js
    │   │
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    │
    ├── index.html
    └── package.json
```

---

## Application Workflow

The main workflow of the application is:

```text
User Registration
       ↓
User Login
       ↓
JWT Token Generated
       ↓
Role Identified
   ↙           ↘
Client       Freelancer
   ↓              ↓
Create        Browse Projects
Project           ↓
   ↓          Apply to Project
View Applications  ↓
   ↓          Track Application
Accept/Reject
   ↓
In Progress
   ↓
Completed
```

### Client Project Workflow

1. Client registers.
2. Client logs in.
3. Client creates a project.
4. Project receives `Open` status.
5. Freelancers can view the project.
6. Freelancers submit applications.
7. Client views applications.
8. Client accepts or rejects an application.
9. If accepted, project status becomes `In Progress`.
10. Client can mark the project as `Completed`.

### Freelancer Application Workflow

1. Freelancer registers.
2. Freelancer logs in.
3. Freelancer browses projects.
4. Freelancer selects an open project.
5. Freelancer submits a proposal and bid amount.
6. Application is created with `Pending` status.
7. Client accepts or rejects the application.
8. Freelancer can see the application status.
9. If accepted, the related project becomes `In Progress`.
10. After completion, the project status becomes `Completed`.

---

## Backend Setup

Open a terminal and navigate to the backend directory:

```bash
cd C:\freelancer-marketplace\backend
```

Install dependencies:

```bash
npm install
```

The backend dependencies include:

```text
express
mongoose
dotenv
cors
bcryptjs
jsonwebtoken
```

Development dependency:

```text
nodemon
```

### Backend Scripts

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

Start the backend in development mode:

```bash
npm run dev
```

The API runs on:

```text
http://localhost:5000
```

---

## Frontend Setup

Open another terminal:

```bash
cd C:\freelancer-marketplace\frontend
```

Install dependencies:

```bash
npm install
```

Run the frontend:

```bash
npm run dev
```

Vite will provide a local development URL, normally similar to:

```text
http://localhost:5173
```

Recommended Node.js version for the current Vite setup is Node 20.19+ or a current supported Node release.

---

## Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
```

### Important

Do not commit `.env` to GitHub.

The root `.gitignore` contains:

```gitignore
node_modules/
.env
dist/
build/
.vite/
```

This keeps sensitive environment variables and generated dependency/build files out of the repository.

---

## API Documentation

Base URL:

```text
http://localhost:5000/api
```

### Authentication APIs

#### Register

```http
POST /auth/register
```

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "Freelancer"
}
```

Allowed roles:

```text
Client
Freelancer
```

#### Login

```http
POST /auth/login
```

Request body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Returns a JWT token and user information.

#### Get Profile

```http
GET /auth/profile
```

Requires:

```text
Authorization: Bearer <token>
```

#### Update Profile

```http
PUT /auth/profile
```

Requires authentication.

Example:

```json
{
  "name": "John Doe",
  "skills": ["React", "Node.js", "MongoDB"],
  "bio": "Full-stack developer"
}
```

---

## Project APIs

### Create Project

```http
POST /projects/
```

Role:

```text
Client
```

Example:

```json
{
  "title": "Build a Portfolio Website",
  "description": "Create a responsive portfolio website.",
  "skills": ["React", "CSS", "JavaScript"],
  "budget": 15000,
  "deadline": "2026-12-31"
}
```

### Get All Projects

```http
GET /projects/
```

Requires authentication.

### Search Projects

```http
GET /projects/search
```

Supported query parameters:

```text
search
skill
minBudget
maxBudget
status
```

Example:

```text
/projects/search?skill=React&minBudget=5000&maxBudget=20000&status=Open
```

### Get Client's Projects

```http
GET /projects/my-projects
```

Role:

```text
Client
```

### Complete Project

```http
PUT /projects/:projectId/complete
```

Role:

```text
Client
```

The project must currently be:

```text
In Progress
```

After completion:

```text
Completed
```

---

## Application APIs

### Apply to Project

```http
POST /applications/apply
```

Role:

```text
Freelancer
```

Example:

```json
{
  "projectId": "PROJECT_ID",
  "proposal": "I can build this project using React and Node.js.",
  "bidAmount": 12000
}
```

New applications start with:

```text
Pending
```

### Get Project Applications

```http
GET /applications/project/:projectId
```

Role:

```text
Client
```

A client can only view applications for their own project.

### Update Application Status

```http
PUT /applications/:applicationId/status
```

Role:

```text
Client
```

Accept:

```json
{
  "status": "Accepted"
}
```

Reject:

```json
{
  "status": "Rejected"
}
```

When an application is accepted, the related project changes to:

```text
In Progress
```

When an application is rejected, the application becomes:

```text
Rejected
```

and the project remains:

```text
Open
```

### Get My Applications

```http
GET /applications/my-applications
```

Role:

```text
Freelancer
```

---

## Authentication and Authorization

The application uses JWT-based authentication.

### Authentication Flow

```text
Login
  ↓
Server verifies email/password
  ↓
JWT generated
  ↓
Token stored in frontend localStorage
  ↓
Axios interceptor attaches token
  ↓
Backend verifies token
  ↓
Protected route accessed
```

The JWT contains:

```text
User ID
Role
```

Example authorization header:

```http
Authorization: Bearer <JWT_TOKEN>
```

### Role-Based Authorization

The backend uses role-based middleware.

Client-only operations include:

- Creating projects
- Viewing their project applications
- Accepting applications
- Rejecting applications
- Completing their projects

Freelancer-only operations include:

- Applying to projects
- Viewing their applications

This prevents users from accessing functionality belonging to another role.

---

## Database Models

### User

Fields:

```text
name
email
password
role
skills
bio
createdAt
updatedAt
```

Roles:

```text
Client
Freelancer
```

Passwords are stored using bcrypt hashing rather than plain text.

### Project

Fields:

```text
title
description
skills
budget
deadline
client
status
createdAt
updatedAt
```

Project statuses:

```text
Open
In Progress
Completed
```

### Application

Fields:

```text
project
freelancer
proposal
bidAmount
status
createdAt
updatedAt
```

Application statuses:

```text
Pending
Accepted
Rejected
```

---

## Frontend Pages

### Login

Provides:

- Email input
- Password input
- Login
- Role-based dashboard navigation

### Register

Provides:

- Name
- Email
- Password
- Role selection
- Registration

### Client Dashboard

Provides:

- Dashboard statistics
- Create Project
- My Projects
- Project status
- View Applications
- Accept application
- Reject application
- Mark project as completed

### Freelancer Dashboard

Provides:

- Available projects
- Search/filter functionality
- Project details
- Skills
- Budget
- Deadline
- Apply Now
- Proposal form
- Bid amount

### My Applications

Provides:

- Submitted applications
- Proposal information
- Bid amount
- Application status
- Related project status

### Profile

Provides:

- Profile information
- Name update
- Skills update
- Bio update

---

## Testing

The project was tested through the complete user workflow.

### Test 1: Authentication

- Client login: PASS
- Role verification: PASS
- Protected route: PASS
- Profile endpoint: PASS

### Test 2: Project Creation

- Client project creation: PASS
- Project stored in MongoDB: PASS

### Test 3: Freelancer Access

- Freelancer login: PASS
- Freelancer role verification: PASS
- Project browsing: PASS
- My Applications page: PASS

### Test 4: Project Application

- Freelancer Apply Now: PASS
- Application submission: PASS
- Duplicate application protection: PASS

### Test 5: Accept Application

- Client View Applications: PASS
- Accept application: PASS
- Application status changed to `Accepted`: PASS
- Project status changed to `In Progress`: PASS

### Test 6: Complete Project

- Client completed project: PASS
- Project status changed to `Completed`: PASS
- Freelancer saw `Accepted` application and `Completed` project status: PASS

### Test 7: Logout and Protected Routes

- Logout: PASS
- Protected route after logout: PASS
- Unauthorized role navigation: PASS

### Test 8: Reject Application

- Client rejected application: PASS
- Application status changed to `Rejected`: PASS
- Project remained `Open`: PASS

### Test 9: Production Build

Frontend build:

```bash
npm run build
```

Result:

```text
Build successful
```

---

## Git and GitHub

The project uses Git for version control.

The repository was initialized from:

```text
C:\freelancer-marketplace
```

Initial Git setup:

```bash
git init
git add .
git commit -m "Initial commit - Freelancer Marketplace"
```

The repository uses the `main` branch.

The GitHub remote is configured as:

```text
origin
```

Before pushing, the local branch was renamed:

```bash
git branch -M main
```

Push command:

```bash
git push -u origin main
```

### Git Ignore

Sensitive and generated files are excluded using:

```gitignore
node_modules/
.env
dist/
build/
.vite/
```

---

## Security Notes

- Passwords are hashed using bcryptjs.
- JWT is used for protected API access.
- Role-based middleware protects Client and Freelancer operations.
- `.env` is excluded from Git.
- MongoDB credentials should never be placed directly in source code or committed to GitHub.
- Never share GitHub Personal Access Tokens publicly.
- If a database password or access token is accidentally exposed, rotate/revoke it immediately.

---

## Future Enhancements

The current version implements the core marketplace workflow. Possible future improvements include:

- Freelancer profile pages
- Client profile pages
- Ratings and reviews
- Real-time chat
- Notifications
- Email notifications
- Payment gateway integration
- Freelancer portfolio uploads
- Project categories
- Advanced project recommendation
- Admin dashboard
- Admin user management
- Application withdrawal
- Multiple freelancers per project
- File/document attachments
- Project milestones
- Payment tracking
- Deployment using services such as Render, Vercel, or similar platforms
- Cloud storage for portfolio files

---

## Learning Outcomes

This project demonstrates practical knowledge of:

- MERN stack development
- REST API development
- MongoDB and Mongoose
- Express.js routing
- MVC-style backend organization
- JWT authentication
- Password hashing
- Role-based authorization
- React component development
- React Router
- React Context API
- Axios API integration
- Protected frontend routes
- CRUD-style application workflows
- Form handling
- API error handling
- Responsive UI development
- Git and GitHub
- Environment variable management

---

## Author

**Rajeev Mondal**

Computer Science & Engineering Student

Project: **Freelancer Marketplace**

Built using the MERN Stack.
