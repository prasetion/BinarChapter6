const { User } = require('../models')
User.destroy({
        where: {
            admin: false
        }
    })
    .then(() => console.log("yang bukan admin sudah dihapus"))