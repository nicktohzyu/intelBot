const queries = require('../db/queries');
const messenger = require('../messenger');

// for admins in group chat to get the length of their queue
module.exports.init = async function (msg) {
    if (msg.from.id === msg.chat.id) {
        const text = "This command can only be used in an authorized group chat.";
        messenger.send(msg.chat.id, text);
        return;
    }
    const station = await queries.getAdminStationID(msg.chat.id);
    if (station === null) {
        const text = "Error, unable to find linked station";
        messenger.send(msg.chat.id, text);
    } else {
        let num;
        try{
            num = parseInt(msg.text.split(" ")[1]);
            if(!Number.isInteger(num)) throw "not a valid number";
        } catch (e) {
            const text = "Error, invalid input. This command is used to update the estimated waiting time per participant in minutes." +
                "\nExample format:\n" +
                "/settime 5";
            messenger.send(msg.chat.id, text);
            return;
        }
        queries.setTimeEach(station, num);
        const text = "Successfully updated the estimated waiting time per person.";
        messenger.send(msg.chat.id, text);
    }
}
