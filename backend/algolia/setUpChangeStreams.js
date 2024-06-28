const { syncAlgoliaArticlesIndex, syncAlgoliaAuthorsIndex } = require('./syncAlgolia');

// Sets up a listener that triggers on any change to the mongo DB, used to resync the algolia DB
const setUpChangeStreams = (db) => {
    // Triggers on any article MongoDB change, syncing the articles index
    const handleDbArticleChange = async (change) => {
        console.log('MongoDB article change detected:', change);
        await syncAlgoliaArticlesIndex();
    };

    // Triggers on any author MongoDB change, syncing the authors index
    const handleDbAuthorChange = async (change) => {
        console.log('MongoDB author change detected:', change);
        await syncAlgoliaAuthorsIndex();
    };

    // Set up the listener for each table
    const articleChangeStream = db.collection('articles').watch();
    const authorChangeStream = db.collection('authors').watch();

    // Set up the trigger for each table
    articleChangeStream.on('change', handleDbArticleChange);
    authorChangeStream.on('change', handleDbAuthorChange);

    // Error handling
    articleChangeStream.on('error', (error) => {
        console.error('Article Change Stream Error:', error);
        setUpChangeStreams(db); // Reconnect on error
    });
    authorChangeStream.on('error', (error) => {
        console.error('Author Change Stream Error:', error);
        setUpChangeStreams(db); // Reconnect on error
    });
};

module.exports = setUpChangeStreams;