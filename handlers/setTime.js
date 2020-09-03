const queries = require('../db/queries');
const messenger = require('../messenger');

// for admins in group chat to get the length of their queue
module.exports.init = async function (msg) {
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
            const text = "Error, invalid input. This command is used to update the estimated time per participant in minutes." +
                "\nExample format:\n" +
                "/settime 5";
            messenger.send(msg.chat.id, text);
            return;
        }
        queries.setTimeEach(station, num);
        const text = "Successfully updated the estimated time per person.";
        messenger.send(msg.chat.id, text);
    }
}
