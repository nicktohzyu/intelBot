const queries = require('../db/queries');
const messenger = require('../messenger');

// for admins in group chat to get the length of their queue
module.exports.init = async function (msg) {
    const station = await queries.getAdminStation(msg.chat.id);
    if (station === null) {
        const text = "Error, unable to find linked station";
        messenger.send(msg.chat.id, text);
    } else {
        const length = await queries.getQueueLength(station);
        const maxQueue = await queries.getMaxQueueLength(station)
        const text = "Number of participants queueing: " + length +
            "\n\nThe maximum number of participants is " + maxQueue;
        messenger.send(msg.chat.id, text);
    }
}