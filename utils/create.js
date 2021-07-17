const { User } = require('../models')
User.create({
        name: 'admin',
        password: 'admin',
        admin: true
    })
    .then(article => {
        console.log(article)
    })