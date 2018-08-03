const express = require('express');
const morgan = require('morgan');
const Sequelize = require('sequelize');
const layout = require('../views/layout')
const models = require('../models');
const addPage = require('../views/addPage')

const router = express.Router();



router.get('/', (req, res, next) => {
    res.send(layout('Hello World'))
});

router.post('/', (req, res, next) => {
    res.send(layout('Hello World'))
});

router.get('/add', (req, res, next) => {
    res.send(addPage());
});

module.exports = router;