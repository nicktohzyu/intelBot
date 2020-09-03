const queries = require('../db/queries');
const messenger = require('../messenger');

// for admins in group chat to get the length of their queue
module.exports.init = async function (msg) {
    if (msg.from.id === msg.chat.id) {
        const text = "This command can only be used in an authorized group chat.";
        messenger.send(msg.chat.id, text);
        return;
    }
    const station = await queries.getAdminStation(msg.chat.id);
    if (station === null) {
        const text = "Error, unable to find linked station";
        messenger.send(msg.chat.id, text);
    } else {
        let num;
        try{
            num = parseInt(msg.text.split(" ")[1]);
            if(!Number.isInteger(num)) throw "not a valid number";
        } catch (e) {
            const text = "Error, invalid input. This command is used to update the max queue length." +
                "If it has been reached, participants will not be able to join the queue." +
                "\nExample format:\n" +
                "/setmax 10";
            messenger.send(msg.chat.id, text);
            return;
        }
        queries.setMax(station, num);
        const text = "Successfully updated the max queue length.";
        messenger.send(msg.chat.id, text);
    }
}
