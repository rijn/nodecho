'use strict';

module.exports = (sequelize, DataTypes) => {
    var Log = sequelize.define('Log', {
        ip: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        }
    }, {
        paranoid: true,
        updatedAt: false
    });

    Log.associate = models => {
        Log.belongsTo(models.Post);
    };

    return Log;
};
