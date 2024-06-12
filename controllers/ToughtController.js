const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtsController {
    static async showToughts(req, res) {
        res.render('toughts/home')
    }

    static async dashboard(req, res) {
        res.render('toughts/dashboard')
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