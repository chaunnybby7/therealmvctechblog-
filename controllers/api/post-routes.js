//import the express router object
const router = require('express').Router();

//include required objects for these routes
const { Post, User, Comment } = require('../../models');

//import sequelize connection to the database
const sequelize = require('../../config/connection');

//import loggedin authenticator 
const withAuth = require('../../utils/auth');
const { readSync } = require('fs');

//when a post is added, find all its content and post it in reverse so the newest post stays on the top of the page

router.get('/', (req, res) => {
    console.log('==========================');
    Post.findAll({
        attributes: ['id',
        'title',
        'content',
        'created_at'
    ],
    order: [
        ['created_at', 'DESC']
    ],
    include: [{
        model: User,
        attributes: ['username']
    },
    {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
            model: User,
            attributes: ['username']
        }
    }
]
})
    .then(dbPostData => res.json(dbPostData.reverse()))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// when a user clicks on a specific post, return all that data
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id',
            'content',
            'title',
            'created_at'
    ],
    include: [{
        model: User, 
        attributes: ['username']
    },
    {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
            model: User,
            attributes: ['username']
            }
     }
    ]
})
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id. '});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//after user submits a new post, connect user session then get above 
router.post('/', withAuth, (req, res) => {
    //creates a new Post model instance and calls save on it
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

