const queries = require('../db/queries');
const {InlineKeyboard} = require('node-telegram-keyboard-wrapper');
const messenger = require('../messenger');

const alreadyQueuedMsg = "Error: you're already in a queue!\n\n";

module.exports.init = async function (msg) {
    try {
        const station = await queries.getStation(msg.from.id);
        if (station !== null) {
            messenger.send(msg.from.id, alreadyQueuedMsg + await queries.getWaitInfo(station, msg.from.id));
            //TODO: send waitTime message
            return;
        }
        const stationNames = await queries.getStations();
        const ik = new InlineKeyboard();
        for (let i = 0; i < stationNames.length; i++) {
            let data = {c: "join", s: stationNames[i]}
            ik.addRow({text: stationNames[i], callback_data: JSON.stringify(data)})
        }
        ik.addRow({text: 'Cancel', callback_data: JSON.stringify({c: "cancel"})});
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
            messenger.send(query.from.id, alreadyQueuedMsg + await queries.getWaitInfo(station, msg.from.id));
            messenger.edit(
                query.message.chat.id,
                query.message.message_id,
                null,
                "Error joining queue",
                null);
            //TODO: send waitTime message
            return;
        }
        const data = JSON.parse(query.data);
        await queries.enqueue(query.from.id, data.s);
        messenger.edit(
            query.message.chat.id,
            query.message.message_id,
            null,
            "Successfully added to queue\n\n" + await queries.getWaitInfo(data.s, query.from.id),
            null);
        //TODO: notify success, call waittime?
    } catch (e) {
        console.log(e);
    }
}