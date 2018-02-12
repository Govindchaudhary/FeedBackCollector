const Survey = require('../models/survey');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplates');
module.exports = (app) => {
    app.get('/api/surveys/thanks',(req,res)=>{
        res.send('thanks for voting');
    });
   app.post('/api/surveys',requireLogin,requireCredits,async(req,res)=>{
    const {title,subject,body,recipients} = req.body //ES6 syntax for title = req.body.title
    const survey = new Survey({
        title,  //ES6 syntax for title:title
        subject,
        body,
        recipients:recipients.split(',').map(email=>{              /*  for recipients we have list of comma separated emails.
                                                                    firstly we convert it into array of strings  and then 
                                                                    with the map function convert into array of objects.
                                                                  */
            return{email:email}
        }),
        _user:req.user.id,
        dateSent:Date.now()

                                                        
    });
    console.log("hi");
    const mailer = new Mailer(survey,surveyTemplate(survey));
    try{
    await mailer.send();
    await survey.save();
    req.user.credits-=1;
    const user = await req.user.save();
    res.send(user);
    } catch(err) {
        res.status(422).send(err);
    }

   }); 
};