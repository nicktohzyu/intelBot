const queries = require('../db/queries');
const messenger = require('../messenger');

let bot;

module.exports.initbot = function (b) {
    bot = b;
}

module.exports.init = async function (msg) {
    const station = await queries.getStation(msg.from.id);
    if (station === null) {
        const text = "You're not in a queue currently";
        messenger.send(msg.from.id, text);

    } else {
        const timePer = await queries.getTimeEach(station);
        const queueLength = await queries.getQueueLength(station);
        const text = "You're in the queue for: " + station +
            "\n\nThere are " + (queueLength - 1) + " participants ahead of you." +
            "\n\nThe expected waiting time is " + (queueLength - 1) * timePer + " minutes.";
        messenger.send(msg.from.id, text);
    }
}
