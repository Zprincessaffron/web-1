import Product from "../models/product.js";


export const getProducts = async (req,res) =>{
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const updateProduct = async (req,res) =>{
  const productId = req.params.id;
  const updatedData = req.body;

  try {
    const product = await Product.findByIdAndUpdate(productId, updatedData, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: 'Server error' });
  }
}

export const createProduct = async (req,res) =>{
  try {
    const {
      name,
      description,
      content,
      variants,
      productFeatures,
      category,
      rating,
      img,
    } = req.body;

    // Validate required fields
    if (!name || !variants || !Array.isArray(variants) || variants.length === 0) {
      return res.status(400).json({ message: 'Name and variants are required' });
    }

    // Create and save a new product
    const newProduct = new Product({
      name,
      description,
      content,
      variants,
      productFeatures,
      category,
      rating,
      img,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: savedProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Failed to add product', error: error.message });
  }
}
