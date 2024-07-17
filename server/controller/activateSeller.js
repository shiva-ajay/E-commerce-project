import Shop from "../model/shop.js"
import jwt from "jsonwebtoken";
import sendToken from "../utils/jwtToken.js";
import sendShopToken from "../utils/shopToken.js";


export const activateSeller = async (req, res) => {
    try {
      const { activation_token } = req.body;
  
      const newSeller = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
  
      if (!newSeller) {
        return res.status(400).json({ error: "Invalid Token" });
      }
  
      const { name, email, password, avatar, zipCode, address, phoneNumber } = newSeller;
  
      let seller = await Shop.findOne({ email });
  
      if (seller) {
        return res.status(400).json({ error: "User already exists" });
      }
  
      seller = await Shop.create({
        name,
        email,
        avatar,
        password,
        zipCode,
        address,
        phoneNumber,
      });
  
      sendShopToken(seller, 201, res);
    } catch (error) {
      console.error("User activation error:", error);
      res.status(500).json({ error: error.message });
    }
  };