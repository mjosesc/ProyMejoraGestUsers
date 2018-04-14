var errorController = {};

errorController.getErrorPage = (req,res,next)=>{
    if (req.session.username){
        if (req.session.isAdmin){
            res.render('error404',{
                title:'Error Page',
                layout:'layout',
                isLogged:true,
                isAdmin:true,
                name:req.session.username
            })
        } else {
            res.render('error404',{
                title:'Error Page',
                layout:'layout',
                isLogged:true,
                name:req.session.username
            })
        }
    }else {
        res.render('error404',{
            title:'Error Page',
            layout:'layout'
        })
    }
};

module.exports = errorController;