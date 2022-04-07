const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
	const { email, password } = req.body;
	const user = new User({ email, password });

	try {
		await user.save();
		const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');

		res.send({ token });
	} catch (err) {
		return res.status(422).send(err.message);
	}
});

router.post('/signin', async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(422).send({ error: 'Must provide email & password' });
	}

	const user = await User.findOne({ email });
	if (!user) {
		return res.status(422).send({ error: 'NO USER Invalid password or email' });
	}

	try {
		await user.comparePassword(password);
		const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');

		res.send({ token });
	} catch (err) {
		return res
			.status(422)
			.send({ error: 'WRONG PW Invilid password or email' });
	}
});

module.exports = router;
