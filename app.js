const express = require('express');
const morgan = require('morgan');
const Sequelize = require('sequelize');
const layout = require('./views/layout')
const models = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user')


const app = express()


app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use('/wiki', wikiRouter)
// app.use('/user', userRouter)

app.get('/', (req, res) => {
    res.redirect('/wiki');
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