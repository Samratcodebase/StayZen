import express from "express";
import type { Express, Request, Response } from "express";
import dotenv from "dotenv";
import hotelRoutes from "./routes/hotel.routes.js";
import sequelize from "./db/models/sequelize.config.js";

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.APP_PORT! || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware (optional)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Routes
app.use("/api/hotels", hotelRoutes);

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("✓ Database connected successfully");

    // Sync models with database
    await sequelize.sync({ alter: false });
    console.log("✓ Database models synchronized");

    // Start listening
    app.listen(PORT, () => {
      console.log(`✓ Server is running on http://localhost:${PORT}`);
      console.log(`✓ Health check: http://localhost:${PORT}/health`);
      console.log(`✓ Hotel API: http://localhost:${PORT}/api/hotels`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
