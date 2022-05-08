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

//get route to single user id, to get user info
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [{
            model: Post,
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ]
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'created_at'],
            include: {
                model: Post,
                attributes: ['title']
        }
    },
    {
        model: Post, 
        attributes: ['title'],

    }
]
    })
    .then(dbUserData => {
        if (!dbUserData){
        res.status(404).json({ message: 'No user found with this id. '});
        return;
    }
    res.json(dbUserData);   
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create username and password in the request for when user signs up
// post route to user data 
router.post('/', (req, res) => {

    User.create({
        username: req.body.username,
        password: req.body.password
    })

    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

