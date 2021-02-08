const queries = require('../db/queries');
const {InlineKeyboard} = require('node-telegram-keyboard-wrapper');
const messenger = require('../messenger');
const  {bot_name} = require('../config');

const alreadyQueuedMsg = "Error: you're already in a queue!\n\n";

module.exports.init = async function (msg) {
    if (msg.from.id !== msg.chat.id) {
        const text = "This command should be used by participants as a direct message to me at @" + bot_name;
        messenger.send(msg.chat.id, text);
        return;
    }
    try {
        const station = await queries.getStation(msg.from.id);
        if (station !== null) {
            messenger.send(msg.from.id, alreadyQueuedMsg + await queries.getWaitInfo(station, msg.from.id) + "\n\nYou may use /leavequeue to leave the current queue.");
            return;
        }
        const stationNames = await queries.getStationNames();
        const ik = new InlineKeyboard();
        for (let i = 0; i < stationNames.length; i++) {
            let data = {c: "join", s: stationNames[i]}
            ik.addRow({text: stationNames[i], callback_data: JSON.stringify(data)})
        }
        ik.addRow({text: 'Cancel', callback_data: JSON.stringify({c: "cancel"})});
        //TODO: send list of stations and wait time
        const text = 'Which station will you queue for? By queueing for a station, you agree to share your telegram handle with the test administrators, which they will use to contact you about the test';
        messenger.send(msg.from.id, text, ik.build());
    } catch (e) {
        console.log(e);
    }
}

module.exports.callback = async function (query) {
    try {
        const currStation = await queries.getStation(query.from.id);
        if (currStation !== null) {
            messenger.edit(
                query.message.chat.id,
                query.message.message_id,
                null,
                alreadyQueuedMsg + await queries.getWaitInfo(currStation, query.from.id),
                null);
            return;
        }
        const data = JSON.parse(query.data);
        const station = data.s;
        const queueLength = await queries.getQueueLength(station);
        const maxQueueLength = await queries.getMaxQueueLength(station);
        if (maxQueueLength !== null && queueLength >= maxQueueLength) {
            messenger.edit(
                query.message.chat.id,
                query.message.message_id,
                null,
                "Error: the queue for " + station + " is too full. Try again later, or queue for another station.",
                null);
        } else {
            try {
                const initialQueueLength = await queries.getQueueLength(station);
                await queries.enqueue(query.from.id, station);
                messenger.edit(
                    query.message.chat.id,
                    query.message.message_id,
                    null,
                    "Successfully added to queue\n\n" + await queries.getWaitInfo(station, query.from.id),
                    null);
                if(initialQueueLength === 0){
                    if(await queries.getQueueLength(station) > 0){
                        //notify group that a participant has joined the empty queue
                        const groupID = await queries.getGroupId(station);
                        const text = "A participant has joined the empty queue.\n" + await queries.frontText(groupID);
                        messenger.send(groupID, text);
                    }
                }
            } catch (e) {
                messenger.edit(
                    query.message.chat.id,
                    query.message.message_id,
                    null,
                    "An error occurred while joining the queue",
                    null);
            }
        }
    } catch (e) {
        console.log(e);
    }
}