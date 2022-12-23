const express = require('express')
const BankAccount = require('../models/BankAccount')
const Transaction = require('../models/Transaction')
const auth = require('../middleware/auth.middleware')
const router = express.Router({ mergeParams:true })

router
    .route('/', )
    .get(auth, async (req, res) => {
        try {
            const list = await BankAccount.find({ userId: req.user._id})
            res.status(200).send(list)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            })
        }
    })
    .post(auth, async (req, res) => {
        try {
            const newBankAccount = await BankAccount.create({
                ...req.body,
                userId: req.user._id
            })
            res.status(201).send(newBankAccount)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            })
        }
    })

router.patch('/:bankAccountId', auth, async (req, res) => {
    try {
        const { bankAccountId } = req.params
        const bankAccount = await BankAccount.findById(bankAccountId)
        if (bankAccount.userId.toString() === req.user._id) {
            const updateBankAccount = await BankAccount.findByIdAndUpdate(bankAccount, req.body, { new: true})
            res.send(updateBankAccount)
        } else {
            res.status(401).json({ message: 'Ошибка при обновлении счёта. Вы не авторизованы' })
        }
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        })
    }
})

router.delete('/:bankAccountId', auth, async (req, res) => {
    try {
        const { bankAccountId } = req.params
        const bankAccount = await BankAccount.findById( bankAccountId )

        if (bankAccount.userId.toString() === req.user._id) {
            await bankAccount.updateOne({ existing: false })
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
