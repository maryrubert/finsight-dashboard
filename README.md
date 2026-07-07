# 📊 FinSight Dashboard

> A modern financial management dashboard built with React, TypeScript and Vite, designed as a portfolio project that simulates a real-world application used by financial consultants.

> 🚧 **Project Status:** In Development

---

## ✨ Overview

FinSight Dashboard is a front-end application focused on applying modern software engineering practices while building a realistic financial management platform.

The project emphasizes:

- Clean Architecture
- Feature-based organization
- Reusable components
- Custom React Hooks
- TypeScript best practices
- Responsive UI
- Scalable codebase

Rather than being just a UI showcase, FinSight aims to simulate how a production-ready application evolves through iterative development.

---

## 🚀 Current Features

### Authentication

- Login
- Logout
- Protected Routes
- Persistent Session
- Form validation with React Hook Form + Zod

### Dashboard

- Responsive layout
- Sidebar
- Header
- KPI cards
- Financial charts

### Clients

- Client listing
- Search
- Create
- Update
- Delete
- Local persistence
- Reusable Modal
- Confirmation Dialog

---

## 🛠 Tech Stack

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- React Hook Form
- Zod
- Lucide React

---

## 🏗 Architecture

The project follows a Feature-Based Architecture.

```
src
├── components
├── contexts
├── features
│   ├── auth
│   ├── clients
│   └── ...
├── pages
├── routes
└── styles
```

Each feature is responsible for its own:

- Components
- Hooks
- Services
- Types
- Mock data

Business logic is extracted into custom hooks, while pages remain focused on rendering the interface.

---

## 🚀 Running Locally

Clone the repository:

```bash
git clone https://github.com/maryrubert/finsight-dashboard.git
```

Enter the project:

```bash
cd finsight-dashboard
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## 🔐 Demo Credentials

Use the following credentials to access the application:

**Email**

```
admin@finsight.com
```

**Password**

```
123456
```

---

## 🗺 Roadmap

### ✅ Completed

- Authentication
- Dashboard Layout
- Client CRUD
- Search
- Local Storage Persistence
- Business Logic Refactoring

### 🚧 In Progress

- Portfolio Management
- Reports
- Settings
- API Integration
- Charts with Real Data

---

## 👩‍💻 Author

Developed by **Mariana Grecco**

LinkedIn *(coming soon)*

GitHub:

https://github.com/maryrubert