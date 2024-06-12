module.exports.checkAuth = function(req, res, next) {

    // midleare wich verify user are login
    const userId = req.session.userid

    if(!userId) {
        res.redirect('/login')
    }

    next()
}