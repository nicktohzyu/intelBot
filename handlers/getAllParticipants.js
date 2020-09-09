const queries = require('../db/queries');
const messenger = require('../messenger');

// get the telegram handle of the front person
module.exports.init = async function (msg) {
    if (msg.from.id === msg.chat.id) {
        const text = "This command can only be used in an authorized group chat.";
        messenger.send(msg.chat.id, text);
        return;
    }
    const station = await queries.getAdminStation(msg.chat.id);
    if (station === null) {
        const text = "This command can only be used in an authorized group chat.";
        messenger.send(msg.chat.id, text);
        return;
    }
    const userIDs = await queries.getAllUserId(station);
    if(userIDs === null){
        messenger.send(msg.chat.id, "There are no participants in the queue.");
        return;
    }
    const promisedUserHandles = userIDs.map(messenger.getUsername)
    // await Promise.all(promisedUsernames);
    let text = "Username of participants by queue order:";
    for (let i = 0; i < promisedUserHandles.length; i++) {
        text += "\n" + (i+1) + '. ' + await promisedUserHandles[i];
    }
    messenger.send(msg.chat.id, text);
}
