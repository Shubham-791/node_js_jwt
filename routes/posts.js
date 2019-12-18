const router = require('express').Router();
const verify = require('../verifyToken');
const User = require('../models/userModel');
router.get('/', verify, async (req, res, next) => {
    const user = await User.findOne({ _id: req.user._id });
    return res.send(user);
});


module.exports = router;
