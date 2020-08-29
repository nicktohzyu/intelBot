const db = require('./db');
// const messenger = require('../messenger');
// const sprintf = require("sprintf-js").sprintf;
let bot;

module.exports.initbot = function (b) {
    bot = b;
}

module.exports.storeData = async function (key, data) {
    //because callback has 64 byte limit
    //keyed by messageID
    const statement = `
		insert into
			miscellaneous.cache	(key, data, time)
			values	($1, $2, now());`;
    const strData = JSON.stringify(data);
    const args = [key, strData];
    await db.query(statement, args);
}

module.exports.updateData = async function (key, data) {
    const strData = JSON.stringify(data);
    const statement = `
		update miscellaneous.cache
		set data = $2, time = now()
		where key = $1;`;
    const args = [key, strData];
    await db.query(statement, args);
}

module.exports.getData = async function (key) {
    const statement = `
		select data
		from miscellaneous.cache
		where key = $1;`;
    const args = [key];
    const res = await db.query(statement, args);
    return (res.rowCount > 0) ? JSON.parse(res.rows[0].data) : null;
}

module.exports.storeListenerId = async function (listener_id, chat_id) {
    const statement = `
            update miscellaneous.listeners
            set listener_ids = array_append(listener_ids, $1)
            where chat_id = $2`;
    const args = [listener_id, chat_id];
    await db.query(statement, args);
}

module.exports.destroyListenerIds = async function (chat_id) {
    const statement = `
            select listener_ids from miscellaneous.listeners
            where chat_id = $1`;
    const args = [chat_id];
    let res = await db.query(statement, args);
    const listenerIds = res.rows[0].listener_ids;
    listenerIds.forEach(id => bot.removeReplyListener(id))
}

module.exports.clearOldEntries = async function (schema_name, table_name) {
    const statement = `
            delete from ${schema_name}.${table_name}
            where now() - time > interval '48 hours'`;
    const args = [];
    await db.query(statement, args);
}