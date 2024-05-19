const Article = require('../models/articleModel')
const mongoose = require('mongoose') 

// Get all articles
const getArticles = async(req, res) => {
    const articles = await Article.find({}).sort({createdAt: -1}); // createdAt: -1 means in descending order
    res.status(200).json(articles);
}

// Get all RECENT articles with optional limit parameter that specifies how many articles to grab
const getRecentArticles = async(req, res) => {
    // Retrieves limit parameter from query string, and excludeArticles, which specifies which articles to exclude when pulling from database
    const limit = (req.query.limit) ? parseInt(req.query.limit) : null;
    const excludeArticles = (req.query.excludeArticles) ? JSON.parse(req.query.excludeArticles) : [];

    // Construct query criteria to exclude the articles based on the extracted IDs if provided
    let queryCriteria = {};
    if (excludeArticles.length > 0) queryCriteria._id = { $nin: excludeArticles.map(article => article._id) }

    // If limit is specified, find and limit the number of recent articles, otherwise, retrieve all recent articles
    let articles;
    if (limit) articles = await Article.find(queryCriteria).sort({ createdAt: -1 }).limit(limit);
    else articles = await Article.find(queryCriteria).sort({ createdAt: -1 });

    res.status(200).json(articles);
}

// Get all TOP RATED articles with optional limit parameter that specifies how many articles to grab
const getTopArticles = async(req, res) => {
    // Retrieves limit parameter from query string, if not specified, default to null
    const limit = (req.query.limit) ? parseInt(req.query.limit) : null;

    let articles;
    // If limit is specified, find and limit the number of top rated articles, otherwise, retrieve all top rated articles
    if (limit) articles = await Article.find({}).sort({ rating: -1 }).limit(limit);
    else articles = await Article.find({}).sort({ rating: -1 });

    res.status(200).json(articles);
}

// Get a single article specified by ID
const getArticleByID = async(req, res) => {
    // Retrieves id from GET request, checks if the id is within 12 bits of json, if the id is like 123 it wont work and this will trigger
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: 'Invalid article ID'});
    
    // Checks for article with id. If no article, returns an error. We need to return something as the code will continue to run if we don't
    const article = await Article.findById(id);
    if (!article) return res.status(404).json({error: 'no such article'});
    else res.status(200).json(article);
}

// Get all articles specified by genre with limit that specifies how many articles to grab, and excludeArticles that specifies which articles to exlude
const getArticlesByGenre = async(req, res) => {
    // Retrieves specified genre from GET request, limit parameter, and excludeArticles, which specifies which articles to exclude when pulling from database
    const {genre} = req.params;
    const limit = (req.query.limit) ? parseInt(req.query.limit) : null;
    const excludeArticles = (req.query.excludeArticles) ? JSON.parse(req.query.excludeArticles) : [];

    // Construct query criteria to match genre, and to exclude the articles based on the extracted IDs if provided
    let queryCriteria = { genre: { $in: [genre] } };
    if (excludeArticles.length > 0) queryCriteria._id = { $nin: excludeArticles.map(article => article._id) }

    // If limit is specified, find the number of articles specified by limit, otherwise, retrieve all articles from that genre
    let articles;
    if (limit) articles = await Article.find(queryCriteria).sort({ createdAt: -1 }).limit(limit);
    else articles = await Article.find(queryCriteria).sort({ createdAt: -1 });

    res.status(200).json(articles);
}

// Get all articles by author from most recent, with limit that specifies how many articles to grab, and excludeArticles that specifies which articles to exlude
const getArticlesByAuthor = async (req, res) => {
    // Retrieve author from GET request, limit parameter, and excludeArticles, which specifies which articles to exclude when pulling from database
    const { author } = req.params;
    const limit = (req.query.limit) ? parseInt(req.query.limit) : null;
    const excludeArticle = (req.query.excludeArticle) ? JSON.parse(req.query.excludeArticle) : null;

    // Construct query criteria to match genre, and to exclude the articles based on the extracted IDs if provided
    let queryCriteria = { author: author };
    if (excludeArticle) queryCriteria._id = { $nin: excludeArticle._id };

    // If limit is specified, find and limit the number of articles, otherwise, retrieve all articles by the author
    let articles;
    if (limit) articles = await Article.find(queryCriteria).sort({ createdAt: -1 }).limit(limit);
    else articles = await Article.find(queryCriteria).sort({ createdAt: -1 });

    res.status(200).json(articles);
}





// Create new article
const createArticle = async (req, res) => {    
    const {title, author, description, duration, genre, rating} = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }

    if (!author) {
        emptyFields.push('author')
    }

    if (!description) {
        emptyFields.push('description')
    }

    if (!duration) {
        emptyFields.push('duration')
    }

    if (!genre) {
        emptyFields.push('genre')
    }

    if (!rating) {
        emptyFields.push('rating')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'please fill in all the fields', emptyFields})
    }

    // Add doc to database
    try {
        const article = await Article.create({title, author, description, duration, genre, rating})
        res.status(200).json(article)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete an article
const deleteArticle = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {      // Checks if the id is within 12 bits of json, if the id is like 123 it wont work and this will trigger
        return res.status(404).json({error: 'no such article'})
    }

    const article = await Article.findOneAndDelete({_id: id})   // Mongodb uses _id as their param for ids

    if (!article) {
        return res.status(400).json({error: 'no such article'}) // The reason we have return call is because if we dont it will continue running the code (it wont break)
    }
    else {
        res.status(200).json(article)
    }
}

// Update an article
const updateArticle = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {     
        return res.status(404).json({error: 'no such article'})
    }

    const article = await Article.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!article) {
        return res.status(400).json({error: 'no such article'})
    }
    else {
        res.status(200).json(article)
    }

}

module.exports = {
    getArticles,
    getRecentArticles,
    getTopArticles,
    getArticleByID,
    getArticlesByGenre,
    getArticlesByAuthor,
    createArticle, 
    deleteArticle,
    updateArticle
}