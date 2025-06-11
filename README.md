# 📦 Church Management Backend API

This is a RESTful API built with **Node.js**, **Express**, and **MongoDB** to manage a church's administrative operations — including members, attendance, targets, zones, and more.

## 🚀 Features

- ✅ User authentication and authorization
- 👥 Member and admin management
- 🏠 Hierarchical church structure (zones, centers, bacentas)
- 🎯 Target and attendance tracking
- 🛠️ Clean modular architecture with route separation

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT
- **Environment:** dotenv

---

## 📁 Project Structure

church-management-api/
├── routes/
│ ├── authRoutes.js
│ ├── memberRoutes.js
│ ├── adminRoutes.js
│ ├── bacentaRoutes.js
│ ├── centerRoutes.js
│ ├── directorRoutes.js
│ ├── zoneRoutes.js
│ ├── targetRoutes.js
│ ├── attendanceRoutes.js
│ └── userRoutes.js
├── models/
├── controllers/
├── middleware/
├── .env
├── server.js
└── README.md


---


## 📌 API Endpoints

### 🔐 Authentication  
**Route:** `/api/auth`  
Handles user login, registration, and token management.

### 👤 Members  
**Route:** `/api/members`  
Create, read, update, and delete member data.

### 👨‍💼 Admins  
**Route:** `/api/admins`  
Manage admin-level users and permissions.

### 🏘️ Bacentas  
**Route:** `/api/bacentas`  
Handles bacenta (group) creation and tracking.

### 🏫 Centers  
**Route:** `/api/centers`  
Manage church centers and their information.

### 🧑‍🏫 Directors  
**Route:** `/api/director`  
Track and manage director-level activities.

### 🗺️ Zones  
**Route:** `/api/zones`  
Manage church zones and related data.

### 🎯 Targets  
**Route:** `/api/targets`  
Create and track member or church targets.

### 🧾 Attendances  
**Route:** `/api/attendances`  
Submit and review attendance reports.

### 👥 Users  
**Route:** `/api/users`  
Handle user accounts and role assignments.

## 📦 Installation

```bash
git clone https://github.com/YOUR_USERNAME/church-management-api.git
cd church-management-api
npm install
