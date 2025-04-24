const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const memberRoutes = require("./routes/memberRoutes");

dotenv.config();

const app = express();

// 🛡️ CORS Configuration
const allowedOrigins = [
  "http://localhost:3000", // local dev
  process.env.FRONTEND_URL // set this in your .env for production (e.g., https://yourdomain.com)
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// 🔌 Middleware
app.use(express.json());
app.use("/api/members", memberRoutes);

// 📦 Serve React build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
}

// 🔄 Sync Sequelize & Start Server
sequelize
  .sync()
  .then(() => {
    console.log("✅ Database synced");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Failed to sync DB:", err);
  });
