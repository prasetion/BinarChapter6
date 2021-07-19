const { user_game } = require('../models')

const query = {
    where: { id: 1 }
}

user_game.update({
        admin: false
    }, query)
    .then(() => {
        console.log("User berhasil diupdate")
        process.exit()
    })
    .catch(err => {
        console.error("Gagal mengupdate user!")
    })