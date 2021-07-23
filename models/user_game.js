// 'use strict';
// const {
//     Model
// } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    // class user_game extends Model {
    //   /**
    //    * Helper method for defining associations.
    //    * This method is not a part of Sequelize lifecycle.
    //    * The `models/index` file will call this method automatically.
    //    */
    //   static associate(models) {
    //     // define association here
    //   }
    // };
    // user_game.init({
    //   user_name: DataTypes.CHAR,
    //   user_pass: DataTypes.CHAR,
    //   admin: DataTypes.BOOLEAN
    // }, {
    //   sequelize,
    //   modelName: 'user_game',
    // });

    const user_game = sequelize.define("user_game", {
        user_name: {
            type: DataTypes.CHAR
        },
        user_pass: {
            type: DataTypes.CHAR
        },
        admin: {
            type: DataTypes.BOOLEAN
        }
    });

    user_game.associate = models => {
        user_game.hasMany(models.user_history, {
            onDelete: "cascade"
        });

        user_game.hasOne(models.user_biodata, {
            onDelete: "cascade"
        });
    }

    return user_game;
};