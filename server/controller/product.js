import Product from "../model/product.js";
import Shop from "../model/shop.js";

export const createProduct = async (req, res) => {
  try {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(400).json({ message: "Shop Id is invalid!" });
    } else {
      const files = req.files;
      const imageUrls = files.map((file) => `$(file.fileName)`);

      const productData = req.body;
      productData.images = imageUrls;
      productData.shop = shop;

      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        product,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
