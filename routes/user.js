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

// find data user
router.post("/find/:id", (req, res) => {
    db.user_game.findOne({
            where: { id: req.params.id },
            include: [db.user_history, db.user_biodata]
        })
        .then(result => {
            res.render("edit", { result })
        })
})

// find data user
router.post("/edit/:id", (req, res) => {
    db.user_game.update({
            user_name: req.body.username,
            user_pass: req.body.password,
            admin: false
        }, {
            where: { id: req.params.id }
        })
        .then(user => {
            db.user_biodata.update({
                    full_name: req.body.fullname,
                    gender: req.body.gender,
                    email: req.body.email,
                    phone: req.body.phone
                }, {
                    where: { userGameId: req.params.id }
                })
                .then(result => {
                    console.log(result);
                    console.log("user game sudah diupdate")
                    res.redirect("/dashboard")
                })

        })
})

// delete user
router.post("/delete/:id", (req, res) => {
    db.user_biodata.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            console.log("biodata sudah dihapus")

            db.user_game.destroy({
                where: {
                    id: req.params.id
                }
            }).then(() => {
                console.log("username sudah dihapus");
            });

        })

    res.redirect("/dashboard")
})

module.exports = router