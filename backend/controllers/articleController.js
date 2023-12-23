const Article = require('../models/ArticleModel')
const mongoose = require('mongoose') 

//get all articles
const getArticles = async(req, res) => {
    const articles = await Article.find({}).sort({createdAt: -1}) //i leave the object blank because i dont need to look for a specific thing like where rep: 20
    //the createdAt: -1 means in decsending order
   
    res.status(200).json(articles)
}

//get all RECENT articles
const getRecent = async(req, res) => {
    const articles = await Article.find({}).sort({createdAt: -1})
   
    res.status(200).json(articles)
}

//get all TOP RATED articles
const getTop = async(req, res) => {
    const articles = await Article.find({}).sort({rating: -1})
   
    res.status(200).json(articles)
}


//get a single article
const getArticle = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {      //checks if the id is within 12 bits of json, if the id is like 123 it wont work and this will trigger
        return res.status(404).json({error: 'no such article'})
    }

    const article = await Article.findById(id)

    if (!article) {
        return res.status(404).json({error: 'no such article'}) //the reason we have return call is because if we dont it will continue running the code (it wont break)
    }
    else {
        res.status(200).json(article)
    }
}


//create new article
const createArticle = async (req, res) => {     //async function
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

    //add doc to db
    try {
        const article = await Article.create({title, author, description, duration, genre, rating})
        res.status(200).json(article)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}


//delete an article
const deleteArticle = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {      //checks if the id is within 12 bits of json, if the id is like 123 it wont work and this will trigger
        return res.status(404).json({error: 'no such article'})
    }

    const article = await Article.findOneAndDelete({_id: id})   //mongodb uses _id as their param for ids

    if (!article) {
        return res.status(400).json({error: 'no such article'}) //the reason we have return call is because if we dont it will continue running the code (it wont break)
    }
    else {
        res.status(200).json(article)
    }
}


//update an article
const updateArticle = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {      //checks if the id is within 12 bits of json, if the id is like 123 it wont work and this will trigger
        return res.status(404).json({error: 'no such article'})
    }

    const article = await Article.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!article) {
        return res.status(400).json({error: 'no such article'}) //the reason we have return call is because if we dont it will continue running the code (it wont break)
    }
    else {
        res.status(200).json(article)
    }

}



module.exports = {
    getArticles,
    getRecent,
    getTop,
    getArticle,
    createArticle, 
    deleteArticle,
    updateArticle
}