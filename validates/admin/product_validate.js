module.exports = (req,res, next) => {
    console.log(req.body);
    if(!req.body.title){
        req.flash('error', `Please enter the title`);
        return res.redirect('back');
    }
    next();
}