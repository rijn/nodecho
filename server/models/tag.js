'use strict';

module.exports = (sequelize, DataTypes) => {
    var Tag = sequelize.define('Tag', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        }
    }, {
        timestamps: false,
        underscored: true
    });

    Tag.associate = models => {
        Tag.belongsToMany(models.Post, {
            through: {
                model: models.ItemTag,
                unique: false
            },
            foreignKey: 'tag_id',
            constraints: false
        });
    };

    return Tag;
};
