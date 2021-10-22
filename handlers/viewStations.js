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
    const stationIDs = await queries.getStationIDs(); //array of station names
    //for each station get queue length
    const stationNamePromises = stationIDs.map(st => queries.getStationName(st));
    const queueLengthPromises = stationIDs.map(st => queries.getQueueLength(st));
    const timeEachPromises = stationIDs.map(st => queries.getTimeEach(st));

    let text = websiteText;
    for (let i = 0; i < stationIDs.length; i++) {
        text += (await stationNamePromises[i]) + "\n"
        text += "Queue length: " + (await queueLengthPromises[i]) + "\n"
        text += "Estimated waiting time: " + ((await queueLengthPromises[i])*(await timeEachPromises[i])) + " minutes\n\n"
    }
    messenger.send(msg.from.id, text);
}
