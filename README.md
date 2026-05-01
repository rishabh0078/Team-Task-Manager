# Team Task Manager 🚀

A full-stack web application designed to help teams collaborate effectively. This project features robust role-based access control (Admin/Member), project creation, task assignment, and a dynamic dashboard to track team progress.

## 🌟 Key Features

- **Role-Based Access Control (RBAC):**
  - **Admins:** Full control. Can create/delete projects, create tasks, assign tasks to specific team members, and update all task statuses. Admins view company-wide statistics on the dashboard.
  - **Members:** Focused workflow. Can view projects and tasks, but are restricted to updating the status (To Do, In Progress, Done) of **only** the tasks specifically assigned to them.
- **Dynamic Dashboard:** Live tracking of Active Projects, Pending Tasks, and Completed Tasks, dynamically filtered based on the logged-in user's role.
- **Project & Task Management:** Create comprehensive projects and break them down into actionable, assigned tasks.
- **Modern UI/UX:** Built with a beautiful, responsive, glassmorphism-inspired design system using Vanilla CSS.

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, React Router DOM, Axios, Lucide-React (Icons)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB & Mongoose
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs for secure password hashing

## 🚀 Live Demo

- **Frontend URL:** [https://team-task-manager-mu-sandy.vercel.app](https://team-task-manager-mu-sandy.vercel.app)
- **Backend API URL:** `https://team-task-manager1.up.railway.app/api`

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
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```

## 🧠 Design & Architecture Decisions

- **Why Vanilla CSS instead of Tailwind?** I chose Vanilla CSS to demonstrate my deep understanding of the CSS box model, CSS variables (custom properties) for a consistent design system, and flexbox/grid architectures without relying on utility frameworks.
- **Security First:** Implemented strict backend middleware to ensure that API requests cannot bypass frontend UI restrictions. A Member attempting to hit the PUT `/api/tasks/:id` endpoint for a task not assigned to them will be met with a 403 Forbidden response.
- **Separation of Concerns:** The backend API is cleanly separated into Models, Controllers, and Routes, ensuring the codebase is highly scalable and easy to maintain.
