const express = require('express')
const router = express.Router()
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const db = require('../models')

// get all data user
router.get('/', function(req, res) {
    db.user_game.findAll({
        where: { admin: false },
        include: [db.user_history, db.user_biodata]
    }).then(result => {
        res.send(result)
    });
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

        res.send(result)

    });
})

// changing data user
router.put("/:id", (req, res) => {
    db.user_game.update({
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

    res.status(200).json({
        message: `success delete user`
    })
})

module.exports = router