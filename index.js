import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import AuthRoutes from "./routes/authRoutes.js";
import PostRoutes from "./routes/PosterToBusiness.js"
import posterRoute from "./routes/PosterAuth.js"
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
connectDB();
app.use("/auth", AuthRoutes);
app.use("/post", PostRoutes);
app.use("/poster", posterRoute);
app.get("/", (req, res) => {
  res.send("Hello to Memories API");
});
app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
