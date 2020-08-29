const queries = require('../db/queries');
const {InlineKeyboard} = require('node-telegram-keyboard-wrapper');
const messenger = require('../messenger');

let bot;

module.exports.initbot = function (b) {
    bot = b;
}

module.exports.init = async function (msg) {
    const stationNames = await queries.getStations();
    const ik = new InlineKeyboard();
    for (let i = 0; i < stationNames.length; i++) {
        let data = {c: "join", s: stationNames[i]}
        ik.addRow({text: stationNames[i], callback_data: JSON.stringify(data)})
    }
    ik.addRow({text: 'Cancel', callback_data: JSON.stringify({t: "cancel"})});
    const text = 'Which station will you queue for?';
    messenger.send(msg.from.id, text, ik.build());
}

module.exports.callback = async function (query) {
    try {
        const data = JSON.parse(query.data);
        await queries.enqueue(query.from.id, data[s]);
        // notifySuccess(query);
    } catch (e) {
        console.log(e);
    }
}