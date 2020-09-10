const queries = require('../db/queries');
const  {bot_name} = require('../config');

let bot;

module.exports.initbot = function (b) {
    bot = b;
}

module.exports.init = async function(msg){
    //TODO: get station names, details, waiting time
    const details = queries.getStationsDetails();

    for (let i = 0; i < details.length; i++) {

    }
    //get station names and description
    //for each station get queue length
}
