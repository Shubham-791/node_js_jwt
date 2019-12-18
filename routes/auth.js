const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isRegistrationValid, isLoginValid } = require('../validations');
// Validation

router.post('/register', async (req, res) => {
    const { error } = isRegistrationValid(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send('Email already exists');

    // Hashed Passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        return res.send({ user: savedUser._id });
    }
    catch (err) {
        // console.log(err);
        res.setStatus(500);
        return res.send(error.details[0].message);
    }

});

router.post('/login', async (req, res) => {
    const { error } = isLoginValid(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email Not Found');
    // User password comapred with hashed password
    const loginSuccess = await bcrypt.compare(req.body.password, user.password);
    if (!loginSuccess)
        res.send('Password Does not match');
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.header('auth-token', token).send(token);
});

module.exports = router;