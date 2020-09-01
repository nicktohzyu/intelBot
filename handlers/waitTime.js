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
        const text = await queries.getWaitInfo(station);
        messenger.send(msg.from.id, text);
    }
}
