const pg = require('pg');
const config = require('../config').db_config;

if (process.env.NODE_ENV === 'production') {
    config["ssl"] = { rejectUnauthorized: false }
}
const pool = new pg.Pool(config);
// console.log("Postgres pool created");

pool.on('error', function (err, client) {//TODO: is client param redundant?
    // if an error is encountered by a client while it sits idle in the pool
    // the pool itself will emit an error event with both the error and
    // the client which emitted the original error
    // this is a rare occurrence but can happen if there is a network partition
    // between your application and the database, the database restarts, etc.
    // and so you might want to handle it and at least log it out
    console.error('idle client error', err.message, err.stack);
});

//export the query method for passing queries to the pool 
module.exports.query = function (text, values, callback) {
    //console.log(text);
    let r = pool.query(text, values, callback);
    return r; //error after this line
};

// the pool also supports checking out a client for 
// multiple operations, such as a transaction 
module.exports.connect = function (callback) {
    let r = pool.connect(callback);
    return r;
};