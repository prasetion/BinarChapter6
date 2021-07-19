const { user_history } = require('../../models')
user_history.create({
        game: 'batu gunting kertas',
        score: 70,
        user_id: 2
    })
    .then(user_history => {
        console.log(user_history)
    })