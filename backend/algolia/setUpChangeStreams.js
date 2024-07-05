const {syncAlgoliaPubtalkIndex} = require('./syncAlgolia');

// Sets up a listener that triggers on any change to the mongo DB, used to resync the algolia DB
const setUpChangeStreams = (db) => {
    // Triggers on any MongoDB entry change, syncing the algolia pubtalk index
    const handleDbEntryChange = async (change) => {
        console.log('MongoDB change detected:', change);
        await syncAlgoliaPubtalkIndex();
    };

    // Set up the listener for each table
    const articleChangeStream = db.collection('articles').watch();
    const authorChangeStream = db.collection('authors').watch();

    // Set up the trigger for each table
    articleChangeStream.on('change', handleDbEntryChange);
    authorChangeStream.on('change', handleDbEntryChange);

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