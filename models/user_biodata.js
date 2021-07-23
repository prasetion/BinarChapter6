// 'use strict';
// const {
//   Model
// } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    // class user_biodata extends Model {
    //   /**
    //    * Helper method for defining associations.
    //    * This method is not a part of Sequelize lifecycle.
    //    * The `models/index` file will call this method automatically.
    //    */
    //   static associate(models) {
    //     // define association here
    //   }
    // };
    // user_biodata.init({
    //   full_name: DataTypes.STRING,
    //   gender: DataTypes.STRING,
    //   email: DataTypes.CHAR,
    //   phone: DataTypes.INTEGER,
    //   user_id: DataTypes.INTEGER
    // }, {
    //   sequelize,
    //   modelName: 'user_biodata',
    // });

    const user_biodata = sequelize.define("user_biodata", {
        full_name: {
            type: DataTypes.STRING
        },
        gender: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.CHAR
        },
        email: {
            type: DataTypes.INTEGER
        }
    });

    user_biodata.associate = models => {
        user_biodata.belongsTo(models.user_game, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return user_biodata;
};