const {insertEntryPubtalkIndex, updateEntryPubtalkIndex, deleteEntryPubtalkIndex} = require('./syncAlgolia');

// Sets up a listener that triggers on any change to the mongo DB, used to resync the algolia DB
const setUpChangeStreams = (db) => {
    // Triggers on any MongoDB entry change, syncing the algolia pubtalk index
    const handleDbEntryChange = async (change) => {
        const operationType = change.operationType;
        if (operationType == 'insert') {
            console.log('MongoDB INSERT detected:', change);
            await insertEntryPubtalkIndex(change);
        }
        else if (operationType == 'update') {
            console.log('MongoDB UPDATE detected:', change);
            await updateEntryPubtalkIndex(change);
        }
        else if (operationType == 'delete') {
            console.log('MongoDB DELETE detected:', change);
            await deleteEntryPubtalkIndex(change);
        }
        else {
            console.log('Unknown MongoDB change detected, not running update command:', change);
        }
    };

    // Set up the listener for each table
    const articleChangeStream = db.collection('articles').watch();
    const authorChangeStream = db.collection('authors').watch();
    const genreChangeStream = db.collection('genres').watch();

    // Set up the trigger for each table
    articleChangeStream.on('change', handleDbEntryChange);
    authorChangeStream.on('change', handleDbEntryChange);
    genreChangeStream.on('change', handleDbEntryChange);

    // Error handling
    articleChangeStream.on('error', (error) => {
        console.error('Article Change Stream Error:', error);
        setUpChangeStreams(db); // Reconnect on error
    });
    authorChangeStream.on('error', (error) => {
        console.error('Author Change Stream Error:', error);
        setUpChangeStreams(db); // Reconnect on error
    });
    genreChangeStream.on('error', (error) => {
        console.error('Genre Change Stream Error:', error);
        setUpChangeStreams(db); // Reconnect on error
    });
};

module.exports = setUpChangeStreams;