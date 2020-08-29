const TelegramBot = require('node-telegram-bot-api');
const {about, bot_name, debug, help, start, token} = require('./config');
const messenger = require('./messenger');
const queries = require('./db/queries');
const stations = require('./handlers/stations');
const joinQueue = require('./handlers/joinQueue');

let bot;
if (process.env.NODE_ENV === 'production') {
    bot = new TelegramBot(token, {webHook: {port: process.env.PORT}});
    bot.setWebHook(process.env.HEROKU_URL + bot.token);
} else {
    bot = new TelegramBot(token, {polling: true});
}
// const stationNames = queries.getStations();
// const stationsText = "The stations available are: \n" + stationNames.join("\n") //TODO: deal with async

messenger.initBot(bot);

bot.on('message', (msg) => {
    if (debug) {
        let message = "received message with text \"" + msg.text + "\" from \"" + msg.from.username + "\""
        if (msg.chat.hasOwnProperty("title")) {
            message += " in chat \"" + msg.chat.title + "\"";
        } else {
            message += " via direct message"
        }
        console.log(message);
    }
    let command;
    if (msg.text == null) {
        console.log("error: message text from " + msg.from.id + "is null");
        return;
    }
    if (msg.text.includes('@')) {
        let tokens = msg.text.split('@');
        if (tokens[1] !== bot_name) {
            return;
        }
        command = tokens[0];
    } else {
        command = msg.text;
    }
    switch (command) {
        case '/about':
            messenger.send(msg.chat.id, about);
            break;
        case '/help':
            messenger.send(msg.chat.id, help);
            break;
        case '/start':
            messenger.send(msg.chat.id, start);
            break;
        //for participants:
        case '/stations':
            stations.init(msg);
            break;
        case '/joinQueue':
            joinQueue.init(msg);
            break;
        case '/leaveQueue':
            break;
        case '/waitTime':
            break;
        //for stationmasters:
        case '/setMax':
            break;
        case '/queueLength':
            break;
        case '/getFront':
            break;
        case '/pingFront':
            break;
        case '/removeFront':
            break;
        case '/updateTimePerPerson':
            break;
        case '/getAll':
            break;
        case '/messageAll':
            break;
        default:
            break;
    }
});

// bot.on('callback_query', (query) => {
//
//     let data = JSON.parse(query.data);
//     if (data.hasOwnProperty("cmd")) {
//         query.chat = query.message.chat;
//         switch (data.cmd) {
//             case 'cancel':
//                 cancelCallback(query);
//                 break;
//             default:
//                 break;
//         }
//     }
// })
//
// function cancelCallback(query) {
//     messenger.edit(
//         query.message.chat.id,
//         query.message.message_id,
//         null,
//         'Your request has been cancelled!',
//         null);
// }

console.log("bot running");

// let t = queries.getStations();
// let x;