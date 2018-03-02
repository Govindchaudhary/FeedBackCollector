const mongoose = require('mongoose');
const _ = require('lodash');
const Path = require('path-parser');
const {URL} = require('url');
const sgMail = require('@sendgrid/mail');
const Survey = mongoose.model('surveys'); //since we didn't export anything from survey we have to do this way
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplates');
const keys = require('../config/keys');
sgMail.setApiKey(keys.sendgridKey);
module.exports = (app) => {

    app.get('/api/surveys',requireLogin,async(req,res)=> {
      const surveys = await Survey.find({_user:req.user.id}).select({recipients:false});
                                                            //we dont want recipients
      res.send(surveys);
    })
    app.get('/api/surveys/:surveyId/:choice',(req,res)=>{
        res.send('thanks for voting');
    });

    app.post('/api/surveys/webhooks',(req,res)=>{
      const p = new Path('/api/surveys/:surveyId/:choice');

    //iterate through the req.body apply map and then remove undefined using comapct and then remove duplicates by uniq.
    //and finally for each survey find corresponding survey in database and update it.

     _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },  //$inc and $set are mongodb operator
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec(); //actually execute
      })
      .value();
     res.send({});
   
    
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