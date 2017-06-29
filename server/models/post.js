'use strict';

module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define('Post', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    }, {
        paranoid: true,
        getterMethods: {
            _id_ () { return require('../utils/idt').encode('Post', this.id); }
        }
    });

    Post.associate = function (models) {
        Post.belongsTo(models.User);
        Post.belongsToMany(models.Tag, {
            through: {
                model: models.ItemTag,
                unique: false,
                scope: {
                    taggable: 'post'
                }
            },
            foreignKey: 'taggable_id',
            constraints: false
        });
    };

    return Post;
};
