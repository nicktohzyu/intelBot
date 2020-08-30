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
    switch (command.toLowerCase()) {
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
        case '/joinqueue':
            joinQueue.init(msg);
            break;
        case '/leavequeue':
            break;
        case '/waittime':
            break;
        //for stationmasters:
        case '/setmax':
            break;
        case '/queuelength':
            break;
        case '/getfront':
            break;
        case '/pingfront':
            break;
        case '/removefront':
            break;
        case '/updatetimeperperson':
            break;
        case '/getall':
            break;
        case '/messageall':
            break;
        default:
            break;
    }
});

bot.on('callback_query', (query) => {

    let data = JSON.parse(query.data);
    if (data.hasOwnProperty("c")) {
        switch (data.c) {
            case 'join':
                joinQueue.callback(query);
                break;
            case 'cancel':
                cancelCallback(query);
                break;
            default:
                break;
        }
    }
})

function cancelCallback(query) {
    messenger.edit(
        query.message.chat.id,
        query.message.message_id,
        null,
        'Your request has been cancelled!',
        null);
}

console.log("bot running");

// let t = queries.getStations();
// let x;