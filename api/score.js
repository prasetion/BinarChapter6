const express = require('express')
const router = express.Router()
const app = express();

const { user_biodata } = require("../models")
const { user_history } = require("../models")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

router.get('/', (req, res) => {
    // user_history.hasMany(user_biodata, { foreignKey: "user_id" });
    // user_biodata.belongsTo(user_history)
    // user_history.findAll({
    //     include: [{
    //         model: user_history,
    //         required: true
    //     }]
    // }).then(result => {
    //     console.log(result);
    // })

    user_history.findAll().then(result => {
        console.log(result);
        res.render("score", {
            result
        })
    })
})

module.exports = router;