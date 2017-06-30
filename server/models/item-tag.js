'use strict';

module.exports = (sequelize, DataTypes) => {
    var ItemTag = sequelize.define('ItemTag', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tag_id: {
            type: DataTypes.INTEGER,
            unique: 'item_tag_taggable'
        },
        taggable: {
            type: DataTypes.STRING(191),
            unique: 'item_tag_taggable'
        },
        taggable_id: {
            type: DataTypes.INTEGER,
            unique: 'item_tag_taggable',
            references: null
        }
    }, {
        timestamps: false,
        underscored: true
    });

    return ItemTag;
};
