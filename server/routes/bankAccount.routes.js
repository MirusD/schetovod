const express = require('express')
const BankAccount = require('../models/BankAccount')
const Token = require("../models/Token");
const router = express.Router({mergeParams:true})

router
    .route('/')
    .get(async (req, res) => {
        try {
            const list = await BankAccount.find()
            res.status(200).send(list)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            })
        }
    })
    .post(async (req, res) => {
        try {
            const bankAccount = await BankAccount.create(req.body)
            res.status(201).send(bankAccount)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            })
        }
    })

router.delete('/:bankAccountId', async (req, res) => {
    try {
        const { bankAccountId } = req.params
        const removedBankAccount = await BankAccount.findById( bankAccountId )

        if (removedBankAccount) {
            await removedBankAccount.remove()
            return res.send(null)
        }
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        })
    }
})

module.exports = router
