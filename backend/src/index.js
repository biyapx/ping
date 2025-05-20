import express from "express";
import authRoutes from "../routes/route.auth..js";
import messageRoutes from "../routes/message.route.js";
import { connectDB } from "../lib/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  connectDB();
});
