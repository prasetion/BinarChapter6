const { user_history } = require('../../models')
user_history.create({
        game: 'batu gunting kertas',
        score: 55,
        userGameId: 3
    })
    .then(user_history => {
        console.log(user_history)
    })