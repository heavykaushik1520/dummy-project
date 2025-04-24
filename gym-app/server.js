const express = require("express");
const cors = require('cors');

const dotenv = require("dotenv");
const sequelize = require("./config/db");
const memberRoutes = require("./routes/memberRoutes");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // React dev server
  })
);

app.use(express.json());
app.use("/api/members", memberRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
    const PORT = 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to sync DB:", err);
  });
