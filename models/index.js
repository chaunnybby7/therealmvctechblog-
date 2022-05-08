// import our 3 models created in the controllers file 
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// creates an association between User and Posts
// User.hasMany() = one user has multiple posts 
User.hasMany(Post, {
    foreignKey: 'user_id'
}
);

// creates a one to one relation between Post and User
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

//creates a one to one relation between Comment and User
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

//creates a one to one relation between Comment and Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: "cascade"
});

// create a one to many relation between User and Comment
// One user hasMany Comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: "cascade"
})

module.exports = { User, Post, Comment };