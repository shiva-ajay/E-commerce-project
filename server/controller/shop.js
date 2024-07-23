import Shop from "../model/shop.js"
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import sendToken from "../utils/jwtToken.js";
import path from "path";
import sendShopToken from "../utils/shopToken.js";
import cloudinary from "cloudinary";


// create activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};



export const createShop = async (req, res) => {
  try {
    const { email } = req.body;
    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      return res.status(400).json({ message: "User already exist!" });
    }

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
    });


    const seller = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
    };

    const activationToken = createActivationToken(seller);
    const activationUrl = `http://localhost:5173/shop/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your Shop",
        message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${seller.email} to activate your shop!`,
      });
    } catch (error) {
      console.error("Email sending error:", error);
      res.status(500).json({ message: "Email could not be sent" });
    }
  } catch (error) {
    console.error("Error creating shop:", error);
    res.status(500).json({ message: error.message });
  }
};


export const loginShop = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide all fields!" });
    }

    const user = await Shop.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "User doesn't exist!" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    sendShopToken(user, 201, res);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
};


export const loadShop = async (req, res) => {
  try {
    const seller = await Shop.findById(req.seller._id);

    if (!seller) {
      return res.status(400).json({ message: "User doesn't exist!" });
    }

    res.status(200).json({
      success: true,
      seller,
    });
    console.log(seller)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// log out from shop
  export const logOut = async (req, res) => {
    try {
      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }