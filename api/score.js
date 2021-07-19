const express = require('express')
const router = express.Router()
const app = express();

//   model
const { user_history } = require('../models')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// all score
router.get('/', function(req, res) {
    user_history.findAll()
        .then(result => {
            console.log(result);
            res.render('score', {
                result
            });
        })
})

// get score by id
router.get('/filter', (req, res) => {
    res.render("filter", result);
})

// get score by id
router.post('/filter', (req, res) => {

})

module.exports = router;