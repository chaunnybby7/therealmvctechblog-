const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

//creates Comment model
class Comment extends Model {}

Comment.init({
    // sequelize recognizes id as a primary key for users 
    id: {
        // set our datatype to INTEGER value
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment_text: {
        // set our datatype to STRING value for the comment texts
        type: DataTypes.STRING,
        validate: {
            len: [3]
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'post',
            key: 'id'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
});

module.exports = Comment;
