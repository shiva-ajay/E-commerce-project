import mongoose from "mongoose";


const subscriptionDetailSchema = new mongoose.Schema({
  shop_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop'
  },
  stripe_subscription_id: {
    type: String,
    required: false,
  },
  stripe_subscription_schedule_id: {
    type: String,
    required: false,
  },
  stripe_customer_id: {
    type: String,
    required: true,
  },
  subscription_plan_price_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubscriptionPlan',
  },
   plan_amount: {
    type: Number,
    required: true, 
  },
  
   plan_amount_currency: {
    type: String,
    required: true, 
  },
   plan_interval: {
    type: String,
    required: false, 
  },
   plan_interval_count: {
    type: Number,
    required: false, 
  },
  created: {
    type: Date,
    required: true, 
  },
  
  plan_period_start: {
    type: Date,
    required: true, 
  },
  
  plan_period_end: {
    type: Date,
    required: true, 
  },
  
  trial_end: {
    type: Date,
    default: null,
  },

  status:{
    type: String,
    enum: ['active','cancelled'],
    required: true
  },
  
  cancel: {
    type: Boolean,
    default: false, 
  },
  canceled_at: {
    type: Date,
    default: null, 
  },

},{timestamps: true});



export default mongoose.model("SubscriptionDetail", subscriptionDetailSchema);
