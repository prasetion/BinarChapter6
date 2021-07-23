const { user_biodata } = require('../../models')
user_biodata.create({
        full_name: 'prasetio',
        gender: "male",
        email: "admin@gmail.com",
        phone: 08126738,
        userGameId: 3
    })
    .then(user_history => {
        console.log(user_history)
    })