# 📋 Customer Management Web Application

This project is a simple full-stack customer management application.

---

## 🗂️ Project Structure

The project is organized into two parts: **backend** and **frontend**.

### ✅ Backend

The backend handles the server, database connection, and customer operations. It includes:

- **Modules**
  - `customerList.js`: Defines the customer model.
- **Database Connection**
  - `db.js`: Sets up the database connection.
  - `sequelize.js`: Configures Sequelize ORM.
  - `testConnection.js`: Tests the database connection.
- **Server**
  - `server.js`: Entry point for the Express server.
- **Other Files**
  - `package.json` & `package-lock.json`: Manage project dependencies.
  - `node_modules/`: Installed backend dependencies.

---

### ✅ Frontend

The frontend provides the user interface. It includes:

- `index.html`: Main page for interacting with customer data.
- `scripts.js`: Handles frontend logic and requests to the backend.
- `style.js`: Contains styles for the frontend.

---

## ⚙️ How to Clone the Repository

1. **Fork the Repository**

   - Go to the original repository on GitHub.
   - Click the **Fork** button in the top right corner to create your own copy under your GitHub account.

2. **Copy the Repository Link**

   - In your forked repository, click the **Code** button.
   - Copy the **HTTPS** or **SSH** URL.

3. **Clone in VS Code**

   - Open **VS Code**.
   - Open the **Command Palette** (`Ctrl + Shift + P` or `Cmd + Shift + P` on Mac).
   - Type **Git: Clone** and select it.
   - Paste your copied repository URL.
   - Choose a local folder to save the project.
   - After cloning, click **Open** to open the project in VS Code.

---

## ⚙️ Database Setup

1. **Create the Database**

   Open **MySQL Workbench** and run:

   ```sql
   CREATE DATABASE customers;

   USE customers;

   CREATE TABLE customerList (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     phone VARCHAR(20) NOT NULL,
     email VARCHAR(100) NOT NULL,
     tag ENUM('VIP', 'High Value', 'New Lead') DEFAULT 'New Lead',
     notes TEXT
   );


2. **Update Database Credentials**

   Make sure you update the database credentials in these files to match your local setup:

   * `db.js`
   * `sequelize.js`
   * `server.js`
   * `testConnection.js`

   Use your **MySQL username, password, host**, and **database name**.

---

## ▶️ Running the Project

1. **Install Backend Dependencies**

   ```bash
   cd backend
   npm install
   ```

2. **Test Database Connection**

   ```bash
   node testConnection.js
   ```

3. **Start the Backend Server**

   ```bash
   node server.js
   ```

4. **Run the Frontend**

   Open a **new terminal** and run:

   ```bash
   npx serve frontend/public
   ```

   This will serve your `index.html` and related files.

---

## 📜 License

This project is licensed under the MIT License.

