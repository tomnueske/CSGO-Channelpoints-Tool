# CSGO Channelpoints Tool
This tool uses telnet to interact with the console in CS:GO to automatically trigger the redeemed Twitch rewards ingame.

## Description
This tool gets the redeemed rewards from the given Twitch channel through TMI and triggers the corresponding events via telnet interaction with the CS:GO console. <br>
Currently there are 2 redemptions available: 
- crosshair redemption: automatically applies the given crosshair code for 1 minute
- troll redemption:
  - jump: makes you jump once
  - schweineaim: makes you aim a little to the right with +right
  - atomsens: gives you your sensitivity x10 for 0.5 seconds and after that your sensitivity : 10 for 0.5 seconds
  - droprifle: selects your rifle, drops it and selects your last selected weapon
  - droppistol: selects your pistol, drops it and selects your last selected weapon
  - silence: turns of sound for 15 seconds

## Prerequisites
NodeJs needs to be installed on your PC (check with node -v in your cmd). <br>
A PC restart is needed after installation for the npm commands to work. <br>
Get the latest version of NodeJs here: https://nodejs.org/en/download/

## Setup on Twitch.tv
- create a custom reward with required user input for crosshair redemption (1minute) <br>
- the created reward should have a cooldown of atleast one minute
- go to https://www.instafluff.tv/TwitchCustomRewardID/?channel=insert_your_channel_name <br>
- redeem the created reward and write down the custom reward id given by the website <br>
- create a custom reward with required user input for troll redemption <br>
- go to https://www.instafluff.tv/TwitchCustomRewardID/?channel=insert_your_channel_name <br>
- redeem the created reward and write down the custom reward id given by the website <br>
- you should disable (not delete) the rewards when you are playing another game or you dont have the tool running
 
## Setup on PC
 - install NodeJs if its not installed 
 - download the repository from https://github.com/tomnueske/CSGO-Channelpoints-Tool/
 - open the *config.json* file and edit the values:
    - "username": your twitch username
    - "crosshair_reward_id": the crosshair reward id you wrote down earlier
    - "troll_reward_id": the troll reward id you wrote down earlier
    -  "crosshair": your crosshair code in CS:GO
    -  "sensitivity": your sensitivity in CS:GO
    -  "volume": your volume in CS:GO
 - open windows command line
 - maneuver to the location of the repository `cd <xxx>/<xxx>/CSGO-Channelpoints-Tool` <br>
 - run `npm install` in the windows command line to install all the needed dependencies <br>
 - add the following launch option to CS:GO:  *-netconport 2121*  
 - go into the "launcher" folder and start *csgo_channelpoints.bat*
 - the game launches with the channelpoints tool running
 - (optionally the tool can also be launched with `npm run build` after CS:GO has been started)
 
