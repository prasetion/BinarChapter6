const { User } = require('../models')
    // Kita lakukan query terhadap user
    // user tersebut memiliki id yang bernilai 1
const query = {
    where: { id: 1 }
}
User.update({
        admin: false
    }, query)
    .then(() => {
        console.log("User berhasil diupdate")
        process.exit()
    })
    .catch(err => {
        console.error("Gagal mengupdate user!")
    })