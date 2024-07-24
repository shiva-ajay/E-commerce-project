import jwt from "jsonwebtoken";
import User from "../model/user.js";
import Shop from "../model/shop.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Please login to continue" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};





export const isSeller = async (req, res, next) => {
  try {
    const { seller_token } = req.cookies;

    if (!seller_token) {
      return res.status(401).json({ message: "Please login to continue (seller)" });
    }

    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);
    req.seller = await Shop.findById(decoded.id);

    if (!req.seller) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};