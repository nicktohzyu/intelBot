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
        const currStationID = await queries.getUserStationID(msg.from.id);
        if (currStationID !== null) {
            messenger.send(msg.from.id, alreadyQueuedMsg + await queries.getWaitInfo(currStationID, msg.from.id) + "\n\nYou may use /leavequeue to leave the current queue.");
            return;
        }
        if(currStationID === "0") {
            console.Warn("Warning: in joinQueue, participant with ID " + msg.from.id + " has invalid stationID");
        }

        const stationIDs = await queries.getStationIDs();
        //TODO: convert to method that returns all stations
        const stationNamePromises = stationIDs.map(st => queries.getStationName(st));

        const ik = new InlineKeyboard();
        for (let i = 0; i < stationIDs.length; i++) {
            let data = {c: "join", s: stationIDs[i]}
            ik.addRow({text: await stationNamePromises[i], callback_data: JSON.stringify(data)})
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
        const currStation = await queries.getUserStationID(query.from.id);
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
        const stationID = data.s;
        const stationName = queries.getStationName(stationID)
        const queueLength = await queries.getQueueLength(stationID);
        const maxQueueLength = await queries.getMaxQueueLength(stationID);
        if (maxQueueLength !== null && queueLength >= maxQueueLength) {
            messenger.edit(
                query.message.chat.id,
                query.message.message_id,
                null,
                "Error: the queue for " + stationName + " is too full. Try again later, or queue for another station.",
                null);
        } else {
            try {
                const initialQueueLength = await queries.getQueueLength(stationID);
                await queries.enqueue(query.from.id, stationID);
                messenger.edit(
                    query.message.chat.id,
                    query.message.message_id,
                    null,
                    "Successfully added to queue\n\n" + await queries.getWaitInfo(stationID, query.from.id),
                    null);
                if(initialQueueLength === 0){
                    if(await queries.getQueueLength(stationID) > 0){
                        //notify group that a participant has joined the empty queue
                        const groupID = await queries.getGroupId(stationID);
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