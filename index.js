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
app.use(express.json());


const allowedOrigins = [
  'https://frontend-project-1-three.vercel.app', 
  'http://localhost:5173' 
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for this origin'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.options('*', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.status(200).end();
});


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