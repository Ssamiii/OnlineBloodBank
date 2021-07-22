const router = require('express').Router();
let Blood = require('../models/blood.model');

router.route('/').get((req, res) => {
    Blood.find()
        .then(bloods => res.json(bloods))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const bloodGroup = req.body.bloodGroup;
    const date = Date.parse(req.body.date);

    const newBlood = new Blood({
        username,
        bloodGroup,
        date,
    });

    newBlood.save()
        .then(() => res.json('Blood Group added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Blood.findById(req.params.id)
        .then(blood => res.json(blood))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Blood.findByIdAndDelete(req.params.id)
        .then(() => res.json('Blood Group deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Blood.findById(req.params.id)
        .then(blood => {
            blood.username = req.body.username;
            blood.bloodGroup = req.body.bloodGroup;
            blood.date = Date.parse(req.body.date);

            blood.save()
                .then(() => res.json('Blood Group updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;