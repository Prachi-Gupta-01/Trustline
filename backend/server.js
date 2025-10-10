import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectdB } from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import complaintRoutes from "./routes/complaintRoute.js";
import contactRoute from "./routes/contactRoute.js";
import userRoute from "./routes/userRoute.js";
dotenv.config();
connectdB();

const app = express();

app.use(cors()); // allow cross-origin requests i.e frontend to backend
app.use(express.json()); // parse incoming JSON requests

//routes
app.use("/api/auth", authRoute);
app.use("/api", complaintRoutes);
app.use("/api", contactRoute);
app.use("/api/user", userRoute);
app.get("/", (req, res) => {
  res.send("Trustline is active!");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
