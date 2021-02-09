const queries = require('../db/queries');
const messenger = require('../messenger');
const {InlineKeyboard} = require('node-telegram-keyboard-wrapper');

// get the telegram handle of the front person
module.exports.init = async function (msg) {
    if (msg.from.id === msg.chat.id) {
        const text = "This command can only be used in an authorized group chat.";
        messenger.send(msg.chat.id, text);
        return;
    }
    try {
        const station = await queries.getAdminStationID(msg.chat.id);
        if (station === null) {
            const errorText = "Error, unable to find station";
            messenger.send(msg.chat.id, errorText);
            return;
        }
        const message = await queries.frontText(msg.chat.id);
        if (message === "There are no participants in the queue." ||
            message === "Error, unable to find station"){
            messenger.send(msg.chat.id, message);
            return;
        }
        const participantId = await queries.getFrontUserId(station);
        const text = message + "\n\n Are you sure you want to remove this participant?"
        const ik = new InlineKeyboard();
        ik.addRow({text: 'Yes, remove', callback_data: JSON.stringify({c: "remove", id: participantId})});
        ik.addRow({text: 'Cancel', callback_data: JSON.stringify({c: "cancel"})});
        messenger.send(msg.chat.id, text, ik.build());
    } catch (e) {
        console.log(e);
    }
}

module.exports.callback = async function (query) {
    try {
        const data = JSON.parse(query.data);
        //check that the group is authorized to control a station
        const station = await queries.getAdminStationID(query.message.chat.id);
        if (station === null) {
            messenger.edit(
                query.message.chat.id,
                query.message.message_id,
                null,
                "Error, unable to find station",
                null);
            return;
        }
        //check that the participant in front is still the same
        const participantId = await queries.getFrontUserId(station);
        if (participantId !== data.id) {
            messenger.edit(
                query.message.chat.id,
                query.message.message_id,
                null,
                "Error, the person at the front of the queue has changed",
                null);
            return;
        }
        const success = await queries.leaveQueue(participantId);
        if(success){
            const username = await messenger.getUsername(participantId);
            messenger.edit(
                query.message.chat.id,
                query.message.message_id,
                null,
                "Successfully removed " + username,
                null);

            //optional: sends info about the next person
            const message = await queries.frontText(query.message.chat.id);
            messenger.send(query.message.chat.id, message);
        } else {
            messenger.edit(
                query.message.chat.id,
                query.message.message_id,
                null,
                "Error occured in removing participant",
                null);
        }

    } catch (e) {
        console.log(e);
    }
}
