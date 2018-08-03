const express = require('express');
const morgan = require('morgan');
const Sequelize = require('sequelize');
const layout = require('./views/layout')
const models = require('./models');


const app = express()


app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send(layout(''))
});


const init = async () => {
    await models.db.authenticate().then(() => {
        console.log('\nconnected to the database\n');
      })
    await models.db.sync({force:true});
    const port = 3000
    app.listen(port, () => {
        console.log(`\nListening on Port ${port}\n`)
    });
};

init();