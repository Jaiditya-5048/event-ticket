# Event Spot 🎫

**Event Spot** is a full-stack event booking web application built for a client, offering a seamless experience for users to browse, create, and book event tickets.

---

## 🌐 Project Repository

GitHub: [Talentelgia-Technologies-Pvt-Ltd/events-marketplace](https://github.com/Talentelgia-Technologies-Pvt-Ltd/events-marketplace.git)

---

## 🚀 Tech Stack

**OS**: Ubuntu 20.04.6 LTS
**Node**: v20.19.2

### Frontend – React + Vite + TypeScript

- **React**: 19.1.0
- **TypeScript**: 5.8.3
- **Vite**: 6.3.5

### Backend – Node.js + Express + MySQL

- **Node.js**: (Your Node version here — e.g., 20.x.x)
- **Express**: 4.21.2
- **Sequelize**: 6.37.7
- **MySQL2**: 3.14.1

---

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Talentelgia-Technologies-Pvt-Ltd/events-marketplace.git
cd events-marketplace
```

---

---

### 2. Setup Frontend

```bash
cd frontend
npm install       # Install frontend dependencies
npm run dev       # Run the frontend server on http://localhost:5173
```

---

#### 🔐 Environment Variables

Create a .env file inside the frontend folder with the following:
VITE_API_URL=http://localhost:5000

---

---

### 3. Setup Backend

```bash
cd ../backend
npm install       # Install backend dependencies
```

Important: Seed the Database
If you're setting up the project for the first time, your SQL database will be empty.

To populate it with initial data:

```bash
npm run seed:all
```

If required only user can also be seeded

```bash
npm seed:users
```

Also each table has its own seed file which can be used to seed that particular data by creating a script

---

#### 🔐 Environment Variables

To run the backend server, create a `.env` file in the `/backend` folder.

You can start by copying the sample file:

```bash
cp .env.example .env  #To create a new file .env with the contents from the env.example file
```

Then, edit .env and add your local database credentials and JWT secret:

# Database configuration

DB_HOST=localhost
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_database_name

# Application port

PORT=5000

# JWT configuration

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=12h

---
