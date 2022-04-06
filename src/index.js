require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri =
	'mongodb+srv://admin:adminadmin@veilicsmongodb.jtjr5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(mongoUri);
mongoose.connection.on('connected', () => {
	console.log('connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
	console.log('Error connecting to mongo', err);
});

app.get('/', requireAuth, (req, res) => {
	res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
	console.log('listening on port 3000');
});
