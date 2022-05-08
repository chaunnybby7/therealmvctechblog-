const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET route to find all user datas, comments made by users on dashboard page
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        include: [{
            model: Comment, 
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            icnlude: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
    ]
})
    .then(dbPostData => {
    const posts = dbPostData.map(post => post.get({ plain: true}));
    res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// when a user clicks to edit a specific id, making sure they are loggedIn
router.get('/edit/:id', withAuth, (req, res) => {
    // if user is loggedIn, find that post by the id
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id',
        'title',
        'content',
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
    // if no post is found with that data found by id, post error message
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id. '});
            return;
        }
        // or else return object rendered to edit-post page
        const post = dbPostData.get({ plain: true });
        res.render('edit-post', { post, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//when a user clicks /new to add a post, render that page