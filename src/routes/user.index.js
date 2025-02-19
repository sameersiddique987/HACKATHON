import express from "express";
import {
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  uploadImage,
} from "../controllers/user.controller.js";
import upload from "../middlewere/multer.middlewere.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refreshtoken", refreshToken);
router.post("/uploadimage", upload.single(), uploadImage);



export default router;
