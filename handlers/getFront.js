const queries = require('../db/queries');
const messenger = require('../messenger');

// get the telegram handle of the front person
module.exports.init = async function (msg) {
    if (msg.from.id === msg.chat.id) {
        const text = "This command can only be used in an authorized group chat.";
        messenger.send(msg.chat.id, text);
        return;
    }
    const message = await module.exports.frontText(msg.chat.id);
    if (message === null) {
        const errorText = "Error, unable to find station";
        messenger.send(msg.chat.id, errorText);
        return;
    } else {
        messenger.send(msg.chat.id, message);
    }
}

module.exports.frontText = async function (groupID) {
    const station = await queries.getAdminStation(groupID);
    if (station === null) {
        return null;
    } else {
        const participantId = await queries.getFrontUserId(station);
        if (participantId === null) {
            return "There are no participants in the queue.";
        } else {
            const userObj = await messenger.getChat(participantId);
            const username = userObj.username;
            const text = "Username of participant at front of queue: \n@" + username;
            return text;
        }
    }
}
