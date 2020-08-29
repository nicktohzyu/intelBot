const queries = require('../db/queries');

let bot;

module.exports.initbot = function (b) {
    bot = b;
}

module.exports.init = async function(msg){
    const stationNames = await queries.getStations();

}