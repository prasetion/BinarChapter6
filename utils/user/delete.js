const { user_game } = require('../models')
user_game.destroy({
        where: {
            admin: false
        }
    })
    .then(() => console.log("yang bukan admin sudah dihapus"))