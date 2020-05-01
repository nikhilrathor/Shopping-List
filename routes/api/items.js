const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Item = require('../../models/Item');

router.get('/:userid', (req, res) => {
    const user = req.params.userid;
    Item.find({userid: user})
        .sort({ date: -1 })
        .then(items => res.json(items));
});

router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        userid: req.body.userid
    });
    newItem.save()
        .then(item => res.json(item));
});

router.delete('/:id', auth, (req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then(item => res.json({ success: true }))
        .catch(err => res.status(404).json({ success: false }))
});


module.exports = router;