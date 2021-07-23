const { user_game } = require('../../models')
user_game.create({
        user_name: 'tio',
        user_pass: '123456',
        admin: false
    })
    .then(user_game => {
        console.log(user_game)
    })