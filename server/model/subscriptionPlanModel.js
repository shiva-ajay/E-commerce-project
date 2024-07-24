import mongoose from "mongoose";


const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  stripe_price_id: {
    type: String,
    required: true,
  },
  trial_days: {
    type: Number,
    required: true, 
   
  },
  have_trial: {
    type: Boolean,
    default: false,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },

},{timestamps: true});



export default mongoose.model("SubscriptionPlan", subscriptionSchema);
