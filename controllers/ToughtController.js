const { where } = require('sequelize')
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

            let emptyToughts = false

            if(toughts.length === 0) {
                emptyToughts = true
            }

            res.render('toughts/dashboard', { toughts, emptyToughts })
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

    static async removeTought(req, res) {
        const id = req.body.id
        const userId = req.session.userid

        try {

            await Tought.destroy({where: {id: id, UserId: userId}})

            req.flash('message', 'pensamento removido com sucesso')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })

        } catch (e) {
            console.log(e)
        }
    }

    static async updateTought(req, res) {
        const id = req.params.id

        try  {
            const tought = await Tought.findOne({where: {id: id}, raw:  true})

            res.render('toughts/edit', {tought})

        } catch(e) {
            console.log(e)
        }
        
    }

    static async updateToughtPost(req, res) {

        const id = req.body.id

        const tought = {
            title: req.body.title
        }

        try {

            await Tought.update(tought, {where: {id: id}})

            req.flash('message', 'pensamento editado com sucesso')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })

        } catch(e) {
            console.log(e)
        }

    }
}