Instructions:
1. create group with bot @intel_expo_2021s1_bot. In that group, add @WhoAmIJrBot and send @nicktohzyu the chat ID
2. send @nicktohzyu a short write up on your station (can be changed before expo)
3. send @nicktohzyu the max queuelength and estimated time per participant (can be changed on the fly)
4. 

Flow for participants:
Learn about the stations through /stations or the virtual exhibition space  
Use /stations to see the queue length for each station  
You can only queue for one station at a time.  
Use /joinqueue to join a queue  
You can then use /waittime to see the expected waiting time and the number of people ahead of you in the queue  
You can stop queueing with /leavequeue

Flow for admins:
Get info on the queue length and current settings with /queueinfo  
You can update the max queue length and estimated time per participant (in minutes) with /setmax and /settime  
Get the telegram username of the person at the front with /getfront
Get the telegram username of everyone in the queue with /getall (this stresses the bot so please don't spam it)

User commands:
/viewstations - gets a text message about the stations and their queue length  
/joinqueue - select a station to queue for  
/waittime - check which station you're queueing for and see the waiting time  
/leavequeue - stop queueing for your current station (confirmation dialogue)  

Admin commands:
/queueinfo - (admin) get into on the station's queue  
/setmax - (admin) update the max queue length  
/settime - (admin) update the estimated time per participant in minutes  
/getfront - (admin) get the username of the participant in front  
/removefront - (admin) confirmation dialog to remove participant in front  
/getall - (admin) get the usernames of all participants (slow)  