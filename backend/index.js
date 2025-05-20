import dotenv from "dotenv";
// Load env variables before other imports
dotenv.config();

import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.routes.js";
import companyRoutes from "./routes/company.routes.js";
import jobRoutes from "./routes/job.routes.js";
import applicationRoutes from "./routes/application.routes.js";

// You can verify the SECRET_KEY is loaded
console.log('SECRET_KEY exists:', !!process.env.SECRET_KEY);

const app = express();

//middleware
app.use('/uploads', express.static('uploads'))
app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
}
app.use(cors(corsOptions));
console.log(corsOptions.origin);


//api routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes)
app.use("/api/v1/job", jobRoutes)
app.use("/api/v1/application", applicationRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
  console.log("Server is running on port",PORT)
})