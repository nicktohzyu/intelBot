const queries = require('../db/queries');
const messenger = require('../messenger');

module.exports.init = async function (msg) {
    if (msg.from.id !== msg.chat.id) {
        const text = "This command should be used by participants as a direct message to the bot.";
        messenger.send(msg.chat.id, text);
        return;
    }
    const station = await queries.getStation(msg.from.id);
    if (station === null) {
        const text = "You're not in a queue currently";
        messenger.send(msg.from.id, text);

    } else {
        const text = await queries.getWaitInfo(station, msg.from.id);
        messenger.send(msg.from.id, text);
    }
}
