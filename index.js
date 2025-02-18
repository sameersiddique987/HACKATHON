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
// app.use(cors({ origin: '*' }));

// app.options('/register', cors());
// app.use(cors({
//   origin: ["http://localhost:5173", "http://localhost:3000/api/v1/register"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// }));
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: 200,
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