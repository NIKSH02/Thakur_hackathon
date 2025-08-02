import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import ApiError from "./utils/ApiError.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cookieParser from "cookie-parser";
import path from "path";


dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;

connectDB();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174", 
    ],
    credentials: true,
  })
);

app.use(cookieParser());

console.log("Serving static files from:", path.resolve("uploads"));
app.use("/uploads", express.static("uploads"));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.use((req, res, next) => {
  next(new ApiError(404, "Route not found"));
});

app.use((err, req, res, next) => {
  console.error("Error:", err); 
  const statusCode = err.statusCode || 500;
  res
    .status(statusCode)
    .json(
      new ApiError(
        statusCode,
        err.message || "Internal Server Error",
        err.errors || []
      )
    );
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

export default app;