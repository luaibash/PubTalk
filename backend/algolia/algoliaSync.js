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
        const articles = await Article.find().select('title author description genre');

        // Map all articles to an acceptable format for algolia
        const algoliaArticleObjects = articles.map(article => ({
            objectID: article._id.toString(),
            ...article.toObject()
        }));
        
        // Clear the Algolia articles index to remove any articles that don't exist anymore
        await articlesIndex.clearObjects();
        console.log('Algolia articles index cleared');

        // Sync the articles to algolia
        await articlesIndex.saveObjects(algoliaArticleObjects);
        console.log('Algolia articles index synced');
    } catch (error) {
        console.error('Error syncing Algolia articles index:', error);
    }

    // Sync authors index
    try {
        // Select every author, and take only relevant portions of the authors for searches
        const authors = await Author.find();

        // Map all authors to an acceptable format for algolia
        const algoliaAuthorObjects = authors.map(author => ({
            objectID: author._id.toString(),
            ...author.toObject()
        }));

        // Clear the Algolia authors index to remove any authors that don't exist anymore
        await authorsIndex.clearObjects();
        console.log('Algolia authors index cleared');

        // Sync the authors to algolia
        await authorsIndex.saveObjects(algoliaAuthorObjects);
        console.log('Algolia authors index synced');
    } catch (error) {
        console.error('Error syncing Algolia authors index:', error);
    }
};

module.exports = syncAlgolia;