const express = require('express')
const router = express.Router()
const app = express();

const { user_biodata } = require("../models")
const { user_history } = require("../models")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// get score by id
router.get('/', (req, res) => {
    res.render("filter");
})

// get score by id
router.post('/filter', (req, res) => {

})

module.exports = router;