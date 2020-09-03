const queries = require('../db/queries');
const messenger = require('../messenger');

// get the telegram handle of the front person
module.exports.init = async function (msg) {
    const station = await queries.getAdminStation(msg.chat.id);
    if (msg.from.id === msg.chat.id || station === null) {
        const text = "This command can only be used in an authorized group chat.";
        messenger.send(msg.chat.id, text);
        return;
    }
    const userIDs = await queries.getAllUserId(station);
    if(userIDs === null){
        messenger.send(msg.chat.id, "There are no participants in the queue.");
    }
    const promisedUsernames = userIDs.map(async IDstr => (await messenger.getChat(parseInt(IDstr))).username)
    // await Promise.all(promisedUsernames);
    let text = "Username of participants by queue order:";
    for (let i = 0; i < promisedUsernames.length; i++) {
        text += "\n" + (i+1) + ". " + await promisedUsernames[i];
    }
    messenger.send(msg.chat.id, text);
}
