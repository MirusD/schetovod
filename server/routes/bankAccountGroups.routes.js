const express = require('express')
const BankAccountGroups = require('../models/BankAccountGroups')
const auth = require('../middleware/auth.middleware')
const router = express.Router({mergeParams:true})

router
    .route('/')
    .get(auth, async (req, res) => {
        try {
            const list = await BankAccountGroups.find({ userId: null })
            const listUserGroupBankAccount = await BankAccountGroups.find({ userId: req.user._id })
            res.status(200).send([...list, ...listUserGroupBankAccount])
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            })
        }
    })
    .post(auth, async (req, res) => {
        try {
            const newCategory = await BankAccountGroups.create({
                userId: req.user._id,
                ...req.body
            })
            res.status(201).send(newCategory)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Поробуйте позже'
            })
        }
    })

module.exports = router
