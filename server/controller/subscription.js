import SubscriptionPlan from '../model/subscriptionPlanModel.js'
import SubscriptionDetail from '../model/subscriptionDetailModel.js'

export const addPlan = async (req, res) => {
    
    try {
        const { name, stripe_price_id, trial_days, have_trial, amount, type } = req.body;
        
        const newPlan = new SubscriptionPlan({
            name,
            stripe_price_id,
            trial_days,
            have_trial,
            amount,
            type,
          });
      
          await newPlan.save();
      
          res.status(201).json({
            success: true,
            msg: 'Subscription plan added successfully',
            data: newPlan,
          });

    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message,
    })
}

};


export const getPlans = async (req, res) => {
    try {
        const plans = await SubscriptionPlan.find();
    
        return res.status(200).json({
          success: true,
          msg: 'Plans',
          data: plans
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
          // Add error handling here, e.g.,
          error: error.message
        });
      }
}

export const getPlanDetails = async (req, res) => {
    try {
        const { plan_id } = req.body;
        
        const plan = await SubscriptionPlan.findOne({
            _id: plan_id
        });
        
        if (!plan) {
            return res.status(400).json({
                success: false,
                msg: 'Plan not found!'
            });
        }

        const shop_id = req.shop.shop._id;
        const haveBuyedAnyPlan = await SubscriptionDetail.countDocuments({ user_id });

        var subs_msg = '';
        
        if (haveBuyedAnyPlan === 0 && plan.have_trial === true) {
          subs_msg = `You will get ${plan.trial_days} days trial, and after we will charge $${plan.amount} amount for ${plan.name} Subscription Plan.`;
        } else {
          subs_msg = `We will charge $${plan.amount} amount for ${plan.name} Subscription Plan.`;
        }
        
        return res.status(200).json({
          success: true,
          msg: subs_msg,
          data: plan
        });;

    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message,
    })
}
}