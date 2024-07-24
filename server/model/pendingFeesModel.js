import mongoose from "mongoose";


const pendingFeesSchema = new mongoose.Schema({
  shop_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop'
  },
  charge_id: {
    type: String,
    required: true,
  },
  customer_id: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  
  

},{timestamps: true});



export default mongoose.model("PendingFees", pendingFeesSchema);
