const express = require('express')
const Transactions = require('../models/Transaction')
const auth = require('../middleware/auth.middleware')
const router = express.Router({ mergeParams:true })

router
    .route('/')
    .get(auth, async (req, res) => {
        try {
            const list = await Transactions.find({ userId: req.user._id})
            res.status(200).send(list)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            })
        }
    })
    .post(auth, async (req, res) => {
        try {
            const newTransaction = await Transactions.create({
                ...req.body,
                userId: req.user._id
            })
            res.status(201).send(newTransaction)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            })
        }
    })

module.exports = router
