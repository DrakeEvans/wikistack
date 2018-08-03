const express = require('express');
const morgan = require('morgan');
const Sequelize = require('sequelize');
const layout = require('../views/layout');
const models = require('../models');
const addPage = require('../views/addPage');
const wikiPageCreator = require('../views/wikipage');

const router = express.Router();

const { Page } = require("../models");



router.post('/', async (req, res, next) => {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  const page = new Page({
    title: req.body.title,
    content: req.body.content,
  });
  

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }
  console.log(page)
});


router.get('/', (req, res, next) => {
    res.send(layout('Hello World'))
});

router.get('/add', (req, res, next) => {
    res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
    console.log('slug', req.params.slug)
    const pageFound = await Page.findOne({
        where: {
            slug: req.params.slug 
        }
    })
    console.log('Page', Page, '\n')
    console.log('pageFound', pageFound, '\n')
   res.send(wikiPageCreator(pageFound))
  });

module.exports = router;