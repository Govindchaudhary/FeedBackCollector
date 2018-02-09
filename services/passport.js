const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user,done)=>{
    done(null,user.id);  //telling passport that we are done with extracting userid from user info
                          //and now it should resume auth process 
});

 passport.deserializeUser(async(id,done)=> {
   const user = await User.findById(id);
        done(null,user);
  });


/*
 we got the user details from google then 2nd argument is called to create new record in database with this info
*/
passport.use(new GoogleStrategy({
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/auth/google/callback',
    proxy:true
},async(accessToken,refreshToken,profile,done)=> {
   const existingUser = await User.findOne({googleId:profile.id});
        if(existingUser) {
            done(null,existingUser); //tells passport hey we are done we found the user now it should resume process
        }
        else{
           const user = await new User({googleId:profile.id}).save();
            done(null,user);//we are finished with creating user now it should resume the process
        }
    }
));