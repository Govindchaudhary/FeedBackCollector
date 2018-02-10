const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');


mongoose.connect(keys.mongoURI);
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');
const app = express();

//whenever a post/put/pet request comes into application this middleware parse the request body and assign to req.body pty of request.
//bcos express doesnot by default parse the request payload hence this is necessary
app.use(bodyParser.json());
app.use(cookieSession({
    maxAge:30*24*60*60*1000,
    keys:[keys.cookieKey]
})
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
billingRoutes(app);
const PORT = process.env.PORT || 5000 ;
app.listen(PORT); 