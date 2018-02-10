const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app)=> {
    //whenever user come to this route take the req throw into requireLogi to make sure that user is login
    app.post('/api/stripe',requireLogin,async(req,res)=>{
        
    const charge = await stripe.charges.create({
            amount:500,
            currency:'usd',
            description:'$5 for 5 credits',
            source:req.body.id
      });
      req.user.credits+=5;  //req.user represent the current user thanks to passport
                            //that uses cookie to associate the user withn each request
      const user = await req.user.save();
      res.send(user); //respond to request with upadated user

  });
};