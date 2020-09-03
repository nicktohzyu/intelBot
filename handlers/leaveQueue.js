const queries = require('../db/queries');
const {InlineKeyboard} = require('node-telegram-keyboard-wrapper');
const messenger = require('../messenger');

const notQueuedMsg = "Error: you're not currently in a queue!";

module.exports.init = async function (msg) {
    if (msg.from.id !== msg.chat.id) {
        const text = "This command should be used by participants as a direct message to the bot.";
        messenger.send(msg.chat.id, text);
        return;
    }
    try {
        const station = await queries.getStation(msg.from.id);
        if (station === null) {
            messenger.send(msg.from.id, notQueuedMsg);
            return;
        }
        const text = await queries.getWaitInfo(station, msg.from.id) + "\n\n Are you sure you want to stop queueing?"
        const ik = new InlineKeyboard();

        ik.addRow({text: 'Yes, leave the queue', callback_data: JSON.stringify({c: "leavequeue"})});
        ik.addRow({text: 'Cancel', callback_data: JSON.stringify({c: "cancel"})});
        messenger.send(msg.from.id, text, ik.build());
    } catch (e) {
        console.log(e);
    }
}

module.exports.callback = async function (query) {
    try {
        const station = await queries.getStation(query.from.id);
        if (station !== null) {
            const success = await queries.leaveQueue(query.from.id);
            if(success){
                messenger.edit(
                    query.message.chat.id,
                    query.message.message_id,
                    null,
                    "Successfully left queue",
                    null);
            } else {
                console.log("error: queries.leaveQueue returned false");
            }
        }
    } catch (e) {
        console.log(e);
    }
}