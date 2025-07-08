const { Sequelize } = require("sequelize");

// Example: connecting to a local MySQL database
const sequelize = new Sequelize("customers", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection has been established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
}

testConnection();
