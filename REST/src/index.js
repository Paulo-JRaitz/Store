const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();

const uri = "mongodb+srv://Paulo_JRaitz:mb6iwrahTHbhTh1G@cluster0.peu4x.mongodb.net/eCommerce?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const port = 3300;

app.use(express.json());
app.use(routes);

app.listen(port)
