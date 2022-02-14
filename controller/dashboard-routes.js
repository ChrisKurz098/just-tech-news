const router = require('express').Router();
const res = require('express/lib/response');
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

const withAuth = require('../utils/auth')

const voteCount = [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count'];

// '/dashboard'
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            //use the id from the session 
            user_id: req.session.user_id
        },
        attributes: ['id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
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
            //serialize data before sending to babel__template
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })

});

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post_url', 'title', 'created_at', voteCount],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
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
            const post = dbPostData.get({ plain: true });
            res.render('edit-post', { post, loggedIn: req.session.loggedIn});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });
    module.exports = router;