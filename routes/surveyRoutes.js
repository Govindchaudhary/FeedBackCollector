const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');
const Survey = mongoose.model('surveys'); //since we didn't export anything from survey we have to do this way
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplates');
const keys = require('../config/keys');
sgMail.setApiKey(keys.sendgridKey);
module.exports = (app) => {
    app.get('/api/surveys/thanks',(req,res)=>{
        res.send('thanks for voting');
    });
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        
        const { title, subject, body, recipients } = req.body;
    
        const survey = new Survey({
          title,
          subject,
          body,
          recipients: recipients.split(',').map(email => ({ email: email.trim() })),
          _user: req.user.id,
          dateSent: Date.now()
        });
       
    
        // Great place to send an email!
        const mailer = new Mailer(survey, surveyTemplate(survey));
        
    
        try {
          await sgMail.send(mailer);
         
          await survey.save();
          req.user.credits -= 1;
          const user = await req.user.save();
    
          res.send(user);
        } catch (err) {
          res.status(422).send(err);
        }
      });
};