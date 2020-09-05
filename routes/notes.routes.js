const {Collection} = require('../collection')
const {Router} = require('express');
const router = Router();
const collection = new Collection('notes');

router.get('/notes', async (req,res) => {
    try {
        const notes = await collection.list();
        res.json(notes);
    }   catch {
        res.status(500).json({ message: 'Что то не так' })     
    }
})

router.get('/notes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const note = await collection.findOne({id});
        res.json(note);
    }   catch {
        res.status(500).json({ message: 'Что то не так' })     
    }
})

router.post('/notes', async (req, res) => {
    try {
        const {title, description} = req.body;
        const note = await collection.insertOne({title, description});
        res.json(note);
    }   catch {
        res.status(500).json({ message: 'Что то не так' })     
    }
})

router.put('/notes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const {title, description} = req.body;
        const note = await collection.updateOne(id, {title, description});
        res.json(note);
    }   catch {
        res.status(500).json({ message: 'Что то не так' })     
    }
})

router.delete('/notes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const note = await collection.deleteOne(id);
        res.status(200).json({ message: 'ok' });
    }   catch {
        res.status(500).json({ message: 'Что то не так' })     
    }
})

module.exports = router;