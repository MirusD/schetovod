const express = require('express')
const router = express.Router({mergeParams: true})

router.use('/bank-accounts', require('./bankAccount.routes'))
router.use('/bank-accounts/types', require('./typesBankAccount.routers'))
router.use('/bank-accounts/groups', require('./bankAccountGroups.routes'))
router.use('/transactions', require('./transactions.routes'))
router.use('/categories', require('./category.routes'))
router.use('/auth', require('./auth.routes'))

module.exports = router
