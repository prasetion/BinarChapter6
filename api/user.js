const express = require('express')
const router = express.Router()
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const db = require('../models')

// register
router.get('/', function(req, res) {
    res.render("register");
})

// add user
router.post('/', (req, res) => {
    db.user_game.create({
        user_name: req.body.username,
        user_pass: req.body.password,
        admin: false
    }).then(result => {
        console.log(result);
        db.user_biodata.create({
            full_name: req.body.fullname,
            gender: req.body.gender,
            email: req.body.email,
            phone: req.body.phone,
            userGameId: result.id
        }).then(biodata => {
            console.log(biodata);
        })

        res.redirect("/dashboard")

    });
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