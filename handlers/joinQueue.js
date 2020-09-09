const queries = require('../db/queries');
const {InlineKeyboard} = require('node-telegram-keyboard-wrapper');
const messenger = require('../messenger');
const  {bot_name} = require('../config');

const alreadyQueuedMsg = "Error: you're already in a queue!\n\n";

module.exports.init = async function (msg) {
    if (msg.from.id !== msg.chat.id) {
        const text = "This command should be used by participants as a direct message to me at @" + bot_name;
        //TODO: add link to bot
        messenger.send(msg.chat.id, text);
        return;
    }
    try {
        const station = await queries.getStation(msg.from.id);
        if (station !== null) {
            messenger.send(msg.from.id, alreadyQueuedMsg + await queries.getWaitInfo(station, msg.from.id));
            return;
        }
        const stationNames = await queries.getStations();
        const ik = new InlineKeyboard();
        for (let i = 0; i < stationNames.length; i++) {
            let data = {c: "join", s: stationNames[i]}
            ik.addRow({text: stationNames[i], callback_data: JSON.stringify(data)})
        }
        ik.addRow({text: 'Cancel', callback_data: JSON.stringify({c: "cancel"})});
        //TODO: send list of stations and wait time
        const text = 'Which station will you queue for?';
        messenger.send(msg.from.id, text, ik.build());
    } catch (e) {
        console.log(e);
    }
}

module.exports.callback = async function (query) {
    try {
        const station = await queries.getStation(query.from.id);
        if (station !== null) {
            messenger.edit(
                query.message.chat.id,
                query.message.message_id,
                null,
                alreadyQueuedMsg + await queries.getWaitInfo(station, query.from.id),
                null);
            return;
        }
        const data = JSON.parse(query.data);
        //TODO: check if queue length > maxlength
        const queueLength = await queries.getQueueLength(data.s);
        const maxQueueLength = await queries.getMaxQueueLength(data.s);
        if (maxQueueLength !== null && queueLength >= maxQueueLength) {
            messenger.edit(
                query.message.chat.id,
                query.message.message_id,
                null,
                "Error: the queue for " + data.s + " is too full. Try again later, or queue for another station.",
                null);
        } else {
            await queries.enqueue(query.from.id, data.s);
            messenger.edit(
                query.message.chat.id,
                query.message.message_id,
                null,
                "Successfully added to queue\n\n" + await queries.getWaitInfo(data.s, query.from.id),
                null);
        }
    } catch (e) {
        console.log(e);
    }
}