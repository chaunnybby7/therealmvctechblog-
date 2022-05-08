const router = require('express').Router();
//imports user, post, comment models to our routes
const { User, Post, Comment } = require('../../models');

// get the route to find all users data 
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

