const express = require("express");
const cors = require("cors");
const authrouter = require("./routes/auth");
const musicrouter = require("./routes/music.routes");
const cookieParser = require("cookie-parser");

const app = express();
// CORS configuration - critical for cookies to work.
// Allow origins from CLIENT_URL (comma-separated) with localhost fallback for local dev.
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((o) => o.trim())
  : ["http://localhost:5173", "http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);
app.use(express.json());
app.use(cookieParser());

// Health-check endpoint used by Render's healthCheckPath: "/"
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", message: "Spotify MERN backend is running" });
});

app.use("/api/auth", authrouter);
app.use("/api/music", musicrouter);
app.use("/api/artist", musicrouter);

module.exports = app;