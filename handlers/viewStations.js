const queries = require('../db/queries');
const  {bot_name, websiteText} = require('../config');
const messenger = require('../messenger');

let bot;

module.exports.initbot = function (b) {
    bot = b;
}

module.exports.init = async function(msg){
    if (msg.from.id !== msg.chat.id) {
        const text = "This command should be used by participants as a direct message to me at @" + bot_name;
        messenger.send(msg.chat.id, text);
        return;
    }
    //get station names and description
    const stations = await queries.getStations(); //[name, description]
    //for each station get queue length
    const queueLengthPromises = stations.map(st => queries.getQueueLength(st));
    const timeEachPromises = stations.map(st => queries.getTimeEach(st));

    let text = websiteText;
    for (let i = 0; i < stations.length; i++) {
        text += stations[i] + "\n"
        text += "Waiting time: " + ((await queueLengthPromises[i])*(await timeEachPromises[i])) + " minutes\n\n"
    }
    messenger.send(msg.from.id, text);
}
