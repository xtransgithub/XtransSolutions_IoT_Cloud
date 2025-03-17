const express = require("express")
const aryanController = require("../controllers/aryanController")
const authenticateJWT = require('../middleware/authenticateJWT'); 

const router = express.Router()
// console.log(1.5)
router.get('/aryan', authenticateJWT, aryanController.getAryan);

module.exports = router