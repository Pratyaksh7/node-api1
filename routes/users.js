const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', async(req, res) =>{
    try {
        const users = await User.find()
        res.json(users);

    } catch(e) {
        res.send('Error'+ e)
    }
})

router.get('/:id', async(req, res) =>{
    try {
        const user = await User.findById(req.params.id)
        res.json(user);

    } catch(e) {
        res.send('Error'+ e)
    }
})

router.post('/', async(req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        flag: req.body.flag
    })
    try{
        const u1 = await user.save()
        res.json(u1)

    } catch(err){
        res.send('Error')
    }
})

router.patch('/:id', async(req, res) => {
    try{
        const user = await User.findById(req.params.id)
        user.flag = req.body.flag

        const u1 = await user.save()
        res.json(u1)
    } catch(e) {
        res.send("error!"+ e)
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const user = await User.findById(req.params.id)
        user.delete()
        res.send("User Deleted Successfully!")
    } catch(e){
        res.send("Error:" + e)
    }
})

module.exports = router