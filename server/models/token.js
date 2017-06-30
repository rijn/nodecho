/* eslint-disable no-useless-escape */

'use strict';

module.exports = (sequelize, DataTypes) => {
    var Token = sequelize.define('Token', {
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                is: ['^([a-zA-Z0-9]){32}$', 'gi']
            }
        }
    });

    Token.associate = models => {
        Token.belongsTo(models.User);
    };

    return Token;
};
