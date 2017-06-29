/* eslint-disable no-useless-escape */

'use strict';

module.exports = function (sequelize, DataTypes) {
    var Token = sequelize.define('Token', {
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                is: ['^([a-zA-Z0-9]|[_]){4,16}$', 'gi']
            }
        }
    });

    Token.associate = function (models) {
        Token.belongsTo(models.User);
    };

    return Token;
};
