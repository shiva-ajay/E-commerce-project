import mongoose from "mongoose";


const cardDetailSchema = new mongoose.Schema({
  shop_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop'
  },
  customer_id: {
    type: String,
    required: true,
  },
  card_id: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },

   card_no: {
    type: String,
    required: false, 
  },
  
   brand: {
    type: String,
    required: false, 
  },
   month: {
    type: String,
    required: false, 
  },
   year: {
    type: Number,
    required: false, 
  },
  

},{timestamps: true});



export default mongoose.model("CardDetail", cardDetailSchema);
