# Team Task Manager 

A full-stack web application designed to help teams collaborate effectively. This project features robust role-based access control (Admin/Member), project creation, task assignment, and a dynamic dashboard to track team progress.

##  Key Features

- **Role-Based Access Control (RBAC):**
  - **Admins:** Full control. Can create/delete projects, create tasks, assign tasks to specific team members, and update all task statuses. Admins view company-wide statistics on the dashboard.
  - **Members:** Focused workflow. Can view projects and tasks, but are restricted to updating the status (To Do, In Progress, Done) of **only** the tasks specifically assigned to them.
- **Dynamic Dashboard:** Live tracking of Active Projects, Pending Tasks, and Completed Tasks, dynamically filtered based on the logged-in user's role.
- **Project & Task Management:** Create comprehensive projects and break them down into actionable, assigned tasks.
- **Modern UI/UX:** Built with a beautiful, responsive, glassmorphism-inspired design system using Vanilla CSS.

##  Tech Stack

- **Frontend:** React.js, Vite, React Router DOM, Axios, Lucide-React (Icons)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB & Mongoose
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs for secure password hashing

## Live Demo

- **Frontend URL:** [https://team-task-manager-mu-sandy.vercel.app](https://team-task-manager-mu-sandy.vercel.app)
-

## 💻 Running Locally

### 1. Clone the repository
```bash
git clone https://github.com/rishabh0078/Team-Task-Manager.git
cd Team-Task-Manager
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder with the following:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=super_secret_key_for_jwt_auth_12345
```
Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```

