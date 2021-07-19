const { user_biodata } = require('../../models')
user_biodata.create({
        full_name: 'admin',
        gender: "male",
        email: "admin@gmail.com",
        phone: 08126738,
        user_id: 2
    })
    .then(user_history => {
        console.log(user_history)
    })