const express = require('express')
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const router = express.Router({ mergeParams:true })
const tokenService = require('../services/token.service')
const bcrypt = require('bcryptjs')
const { generateUserData } = require('../utils/helper')

router.post('/signUp', [
    check('username', 'Поле имя не может быть пустым').exists(),
    check('email', 'Нерорректный email').normalizeEmail().isEmail(),
    check('password', 'Минимальная длина пароля 8 символов').isLength({ min: 8 }),
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: errors,
                        code: 400,
                        // errors: errors.array()
                    }
                })
            }

            const { email, password } = req.body
            const existingUser = await User.findOne({ email })

            if (existingUser) {
                return res.status(400).json({
                    message: 'Пользователь с таким Email уже существует'
                })
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            const newUser = await User.create({
                ...generateUserData(),
                ...req.body,
                password: hashedPassword,
            })

            const tokens = tokenService.generate({ _id: newUser._id })
            await tokenService.save(newUser._id, tokens.refreshToken)

            res.status(201).send({ ...tokens, userID: newUser._id, username: newUser.username, avatar: newUser.avatar})

        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            })
        }
    }])

router.post('/signInWithPassword', [
    check('email', 'Email некорректный').normalizeEmail().isEmail(),
    check('password', 'Пароль не может быть пустым').exists(),
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "INVALID DATA",
                    err: errors
                })
            }

            const { email, password } = req.body
            const existingUser = await User.findOne({ email })

            if (!existingUser) {
                return res.status(400).send({
                    message: 'Неверный Email или пароль'
                })
            }

            const isPasswordEqual = await bcrypt.compare(password, existingUser.password)

            if (!isPasswordEqual) {
                return res.status(400).send({
                    message: 'Неверный Email или пароль'
                })
            }

            const tokens = tokenService.generate({ _id: existingUser._id})
            await tokenService.save(existingUser._id, tokens.refreshToken)

            res.status(200).send({ ...tokens, userID: existingUser._id, username: existingUser.username, avatar: existingUser.avatar })

        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            })
        }
    }
])

function isTokenInvalid(data, dbToken) {
    return !data || !dbToken || data._id !== dbToken?.userID?.toString()
}

router.post('/token', async (req, res) => {
    try {
        const { refresh_token: refreshToken } = req.body
        const data = tokenService.validateRefresh(refreshToken)
        const dbToken = await tokenService.findToken(refreshToken)

        if (isTokenInvalid(data, dbToken)) {
            return res.status(401).json({ message: 'Unauthorized'})
        }

        const tokens = await tokenService.generate({
            _id: data._id
        })
        await tokenService.save(data._id, tokens.refreshToken)

        res.status(200).send({ ...tokens, userId: data._id })
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        })
    }
})

module.exports = router
