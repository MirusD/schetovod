const express = require('express')
const BankAccount = require('../models/BankAccount')
const router = express.Router({mergeParams:true})

router.get('/', async (req, res) => {
    try {
        const list = await BankAccount.find()
        res.status(200).send(list)
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        })
    }
})

module.exports = router
