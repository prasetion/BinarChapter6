const express = require('express')
const router = express.Router()
const app = express();

const db = require("../models")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

router.get('/', (req, res) => {
    db.user_game.findAll({
        include: [db.user_history, db.user_biodata]
    }).then(result => {

        let scores = [];
        let allPlayerName = [];

        result.forEach(score => {
            const full_name = score.user_biodatum.full_name;
            for (let index = 0; index < score.user_histories.length; index++) {
                let item = score.user_histories[index];
                scores.push(item);
                allPlayerName.push(full_name);
            }
        });

        res.render("score", {
            scores,
            allPlayerName
        })

    });
})

router.post('/', (req, res) => {
    db.user_game.findAll({
        include: [db.user_history, db.user_biodata]
    }).then(result => {

        let scores = [];
        let allPlayerName = [];

        result.forEach(score => {
            const full_name = score.user_biodatum.full_name;
            if (req.body.playername == full_name) {
                for (let index = 0; index < score.user_histories.length; index++) {
                    let item = score.user_histories[index];
                    scores.push(item);
                    allPlayerName.push(full_name);
                }
            }
        });

        res.render("score", {
            scores,
            allPlayerName
        })

    });
})

module.exports = router;