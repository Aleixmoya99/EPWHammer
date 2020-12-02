const express = require('express');
const path = require('path');
const debug = require('debug')('app');
const chalk = require('chalk');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { connect } = require('mongoose');
const cors = require('cors');
const Stats = require('./src/models/main');
const myRouter = require('./src/routes/mainRouter')(Stats);

const app = express();
const port = process.env.PORT || 5000;
const dbUrl = process.env.DATABASE || 'mongodb://localhost/wargeardb';

connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public/')));

app.use('/', myRouter);

app.listen(port, () => {
  debug(`Server is running on port ${chalk.blue(port)}`);
});
