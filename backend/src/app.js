const express = require("express");
const cors = require("cors");
const authrouter = require("./routes/auth");
const musicrouter = require("./routes/music.routes");
const cookieParser = require("cookie-parser");

const app = express();
// CORS: reflect the request Origin (origin: true) so the frontend, served from
// any Vercel/Render URL, can call this API with credentials (cookies). Cross-origin
// cookie auth requires the Allow-Origin to mirror the actual request origin.
app.use(
  cors({
    origin: true,
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