const passport = require('passport');

module.exports = (app) => {


/*  we are saying hey passport attempt to authentiate the user who is coming to this route 
and use the defined  google strategy and we are asking google to give access to their profile and email.
so flow goes like this --------------------->
  forward user request to google -----> ask user if they grant permission ----> if they grants permission
 ------> redirect to /auth/google/callback?code=456(some code)
 all of this is done by(--->calling ----->1st argument of passport.use)
*/

app.get('/auth/google',passport.authenticate('google',{
    scope:['profile','email']
}));


/*whenever we reach to this route we are telling passport hey grab the user details and store in database
then redirect to /surveys  
so flow goes like --------------->
put user on hold take the code from URL -------->send request to google with code included
 --------> google sees the code in the url replies with details about this user
----------> get user details(---> calling arrow function which is 2nd argument of passport.use )
  create new record in the database ------>redirect to surveys
*/

app.get('/auth/google/callback',passport.authenticate('google'),(req,res)=>{
    res.redirect("/surveys");
});

app.get('/api/current_user',(req,res)=>{
    res.send(req.user)
});

app.get('/api/logout',(req,res)=>{
    req.logout();
    res.redirect("/");
});

}


