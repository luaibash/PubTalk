require('dotenv').config();                          // Allows use of the .env folder which holds private data
const algoliasearch = require('algoliasearch');      // Algolia package to access algolia account
const Article = require('../models/articleModel');   // Gets the article model to retrieve all articles and sync them in algolia

// Connect to algolia environment and indexes
const algoliaClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
const algoliaIndex = algoliaClient.initIndex('articles');                                       // Articles table

// Sync MongoDB data to the Algolia database
const syncAlgolia = async () => {
    // Sync articles index
    try {
        // Select every article, and take only relevant portions of the article for searches
        const articles = await Article.find().select('title _id author description genre');

        // Map all articles to an acceptable format for algolia, and sync them
        const algoliaObjects = articles.map(article => ({
            objectID: article._id.toString(),
            ...article.toObject()
        }));
        await algoliaIndex.saveObjects(algoliaObjects);

        // Log that the articles sync worked
        console.log('Algolia articles index synced');
    } catch (error) {
        console.error('Error syncing Algolia articles index:', error);
    }
};

module.exports = syncAlgolia;