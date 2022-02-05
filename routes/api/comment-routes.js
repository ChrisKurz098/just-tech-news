const router = require('express').Router();
const { Comment } = require('../../models');

//GET api/comment/
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: ['id', 'comment_text', 'created_at'],
        order: [['created_at', 'DESC']],
    }).then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

//POST api/comment/
router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});


// DELETE api/comment/:id
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {id: req.params.id}
    }).then(dbCommentDeleted => res.json(dbCommentDeleted))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;