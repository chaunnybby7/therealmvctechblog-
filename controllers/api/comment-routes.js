//dependencies
const router = require('express').Router();

//import comment model for routes
const { Comment } = require('../../models');

//create a connection with sequelize
const sequelize = require('../../config/connection');

// authorization, users should not post or update comments if they are not logged in
const withAuth = require('../../utils/auth');

// display all related comments when viewing post:/id
router.get('/', (req, res) => {
    Comment.findAll({})
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// click into a specific comment by getting the route to the id and findAll() method 
router.get('/:id', (req, res) => {
    Comment.findAll({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//when a loggedIn user posts a comment, store text, post and user ids
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        // builds new comment model instance and saves it 
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
        })
    }
});

// if a user wants to update a comment, they must be logged in
router.put('/:id', withAuth, (req, res) => {
    Comment.update({
        comment_text: req.body.comment_text
    }, {
        where: {
            id: req.params.id
        }
    }).then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id'});
            return;
        }
        res.json(dbCommentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//click on button associated with the comment id
router.delete('/:id', withAuth, (req,res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id'});
            return;
        }
        res.json(dbCommentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    
});

module.exports = router;

