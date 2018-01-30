module.exports = {
  name: "missions",
  aliases: ["gm", "guildmissions", "mission"],
  description: "Get useful info about Guild Missions",
  execute(message, args) {
    try {
      if (!args[0]) {
        message.channel.send(`Guild Missions can be lots of things: bounties, treks, races, puzzles or challenges! If you don't know what's what, I can help you with \`\`>missions bounty\`\` or \`\`>missions trek\`\` commands. Just type them in a channel and I'll give you some useful information!
        \nOther than that, listen to leaders/officers and you'll do just fine. Good luck!`);
      } else if (args[0] === "start" || args[0] === "starting") {
        message.channel.send(`@everyone grab your omnomberry bars and apple ciders, it's time for Guild Missions! Come to our Guild Hall, join the squad and perhaps the voice channel.
        \nLet's go get those <:commendation:402419240302411776>'s!`);
      } else if (args[0] === "bounty" || args[0] === "Bounty") {
        message.channel.send(`\nGuild Bounties are open world guild missions where members work together to kill targets across Tyria within 10-20 minutes. These NPCs are randomly chosen from a short list.
        \nPlease check https://wiki.guildwars2.com/wiki/Guild_Bounty#Possible_targets to see how/where you can find the chosen target and bring justice to them.
        \nIf you have guild mates with you, wait for them to come along before you attack the target. Good luck!`);
      } else if (args[0] === "trek" || args[0] === "Trek") {
        message.channel.send(`\nGuild Treks are open world guild missions where members work together to find several locations across Tyria within a set time limit. These locations are randomly chosen from a list of 180 possible locations.
        \nPlease check https://wiki.guildwars2.com/wiki/Guild_Trek#Possible_locations to see how/where you can find the chosen trek.
        \nIf you're not doing a trek alone, wait for everyone else to come before you interact with it. Good luck!`);
      }
    } catch (error) {
      console.log(error);
    }
  },
};