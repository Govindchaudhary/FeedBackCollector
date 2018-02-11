module.exports = (req,res,next) => {
    if(req.user.credits<1){
        return res.status(403).send({error:'you do not have enough credits!'});
    }
    next(); //called when middleware is complete or finished
             //everything looks good let this user continue on to actual request hander  

}