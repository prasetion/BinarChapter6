const express = require('express')
const router = express.Router()
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const { user_game } = require('../models')

// register
router.get('/', function(req, res) {
    res.render("register");
})


// add user
router.post('/', (req, res) => {

})

// changing data user
router.put("/:id", (req, res) => {
    user_game.update({
            title: req.body.title,
            body: req.body.body,
            approved: req.body.approved
        }, {
            where: { id: req.params.id }
        })
        .then(result => {
            res.status(201).json(result)
        }).catch(err => {
            res.status(422).json("Can't create user")
        })
})

// delete user
router.delete("/:id", (req, res) => {
    user_game.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => console.log("sudah dihapus"))
})

module.exports = router