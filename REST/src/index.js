const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();

const uri = "";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const port = 3300;

app.use(express.json());
app.use(routes);

app.listen(port)
