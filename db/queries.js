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

module.exports.getStationNames = async function () {
    const statement = `
		select name
		from master.stations
		order by name`;
    const args = [];
    const res = await db.query(statement, args);
    const stationNames = res.rows.map(r => r.name.trim()); //somehow can't return this directly?
    return stationNames;
}

/**
 * returns array of biginteger representing station IDs
 * @returns {Promise<[bigint]>}
 */
module.exports.getStationIDs = async function () {
    const statement = `
		select "stationID"
		from master.stations
		order by "stationID"`;
    const args = [];
    const res = await db.query(statement, args);
    const stationIDs = res.rows.map(r => r.stationID); //somehow can't return this directly?
    return stationIDs;
}

// module.exports.getStationsDetails = async function () {
//     const statement = `
// 		select name, description
// 		from master.stations
// 		order by name`;
//     const args = [];
//     const res = await db.query(statement, args);
//     const details = res.rows.map(r => [r.name.trim(), r.description.trim()]); //somehow can't return this directly?
//     return details;
// }

module.exports.getUserStationID = async function (userId) {
    //gets the station a user is queueing for
    const statement = `
            select "stationID" from master.participants
            where "userID" = $1`;
    const args = [userId];
    const res = await db.query(statement, args);
    return (res.rowCount > 0) ? res.rows[0].stationID : null;
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

module.exports.getStationName = async function (stationID) {
    //gets the station a user is queueing for
    const statement = `
            select name from master.stations
            where "stationID" = $1`;
    const args = [stationID];
    const res = await db.query(statement, args);
    return (res.rowCount > 0) ? res.rows[0].name.trim() : null;
}

module.exports.getQueueLength = async function (stationID) {
    //gets the station a user is queueing for
    const statement = `SELECT count(*) AS length FROM stations."` + stationID + `";`;
    const args = [];
    const res = await db.query(statement, args);
    return (res.rowCount > 0) ? parseInt(res.rows[0].length) : null;
}

const getQueueLengthAhead = async function (stationID, userID) {
    //gets the station a user is queueing for
    const queueNumber = await getQueueNumber(userID);
    if(queueNumber === null){
        return null;
    }
    const statement =
        `SELECT count(*) AS length FROM stations."` + stationID + `"
         WHERE "queueNumber" < ($1);`;
    const args = [queueNumber];
    const res = await db.query(statement, args);
    return (res.rowCount > 0) ? res.rows[0].length : null;
}

module.exports.getTimeEach = async function (stationID) {
    const statement = `
            select "timeEach" from master.stations
            where "stationID" = $1;`;
    const args = [stationID];
    const res = await db.query(statement, args);
    return (res.rowCount > 0) ? res.rows[0].timeEach : null;
}

module.exports.getMaxQueueLength = async function (stationID) {
    const statement = `
            select "maxQueueLength" from master.stations
            where "stationID" = $1;`;
    const args = [stationID];
    const res = await db.query(statement, args);
    return (res.rowCount > 0) ? res.rows[0].maxQueueLength : null;
}

module.exports.getFrontMessage = async function (stationID) {
    const statement = `
            select "frontMessage" from master.stations
            where "stationID" = $1;`;
    const args = [stationID];
    const res = await db.query(statement, args);
    return (res.rowCount > 0) ? res.rows[0].frontMessage : null;
}

module.exports.enqueue = async function (userId, stationID) {
    let res;
    try {
        const statement = `
            insert into
                stations."` + stationID + `"	("userID")
                values	($1)
                RETURNING "queueNumber";`;
        const args = [userId];
        res = await db.query(statement, args);
    } catch (e) {
        console.log("error inserting into station")
        console.log(e);
        throw "error inserting into station";
    }
    try {
        const statement = `
            insert into
                master.participants	("userID", "stationID", "queueNumber")
                values	($1, $2, $3);`;
        const args = [userId, stationID, res.rows[0].queueNumber];
        await db.query(statement, args);
    } catch (e) {
        console.log("error inserting into participants")
        console.log(e);
        throw "error inserting into participants";
    }
}

module.exports.leaveQueue = async function (userId) {
    const stationName = await module.exports.getUserStationID(userId);
    if(stationName === null){
        return false;
    }
    try{
        const statement = `
            DELETE FROM stations."` + stationName + `"
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

module.exports.getWaitInfo = async function (stationID, userID) {
    //get wait info for user in a queue
    const timePer = await module.exports.getTimeEach(stationID);
    const queueLengthAhead = await getQueueLengthAhead(stationID, userID);
    const stationName = await module.exports.getStationName(stationID);
    const text = "You're in the queue for: " + stationName +
        "\n\nThere are " + (queueLengthAhead) + " participants ahead of you." +
        "\n\nThe expected waiting time is " + (queueLengthAhead * timePer) + " minutes.";
    return text;
}

module.exports.getAdminStationID = async function (groupId) {
    //gets the station an admin group controls
    const statement = `
            select "stationID" from master.stations
            where "groupID" = $1`;
    const args = [groupId];
    const res = await db.query(statement, args);
    if(res.rows.length > 1){
        console.warn("Warning: telegram group ID " + groupId + " corresponds to more than one station");
    }
    return (res.rowCount > 0) ? res.rows[0].stationID : null;
}

module.exports.getGroupId = async function (stationID) {
    //gets the station an admin group controls
    const statement = `
            select "groupID" from master.stations
            where "stationID" = $1`;
    const args = [stationID];
    const res = await db.query(statement, args);
    return (res.rowCount > 0) ? res.rows[0].groupID : null;
}

module.exports.getFrontUserId = async function (stationName) {
    //returns userID of the front participant
    const statement =
        `SELECT "userID" FROM stations."` + stationName + `"
         ORDER BY "queueNumber" 
         LIMIT 1;`;
    const args = [];
    const res = await db.query(statement, args);
    return (res.rowCount > 0) ? res.rows[0].userID : null;
}

module.exports.getAllUserId = async function (stationName) {
    //returns userID of the front participant
    const statement =
        `SELECT "userID" FROM stations."` + stationName + `"
         ORDER BY "queueNumber";`;
    const args = [];
    const res = await db.query(statement, args);
    if(res.rowCount === 0){
        return null;
    }
    const arr = res.rows.map(r => r.userID);
    return arr;
}

module.exports.frontText = async function (groupID) {
    const station = await module.exports.getAdminStationID(groupID);
    //TODO: remove arrowhead style code using throw
    if (station === null) {
        return "Error, unable to find station";
    } else {
        const participantId = await module.exports.getFrontUserId(station);
        if (participantId === null) {
            return "There are no participants in the queue.";
        } else {
            const username = await messenger.getUsername(participantId);
            const text = "Username of participant at front of queue: \n" + username;
            return text;
        }
    }
}

//TODO: update calls to use station ID
module.exports.setMax = async function (stationID, num) {
    const statement = `
            update master.stations
            set "maxQueueLength" = $2
            where "stationID" = $1`;
    const args = [stationID, num];
    await db.query(statement, args);
}

module.exports.setTimeEach = async function (stationID, num) {
    const statement = `
            update master.stations
            set "timeEach" = $2
            where "stationID" = $1`;
    const args = [stationID, num];
    await db.query(statement, args);
}

// module.exports.getGroupFront = async function (groupID) {
//     const station = await module.exports.getAdminStation(groupID);
//     if (station === null) {
//         return null;
//     } else {
//         return await module.exports.getFrontUserId(station);
//     }
// }