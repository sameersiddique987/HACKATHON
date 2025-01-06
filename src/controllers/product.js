import Product from "../models/product.js";

// Add a new product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, userId } = req.body;

    // Create new product
    const newProduct = new Product({
      name,
      description,
      price,
      user: userId,  // Reference to the user who owns this product
    });

    // Save product to the database
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully", data: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('user');
    res.status(200).json({ message: "Products fetched successfully", data: products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get a product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate('user');
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product fetched successfully", data: product });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

export { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
