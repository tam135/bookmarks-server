const express = require('express')
const bookmarkRouter = express.Router()
const bodyParser = express.json()
const uuid = require('uuid/v4')
const logger = require('./logger')
const store = require('./store')

bookmarkRouter
    .route('/bookmark')
    .get((req, res) => {
        res
            .json(store.bookmarks)
    })
    .post(bodyParser, (req, res) => {
        const { title, url, description, rating } = req.body;

        if (!title) {
            logger.error(`Title is required`);
            return res
                .status(400)
                .send('Invalid Data')
        }

        if (!url) {
            logger.error(`A URL is required`);
            return res
                .status(400)
                .send(`Invalid Data`)
        }

        if (!description) {
            logger.error(`Description is required`);
            return res
                .status(400)
                .send('Invalid Data')
        }

        if (!rating) {
            logger.error(`A rating is required`);
            return res
                .status(400)
                .send(`Invalid Data`)
        }

        const bookmark = { id: uuid(), title, url, description, rating }

        store.booksmarks.push(bookmark)
        logger.info(`bookmark with id ${id} created`);

        res
            .status(201)
            .location(`http://localhost:8000/bookmark/${id}`)
            .json(bookmark)
    })

bookmarkRouter  
    .route('/bookmark/:id')
    .get((req, res) => {
        const { id } = req.params;
        const bookmark = store.bookmarks.find(b => b.id == id);

        if (!bookmark) {
            logger.error(`Bookmark with id ${id} not found.`);
            return res
                .status(404)
                .send('Bookmark not found')
        }

        res.json(bookmark)
    })
    .delete((req,res) => {
        const { id } = req.params;

        const bookmarkIndex = store.bookmark.findIndex(bm => bm.id === id)

        if (bookmarkIndex === -1) {
            logger.error(`Bookmark with id ${id} not found.`);
            return res
                .status(404)
                .send('Not Found');
        }

        store.bookmarks.splice(bookmarkIndex, 1);

        logger.info(`Bookmark with id ${id} deleted`)
        res
            .status(404)
            .end();
    })

module.exports = bookmarkRouter

