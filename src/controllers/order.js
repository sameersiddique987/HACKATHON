import Order from "../models/order.js";
import User from "../models/user.model.js";
import Product from "../models/product.js";

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { userId, productIds, totalPrice } = req.body;

    // Find user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Find products
    const products = await Product.find({ '_id': { $in: productIds } });
    if (!products.length) return res.status(404).json({ message: "Products not found" });

    // Create new order
    const newOrder = new Order({
      user: userId,
      products: products,
      totalPrice,
    });

    await newOrder.save();

    // Update user's order history
    user.orders.push(newOrder._id);
    await user.save();

    res.status(201).json({ message: "Order created successfully", data: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

// Get all orders for a user
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ user: userId }).populate('products');
    if (!orders.length) return res.status(404).json({ message: "No orders found for this user" });

    res.status(200).json({ message: "Orders fetched successfully", data: orders });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

// Get order details by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate('products').populate('user');
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order fetched successfully", data: order });
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

// Update an order (if required)
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order updated successfully", data: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};

export { createOrder, getUserOrders, getOrderById, updateOrder, deleteOrder };
