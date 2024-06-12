const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtsController {
    static async showToughts(req, res) {
        res.render('toughts/home')
    }

    static async dashboard(req, res) {

        const userId = req.session.userid

        try {
            const user = await User.findOne({
                where: {
                    id: userId
                }, 
                include: Tought,
                plain: true
            })

            // check if user exists
            if(!user) {
                res.redirect('/login')
            }

            const toughts = user.Toughts.map((result)=> result.dataValues)

            res.render('toughts/dashboard', { toughts })
        } catch (e) {
            console.log(e)
        }
    }

    static createTought(req, res) {
        res.render('toughts/create')
    }

    static async createToughtPost(req, res) {
        
        const toughts = {
            title: req.body.title,
            UserId: req.session.userid
        }

        try {

            await Tought.create(toughts)
            req.flash('message', 'pensamento criado com sucesso')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })

        } catch (e) {
            console.log(e)
        }

    }
}