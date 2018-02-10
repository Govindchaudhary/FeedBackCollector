module.exports = (req,res,next) => {
    if(!req.user){
        return res.status(401).send({error:'you must log in!'});
    }
    next(); //called when middleware is complete or finished
             //everything looks good let this user continue on to actual request hander  

}