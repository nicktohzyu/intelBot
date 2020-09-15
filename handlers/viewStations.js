const queries = require('../db/queries');
const  {bot_name} = require('../config');
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
    const details = await queries.getStationsDetails(); //[name, description]
    //for each station get queue length
    const queueLengthPromises = details.map(det => queries.getQueueLength(det[0]));
    const timeEachPromises = details.map(det => queries.getTimeEach(det[0]));

    let text = "";
    //TODO
    // add link to website
    for (let i = 0; i < details.length; i++) {
        text += details[i][0] + ":\n"
        text += details[i][1] + "\n"
        text += "Waiting time: " + ((await queueLengthPromises[i])*(await timeEachPromises[i])) + " minutes\n\n"
    }
    messenger.send(msg.from.id, text);
}
