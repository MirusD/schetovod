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

router.delete('/:transactionId', auth, async (req, res) => {
    try {
        const { transactionId } = req.params
        const removeTransaction = await Transactions.findById( transactionId )

        if (removeTransaction.userId.toString() === req.user._id) {
            await removeTransaction.remove()
            return res.send(null)
        } else {
            res.status(401).json({ message: 'Ошибка при удалении счёта. Вы не авторизованы' })
        }
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        })
    }
})

module.exports = router
