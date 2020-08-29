const {bot_name, debug} = require('./config');
const {InlineKeyboard} = require('node-telegram-keyboard-wrapper');
const queries = require('./db/queries');

let bot;
module.exports.initBot = function (b) {
    bot = b;
}

const sendStartMeHelper = async function (startme_chat){
    return await bot.sendMessage(
        startme_chat,
        'Hi there, please start a chat with me first!',//TODO: address user by first_name
        new InlineKeyboard().addRow({
            text: 'Start chat!',
            url: 'https://telegram.me/' + bot_name,
        }).build());
}

const sendStartMe = async function (chat_id, startme_chat) {
    //no await, because if it does not work we do not send any more messages
    // send 'Start chat!' inline message
    try {
        if(debug){
            console.log("sending startme to " +startme_chat + " for " + chat_id);
        }
        const msgData = await queries.getData(startme_chat);
        if (msgData !== null) { // startme chat has been sent before, then delete previous
            await bot.deleteMessage(startme_chat, msgData.message_id);
            const msg = await sendStartMeHelper(startme_chat)
            await queries.updateData(startme_chat, {message_id: msg.message_id});
        } else { // startme chat has not been sent before
            const msg = await sendStartMeHelper(startme_chat)
            //TODO: wrap into a specific method with identifier or new table instead of using chat_id as key in generic cache
            await queries.storeData(startme_chat, {message_id: msg.message_id});
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports.send = async function (chat_id, text, reply_markup = {}, startme_chat) {
    try {
        if (reply_markup == null) {//hack, because default param value doesn't seem to be working
            reply_markup = {};
        }
        return await bot.sendMessage(chat_id, text, reply_markup);
    } catch (e) {
        if(e.response.statusCode === 403){
            //blocked: ETELEGRAM: 403 Forbidden: bot was blocked by the user
            //not started: bot can't initiate conversation with a user
            sendStartMe(chat_id, startme_chat);
        } else {
            console.log(e);
        }
    }
}

module.exports.edit = async function (chat_id, message_id, inline_message_id, text, reply_markup) {
    //will remove inline keyboard if reply_markup is null
    try {
        // await bot.editMessageReplyMarkup(reply_markup,
        //     {chat_id: chat_id, message_id: message_id});
        await bot.editMessageText(text,
            {chat_id: chat_id, message_id: message_id, reply_markup: reply_markup});
    } catch (e) {
        console.log(e);
    }
}