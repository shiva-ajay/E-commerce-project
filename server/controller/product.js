import Product from "../model/product.js";
import Shop from "../model/shop.js";
import cloudinary from "cloudinary";


export const createProduct = async (req, res) => {
  try {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(400).json({ message: "Shop ID invalid!!!" });
    } else {
      let images = [];

      if (typeof req.body.images === "string") {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }
    
      const imagesLinks = [];
    
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });
    
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    
      const productData = req.body;
      productData.images = imagesLinks;
      productData.shop = shop;

      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        product,
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


// get all products of a shop

export const allProduct = async (req, res) => {
  try {
    const products = await Product.find({ shopId: req.params.id });
    console.log("Products found:", products);  // Move this line here

    res.status(201).json({
      success: true,
      products,
    });
 
  } catch (error) {
    console.error("Error in allProduct controller:", error);  // Add this line
    return res.status(400).json({ message: error.message });
  }
};

//deleteProduct
export const deleteProduct = async (req, res) => {
  try {

    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ message: "Product is not found with this id" });

    }    

  
    await product.remove();

    res.status(201).json({
      success: true,
      message: "Product Deleted successfully!",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}


// get all products

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};