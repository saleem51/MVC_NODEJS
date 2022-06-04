const express = require('express');
const {registerView, loginView, registerUser, loginUser} = require('../controllers/loginController');
const { dashboardView } = require("../controllers/dashBoardController");
const { protectRoute } = require("../auth/protect");

const router = express.Router();

router.get('/register', registerView);
router.get('/login', loginView);
router.get('/dashboard', protectRoute, dashboardView);

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;