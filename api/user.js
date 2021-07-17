const express = require('express')
const router = express.Router()
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// define api route
router.get('/', function(req, res) {
    res.json({
        message: "kurang lengkap pathnya"
    })
})

// get all users
router.get('/users', function(req, res) {
    console.log("get all data user");
    res.status(200).json(users);
})

// get user by id
router.get('/users/:id', (req, res) => {
    const user = users.find(i => i.id == +req.params.id)
    res.status(200).json(user);
})

// add user
router.post('/add', (req, res) => {
    console.log(req.body);
    const { username, password, fullname } = req.body
    const id = users[users.length - 1].id + 1;

    // new temp user
    const user = {
        id,
        username,
        password,
        fullname
    }

    // add to users
    users.push(user)
    res.status(201).json(user);

    console.log("add user data");
})

// changing data user
router.put("/users/:id", (req, res) => {
    let user = users.find(i => i.id == +req.params.id)

    // sebenrnya masih kurang faham dibagian sini mas
    const params = {
        username: req.body.username,
        password: req.body.password,
        fullname: req.body.fullname
    }

    user = {...user, ...params }

    // update data user
    users = users.map(i => i.id == user.id ? user : i)
    res.status(200).json(users)
    console.log("change user data");
})

// delete user
router.delete("/users/:id", (req, res) => {
    users = users.filter(i => i.id != +req.params.id)
    res.status(200).json({
        message: `success delete user`
    })
    console.log("delete user data");
})

module.exports = router