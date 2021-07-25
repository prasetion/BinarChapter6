const db = require('../../models')
db.user_game.destroy({
        where: {
            id: 2
        }
    })
    .then(() => console.log("yang bukan admin sudah dihapus"))