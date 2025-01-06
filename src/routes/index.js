import express from "express";
import {
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  uploadImage,
} from"../controllers/user.controllers.js";
import { upload } from "../middlewere/multer.middlewere.js";
import { deleteUser, getUserById, getuserOrders, getUserProducts, updateUser } from "../controllers/inrollUser.js";

const router = express.Router();

// register user
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refreshtoken", refreshToken);
router.post("/uploadimage", upload.single(), uploadImage);



// inrolledUser
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id/products',getUserProducts);
router.get('/:id/orders', getuserOrders);



import { 
  createOrder, 
  getUserOrders, 
  getOrderById, 
  updateOrder, 
  deleteOrder 
} from "../controllers/order.js";




// Create a new order
router.post("/",  createOrder);

// Get all orders for a user
router.get("/user/:userId", getUserOrders);

// Get an order by ID
router.get("/:id", getOrderById);

// Update an order by ID (optional)
router.put("/:id",  updateOrder);

// Delete an order by ID
router.delete("/:id",  deleteOrder);


import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.js";


// Add a new product
router.post("/add", addProduct);

// Get all products
router.get("/", getAllProducts);

// Get a product by ID
router.get("/:id", getProductById);

// Update a product
router.put("/:id", updateProduct);

// Delete a product
router.delete("/:id", deleteProduct);

export default router;
