I suggest only allowing users to be in one queue at a time
# commands:

### /help 
gives an inline keyboard for participants vs admins, then text instructions
#for participants:

## for participants:
anyone can use these commands, but only via direct message to the bot (those queueing as a group should have one person queue for them)

### /stations
get a text-only message with the stations and their descriptions, as well as the expected waiting times for each station

### /joinQueue
get an inline keyboard to select the station they want to join

success message says the number of persons ahead and expected waiting time

### /leavequeue
confirmation dialogue

### /waitTime
get number of participants ahead of them in the queue, and expected waiting time

## for station masters:
these commands can only be used in an authorized group chat (corresponding to a station)

### /queueLength
get number of persons ahead in the queue

### /getFront
get telegram ID of person at the front (for stationmasters to message them directly)

### /pingFront
send ping text to person at the front

### /removeFront
remove person at front of queue
update others in queue?

### /updateTimePerPerson
allows group admins to update the expected number of minutes each participant takes


# database:
## master table
each row represents a station

columns: station name (pk), groupID (with the stationmasters), time per person, tablename (for queue), queue length, current queue number, ping text (to be sent to front participant)

## table of participants
stores the queue(s) they are in

columns: telegramID (pk), station name(s)

## table representing a station's queue
each row represents a person

columns: queue number (pk, unique), telegramID, hasleft (boolean, default false)