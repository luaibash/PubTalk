const syncAlgolia = require('./algoliaSync');

// Sets up a listener that triggers on any change to the mongo DB, used to resync the algolia DB
const setUpChangeStreams = (db) => {
    // Triggers on any change, calling the syncAlgolia function
    const handleDbChange = async (change) => {
        console.log('MongoDB Change detected:', change);
        await syncAlgolia();
    };

    // Set up the listener for each table
    const articleChangeStream = db.collection('articles').watch();
    const authorChangeStream = db.collection('authors').watch();

    // Set up the trigger for each table
    articleChangeStream.on('change', handleDbChange);
    authorChangeStream.on('change', handleDbChange);

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