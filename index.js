import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./src/db/index.js";
import userRoutes from "./src/routes/index.js";
import productRoutes from"./src/routes/index.js"
import orderRoutes from"./src/routes/index.js"
import inrolledUser from"./src/routes/index.js"
const app = express();
 app.use(cors({ origin: '*' }));
 const corsOptions = {
  origin: ["https://frontend-project-1-three.vercel.app", "https://hackathon-sage-nine.vercel.app"], // ✅ Frontend URLs
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));


app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
  res.send("Hello World!");
});

// routes
app.use("/api/v1", userRoutes);
app.use("/api/v1/", productRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", inrolledUser);


connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });