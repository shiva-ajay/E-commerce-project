import Order from "../model/order.js";
import Shop from "../model/shop.js";
import Product from "../model/product.js";


export const createOrder = async (req, res) => {
    try {
        const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;
  
        //   group cart items by shopId
        const shopItemsMap = new Map();
  
        for (const item of cart) {
          const shopId = item.shopId;
          if (!shopItemsMap.has(shopId)) {
            shopItemsMap.set(shopId, []);
          }
          shopItemsMap.get(shopId).push(item);
        }
  
        // create an order for each shop
        const orders = [];
  
        for (const [shopId, items] of shopItemsMap) {
          const order = await Order.create({
            cart: items,
            shippingAddress,
            user,
            totalPrice,
            paymentInfo,
          });
          orders.push(order);
        }
  
        res.status(201).json({
          success: true,
          orders,
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// get all orders of user

export const usersOrders = async (req, res) => {
  try {
    const orders = await Order.find({ "user._id": req.params.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// get all orders of seller

export const sellersOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      "cart.shopId": req.params.shopId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
