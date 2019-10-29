const router = require('express').Router();

const db = require('../db');


router.post('/', (req, res) => {
    const { title, contents } = req.body;

    if(!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        db.insert(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => res.status(500).json({ error: "There was an error while saving the post to the database" }))
    }
})

router.post('/:id/comments', (req, res) => {
    if(!req.body.text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment" })
    } else {
        db.insertComment(req.body)
        .then(comment => {
            if(comment){
                res.status(201).json(comment);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
        })
        .catch(err => res.status(500).json({ error: "There was an error while saving the comment to the database" }))
    }
})

router.get('/', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }))
})

router.get('/:id', (req, res) => {
    db.findById(req.params.id)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => res.status(404).json({ message: "The post with the specified ID does not exist." }))
})

router.get('/:id/comments', (req, res) => {
    const id = req.params.id
    db.findPostComments(id)
    .then(comments => {
        if(comments) {
            res.status(200).json(comments)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => res.status(500).json({ error: "The comments information could not be retrieved." }))
})


router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
    .then(post => {
        if(post) {
            res.status(200).json(post)
        } else {
            return res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => res.status(500).json({ error: "The post could not be removed" }))
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { title, contents } = req.body;
    
    if(!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        db.update(id, req.body)
        .then(post => {
            if(post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist."  })
            }
        })
        .catch(err => res.status(500).json({ error: "The post information could not be modified." }))
    }
})


module.exports = router;