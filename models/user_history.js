// 'use strict';
// const {
//   Model
// } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    // class user_history extends Model {
    //   /**
    //    * Helper method for defining associations.
    //    * This method is not a part of Sequelize lifecycle.
    //    * The `models/index` file will call this method automatically.
    //    */
    //   static associate(models) {
    //     // define association here
    //   }
    // };
    // user_history.init({
    //   game: DataTypes.STRING,
    //   score: DataTypes.INTEGER,
    //   user_id: DataTypes.INTEGER
    // }, {
    //   sequelize,
    //   modelName: 'user_history',
    // });

    const user_history = sequelize.define("user_history", {
        game: {
            type: DataTypes.STRING
        },
        score: {
            type: DataTypes.INTEGER
        }
    });

    user_history.associate = models => {
        user_history.belongsTo(models.user_game, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return user_history;
};