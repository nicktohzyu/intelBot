const db = require('./db');
// const assert = require("assert");
const messenger = require('../messenger');
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

module.exports.getStations = async function () {
    const statement = `
		select name
		from master.stations
		order by name`;
    const args = [];
    const res = await db.query(statement, args);
    const stationNames = res.rows.map(r => r.name); //somehow can't return this directly?
    return stationNames;
}

module.exports.getStation = async function (userId) {
    //gets the station a user is queueing for
    const statement = `
            select station from master.participants
            where "userID" = $1`;
    const args = [userId];
    const res = await db.query(statement, args);
    return (res.rowCount > 0) ? res.rows[0].station : null;
}

const getQueueNumber = async function (userId) {
    //gets the station a user is queueing for
    const statement = `
            select "queueNumber" from master.participants
            where "userID" = $1`;
    const args = [userId];
    const res = await db.query(statement, args);
    return (res.rowCount > 0) ? res.rows[0].queueNumber : null;
}

module.exports.getQueueLength = async function (stationName) {
    //gets the station a user is queueing for
    const statement = `SELECT count(*) AS length FROM stations.` + stationName + `;`;
    const args = [];
    const res = await db.query(statement, args);
    return (res.rowCount > 0) ? parseInt(res.rows[0].length) : null;
}

const getQueueLengthAhead = async function (stationName, userID) {
    //gets the station a user is queueing for
    const queueNumber = await getQueueNumber(userID);
    if(queueNumber === null){
        return null;
    }
    const statement =
        `SELECT count(*) AS length FROM stations.` + stationName + `
         WHERE "queueNumber" < ($1);`;
    const args = [queueNumber];
    const res = await db.query(statement, args);
    return (res.rowCount > 0) ? res.rows[0].length : null;
}

const getTimeEach = async function (stationName) {
    const statement = `
            select "timeEach" from master.stations
            where name = $1;`;
    const args = [stationName];
    const res = await db.query(statement, args);
    return (res.rowCount > 0) ? res.rows[0].timeEach : null;
}

module.exports.getMaxQueueLength = async function (stationName) {
    const statement = `
            select "maxQueueLength" from master.stations
            where name = $1;`;
    const args = [stationName];
    const res = await db.query(statement, args);
    return (res.rowCount > 0) ? res.rows[0].maxQueueLength : null;
}

module.exports.enqueue = async function (userId, stationName) {
    let res;
    try {
        const statement = `
            insert into
                stations.` + stationName + `	("userID")
                values	($1)
                RETURNING "queueNumber";`;
        const args = [userId];
        res = await db.query(statement, args);
    } catch (e) {
        console.log("error inserting into station")
        console.log(e);
    }
    try {
        const statement = `
            insert into
                master.participants	("userID", "station", "queueNumber")
                values	($1, $2, $3);`;
        const args = [userId, stationName, res.rows[0].queueNumber];
        await db.query(statement, args);
    } catch (e) {
        console.log("error inserting into participants")
        console.log(e);
    }
}

module.exports.leaveQueue = async function (userId) {
    const stationName = await module.exports.getStation(userId);
    if(stationName === null){
        return false;
    }
    try{
        const statement = `
            DELETE FROM stations.` + stationName + `
            where "userID" = $1`;
        const args = [userId];
        await db.query(statement, args);
    } catch (e) {
        console.log("error deleting from station")
        console.log(e);
        return false;
    }
    try{
        const statement = `
            DELETE FROM master.participants
            where "userID" = $1`;
        const args = [userId];
        await db.query(statement, args);
        return true;
    } catch (e) {
        console.log("error deleting from master.participants")
        console.log(e);
        return false;
    }
}

module.exports.getWaitInfo = async function (station, userID) {
    //get wait info for user in a queue
    const timePer = await getTimeEach(station);
    const queueLengthAhead = await getQueueLengthAhead(station, userID);
    const text = "You're in the queue for: " + station +
        "\n\nThere are " + (queueLengthAhead) + " participants ahead of you." +
        "\n\nThe expected waiting time is " + (queueLengthAhead * timePer) + " minutes.";
    return text;
}

module.exports.getAdminStation = async function (groupId) {
    //gets the station an admin group controls
    const statement = `
            select name from master.stations
            where "groupID" = $1`;
    const args = [groupId];
    const res = await db.query(statement, args);
    return (res.rowCount > 0) ? res.rows[0].name : null;
}

module.exports.getFrontUserId = async function (stationName) {
    //returns userID of the front participant
    const statement =
        `SELECT "userID" FROM stations.` + stationName + `
         ORDER BY "queueNumber" 
         LIMIT 1;`;
    const args = [];
    const res = await db.query(statement, args);
    return (res.rowCount > 0) ? res.rows[0].userID : null;
}

module.exports.frontText = async function (groupID) {
    const station = await module.exports.getAdminStation(groupID);
    if (station === null) {
        return "Error, unable to find station";
    } else {
        const participantId = await module.exports.getFrontUserId(station);
        if (participantId === null) {
            return "There are no participants in the queue.";
        } else {
            const userObj = await messenger.getChat(participantId);
            const username = userObj.username;
            const text = "Username of participant at front of queue: \n@" + username;
            return text;
        }
    }
}

// module.exports.getGroupFront = async function (groupID) {
//     const station = await module.exports.getAdminStation(groupID);
//     if (station === null) {
//         return null;
//     } else {
//         return await module.exports.getFrontUserId(station);
//     }
// }