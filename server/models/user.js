/* eslint-disable no-useless-escape */

'use strict';

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                is: ['^([a-zA-Z0-9]|[_]){4,16}$', 'gi']
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                is: ['^([0-9a-zA-Z_\\\-/+!@#$%^&*]){6,255}$', 'gi']
            }
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                isEmail: true,
                is: ['edu$', 'gi']
            }
        },
        authority: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        avatar: {
            type: DataTypes.STRING(64)
        }
    }, {
        paranoid: true,
        getterMethods: {
            _id_ () { return require('../utils/idt').encode('User', this.id); }
        }
    });

    return User;
};
