const express = require("express");
const cors = require("cors");
const authrouter = require("./routes/auth");
const musicrouter = require("./routes/music.routes");
const cookieParser = require("cookie-parser");

const app = express();
// CORS configuration - critical for cookies to work
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authrouter);
app.use("/api/music", musicrouter);
app.use("/api/artist", musicrouter);

module.exports = app;