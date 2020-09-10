const {Collection} = require('../collection')
const {Router} = require('express');
const router = Router();
const collection = new Collection('notes');
const {check, validationResult} = require('express-validator')

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

router.post('/notes', 
    [
        check('title', 'Тема должна быть от 1 до 10 символов').isLength({min:1, max:25}),
        check('description', 'Описание должно быть от 1 до 100 символов').isLength({min:1, max:200})
    ], 
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректные данные'
                })
            }
            const {title, description} = req.body;
            const note = await collection.insertOne({title, description});
            res.status(201).json({message: 'Запись создана'});
        }   catch {
            res.status(500).json({ message: 'Что то не так' })     
        }
})

router.put('/notes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const {title, description} = req.body;
        const note = await collection.updateOne(id, {title, description});
        res.status(200).json({message:'Обновление успешно'});
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