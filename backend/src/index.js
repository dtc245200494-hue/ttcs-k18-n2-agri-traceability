const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = Number(process.env.PORT || 3000);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    service: "agri-trace-backend",
    status: "ok",
  });
});

app.get("/health", async (_req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS now");
    res.json({
      status: "ok",
      database: "connected",
      timestamp: result.rows[0].now,
    });
  } catch (error) {
    res.status(503).json({
      status: "error",
      database: "disconnected",
      message: error.message,
    });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Backend listening on port ${port}`);
});
