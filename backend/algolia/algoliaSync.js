require('dotenv').config();                         // Allows use of the .env folder which holds private data
const algoliasearch = require('algoliasearch');     // Algolia package to access algolia account
const Article = require('../models/articleModel');  // Gets the article model to retrieve all articles and sync them in algolia
const Author = require('../models/authorModel');    // Gets the author model to retrieve all author and sync them in algolia

// Connect to algolia environment and indexes
const algoliaClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
const articlesIndex = algoliaClient.initIndex('articles');                                       // Articles table
const authorsIndex = algoliaClient.initIndex('authors');                                         // Authors table

// Sync MongoDB data to the Algolia database
const syncAlgolia = async () => {
    // Sync articles index
    try {
        // Select every article, and take only relevant portions of the articles for searches
        const articles = await Article.find().select('title _id author description genre');

        // Map all articles to an acceptable format for algolia, and sync them
        const algoliaArticleObjects = articles.map(article => ({
            objectID: article._id.toString(),
            ...article.toObject()
        }));
        await articlesIndex.saveObjects(algoliaArticleObjects);

        // Log that the articles sync worked
        console.log('Algolia articles index synced');
    } catch (error) {
        console.error('Error syncing Algolia articles index:', error);
    }

    // Sync authors index
    try {
        // Select every author, and take only relevant portions of the authors for searches
        const authors = await Author.find();

        // Map all authors to an acceptable format for algolia, and sync them
        const algoliaAuthorObjects = authors.map(author => ({
            objectID: author._id.toString(),
            ...author.toObject()
        }));
        await authorsIndex.saveObjects(algoliaAuthorObjects);

        // Log that the authors sync worked
        console.log('Algolia authors index synced');
    } catch (error) {
        console.error('Error syncing Algolia authors index:', error);
    }
};

module.exports = syncAlgolia;