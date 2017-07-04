'use strict';

module.exports = (sequelize, DataTypes) => {
    var Post = sequelize.define('Post', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },
        summary: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: { notEmpty: true }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: { notEmpty: true }
        },
        location: {
            type: DataTypes.STRING,
            _validate: { optional: true }
        },
        password: {
            type: DataTypes.STRING,
            _validate: { optional: true }
        },
        private: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            _validate: { optional: true }
        }
    }, {
        paranoid: true,
        getterMethods: {
            _id_ () { return require('../utils/idt').encode('Post', this.id); }
        }
    });

    Post.associate = models => {
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
