const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to your MySQL DB
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "customers",
});

// ✅ Test connection
db.connect((err) => {
  if (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL!");
});

// ✅ Create table if it doesn't exist
db.query(
  `
  CREATE TABLE IF NOT EXISTS customerList (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    tag ENUM('VIP', 'High Value', 'New Lead') DEFAULT 'New Lead',
    notes TEXT
  )
`,
  (err) => {
    if (err) {
      console.error("❌ Failed to create table:", err);
    } else {
      console.log("✅ Table is ready!");
    }
  }
);

app.get("/", (req, res) => {
  res.send("API is running");
});

// ✅ Add new contact
app.post("/contacts", (req, res) => {
  const { name, phone, email, tag, notes } = req.body;

  if (!name || !phone || !email) {
    return res
      .status(400)
      .json({ error: "Name, phone, and email are required." });
  }

  db.query(
    "INSERT INTO customerList (name, phone, email, tag, notes) VALUES (?, ?, ?, ?, ?)",
    [name, phone, email, tag || "New Lead", notes],
    (err, results) => {
      if (err) {
        console.error("❌ DB insert error:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: results.insertId });
    }
  );
});

// ✅ Get all contacts
app.get("/contacts", (req, res) => {
  db.query("SELECT * FROM customerList", (err, rows) => {
    if (err) {
      console.error("❌ DB fetch error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// ✅ Search contacts
app.get("/contacts/search", (req, res) => {
  const q = `%${req.query.q}%`;
  db.query(
    "SELECT * FROM customerList WHERE name LIKE ? OR phone LIKE ? OR email LIKE ?",
    [q, q, q],
    (err, rows) => {
      if (err) {
        console.error("❌ DB search error:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});

// app.delete("/contacts/email/:email", (req, res) => {
//   const email = req.params.email;
//   db.query(
//     `DELETE FROM customerList WHERE email = ?`,
//     [email],
//     (err, result) => {
//       if (err) {
//         console.error("DB delete error:", err);
//         return res.status(500).json({ error: err.message });
//       }
//       res.json({ message: "Deleted", email });
//     }
//   );
// });

app.delete("/contacts/:id", (req, res) => {
  const id = req.params.id;
  db.query(`DELETE FROM customerList WHERE id = ?`, [id], (err, result) => {
    if (err) {
      console.error("DB delete error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Deleted", id });
  });
});

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
