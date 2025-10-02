const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

// auththonthication Middleware
const authMiddleware = require('../middleware/authMiddleware')

router.get("/all-questions", authMiddleware, (req, res) => {
    res.send("all questions")
})

module.exports = router