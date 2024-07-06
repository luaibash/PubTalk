require('dotenv').config();                         // Allows use of the .env folder which holds private data
const algoliasearch = require('algoliasearch');     // Algolia package to access algolia account
const Article = require('../models/articleModel');  // Gets the article model to retrieve all articles and sync them in algolia
const Author = require('../models/authorModel');    // Gets the author model to retrieve all authors and sync them in algolia
const Genre = require('../models/genreModel');      // Gets the genre model to retrieve all genres and sync them in algolia

// Connect to algolia environment and indexes
const algoliaClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
const pubtalkDatabaseIndex = algoliaClient.initIndex('pubtalk'); // The name of the DB in algolia, holds all entries in one table

// Sync MongoDB's database to the Algolia pubtalk index on startup, deleting and then re-adding all entries
const syncAlgoliaPubtalkIndex = async () => {
    try {
        // Select every article, taking only relevant portions, and map to an acceptable format for algolia
        const articles = await Article.find().select('title author description genre createdAt');
        const algoliaArticleObjects = articles.map(article => ({
            objectID: article._id.toString(),
            objectType: "article",
            ...article.toObject()
        }));

        // Select every author, and map to an acceptable format for algolia
        const authors = await Author.find();
        const algoliaAuthorObjects = authors.map(author => ({
            objectID: author._id.toString(),
            objectType: "author",
            ...author.toObject()
        }));

        // Select every genre, and map to an acceptable format for algolia
        const genres = await Genre.find();
        const algoliaGenreObjects = genres.map(genre => ({
            objectID: genre._id.toString(),
            objectType: "genre",
            ...genre.toObject()
        }));
    
        // Clear the Algolia pubtalk index to remove any entries that don't exist anymore
        await clearAlgoliaPubtalkIndex();

        // Sync the articles to algolia
        await pubtalkDatabaseIndex.saveObjects(algoliaArticleObjects);
        console.log('Algolia articles synced to pubtalk index');

        // Sync the authors to algolia
        await pubtalkDatabaseIndex.saveObjects(algoliaAuthorObjects);
        console.log('Algolia authors synced to pubtalk index');

        // Sync the genres to algolia
        await pubtalkDatabaseIndex.saveObjects(algoliaGenreObjects);
        console.log('Algolia genres synced to pubtalk index')
    } catch (error) {
        console.error('Error syncing Algolia pubtalk index:', error);
    }
};

// Clear the Algolia pubtalk index. Used on startup or for testing
const clearAlgoliaPubtalkIndex = async () => {
    try {
        await pubtalkDatabaseIndex.clearObjects();
        console.log('Algolia pubtalk index cleared');
    } catch (error) {
        console.error('Error clearing Algolia pubtalk index:', error);
    }
}

module.exports = syncAlgoliaPubtalkIndex;