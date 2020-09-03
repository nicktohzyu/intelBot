require('dotenv').config()
module.exports.token = process.env.BOT_TOKEN
module.exports.server_url = process.env.SERVER_URL //no uses?
module.exports.api_url = process.env.API_URL + module.exports.token + '/'
// module.exports.secret_url = process.env.SERVER_URL+process.env.BOT_TOKEN
module.exports.bot_name = process.env.BOT_NAME
module.exports.debug = JSON.parse(process.env.DEBUG)

//testing for heroku env variables
// console.log("token: ", module.exports.token);
// console.log("server url: ", module.exports.server_url);
// console.log("api_url: ", module.exports.api_url);
// console.log("bot_name: ", module.exports.bot_name);

module.exports.db_config = {
    user: process.env.DB_USER, //env var: PGUSER
    database: process.env.DB_DATABASE, //env var: PGDATABASE
    password: process.env.DB_PASSWORD, //env var: PGPASSWORD
    host: process.env.DB_HOST, // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

module.exports.help = "/queueinfo - (admin) get into on the station's queue\n" +
    "/setmax - (admin) update the max queue length\n" +
    "/settime - (admin) update the estimated time per participant in minutes\n" +
    "/getfront - (admin) get the username of the participant in front\n" +
    "/removefront - (admin) confirmation dialog to remove participant in front\n" +
    "/getall - (admin) get the usernames of all participants (slow)";
module.exports.about = " ";
module.exports.start = "bot started";

module.exports.superusers = [653601805] //array of user id
