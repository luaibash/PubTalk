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

// Inserts the given entry to the pubtalk index
const insertEntryPubtalkIndex = async (object) => {
    try {
        // Retrieve all important values from incoming mongoDB object
        const table = object.ns.coll;
        const entry = object.fullDocument;
        let newAlgoliaObject;

        // Map entry to an acceptable format for algolia, based on type of entry
        if (table === "articles") {
            newAlgoliaObject = {
                objectID: entry._id.toString(),
                objectType: "article",
                id: entry._id,
                title: entry.title,
                author: entry.author,
                description: entry.description,
                genre: entry.genre,
                createdAt: entry.createdAt,
            };
        }
        else if (table === "authors") {
            newAlgoliaObject = {
                objectID: entry._id.toString(),
                objectType: "author",
                ...entry
            };
        }
        else if (table === "genres") {
            newAlgoliaObject = {
                objectID: entry._id.toString(),
                objectType: "genre",
                ...entry
            };
        }
        else {
            console.log(`New object is from unknown table ${table}, skipping upsert`);
            return;
        }

        // Save the new object to algolia
        await pubtalkDatabaseIndex.saveObject(newAlgoliaObject);
        console.log('Inserted new object into Algolia pubtalk index:', newAlgoliaObject);
    } catch (error) {
        console.error('Error inserting object into Algolia pubtalk index:', error);
    }
};

// Updates the given entry to the pubtalk index
const updateEntryPubtalkIndex = async (object) => {
    try {
        // Retrieve the updated fields and the objectID of the existing entry
        const updatedFields = object.updateDescription.updatedFields;
        const objectID = object.documentKey._id.toString();

        // Update the existing object in algolia
        await pubtalkDatabaseIndex.partialUpdateObject({
            objectID,
            ...updatedFields
        });
        console.log('Updated object in Algolia pubtalk index:', { objectID, ...updatedFields });
    } catch (error) {
        console.error('Error updating object in Algolia:', error);
    }
};

// Deletes the given entry from the pubtalk index
const deleteEntryPubtalkIndex = async (object) => {
    try {
        // Retrieve the objectID of the existing entry
        const objectID = object.documentKey._id.toString();

        // Delete the existing object in algolia
        await pubtalkDatabaseIndex.deleteObject(objectID);
        console.log('Deleted object from Algolia pubtalk index with objectID', objectID);
    } catch (error) {
        console.error('Error deleting object from Algolia pubtalk index:', error);
    }
};

module.exports = {
    syncAlgoliaPubtalkIndex,
    insertEntryPubtalkIndex,
    updateEntryPubtalkIndex,
    deleteEntryPubtalkIndex,
}