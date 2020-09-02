const queries = require('../db/queries');
const messenger = require('../messenger');

// get the telegram handle of the front person
module.exports.init = async function (msg) {
    if (msg.from.id === msg.chat.id) {
        const text = "This command can only be used in an authorized group chat.";
        messenger.send(msg.chat.id, text);
        return;
    }
    const message = await queries.frontText(msg.chat.id);
    messenger.send(msg.chat.id, message);
}
