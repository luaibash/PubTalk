const express = require('express')
const {      //this is for later when i create the controller
    getArticles,
    getRecent,
    getTop,
    getArticle,
    getArticleTitle,
    createArticle,
    deleteArticle,
    updateArticle
} = require('../controllers/articleController')

const router = express.Router()

// GET all articles
router.get('/', getArticles)

//GET all RECENT articles
router.get('/recent', getRecent)

//GET all TOP RATED articles
router.get('/top', getTop)

//GET a single article based by title
router.get('/page/:link', getArticleTitle)

//GET a single article
router.get('/:id', getArticle)

//POST a new article
router.post('/', createArticle)

//DELETE a article
router.delete('/:id', deleteArticle)

//UPDATE a article
router.patch('/:id', updateArticle)

//TESTING API CALLS
// GET all articles 
// router.get('/', (req, res) => {
//     res.json({mssg:'GET all articles'})
// })

// //GET a single article
// router.get('/:id', (req, res) => {
//     res.json({mssg:'GET a single article'})
// })

// //POST a new article
// router.post('/', (req, res) => {
//     res.json({mssg:'POST a new article'})
// })

// //DELETE a article
// router.delete('/:id', (req, res) => {
//     res.json({mssg:'DELETE an article'})
// })

// //UPDATE a article
// router.patch('/:id', (req, res) => {
//     res.json({mssg:'UPDATE an article'})
// })


module.exports = router