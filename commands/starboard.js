const { MessageEmbed } = require("discord.js");
const logger = require("../utils/logger");

class Starboard {
  constructor() {
    this.name = "starboard";
  }

  async handleReaction(bot, reaction, remove = false) {
    const starChannel = bot.channels.cache.get(process.env.STARBOARD_CHANNEL);
    const message = reaction.message;

    if (message.partial) {
      try {
        await message.fetch();
      } catch (error) {
        return logger.error("Something went wrong when fetching the message: ", error);
      }
    }

    const fetchedMessages = await starChannel.messages.fetch({ limit: 100 });
    const stars = fetchedMessages.find(m => {
      if (m.embeds[0] && m.embeds[0].footer) {
        return m.embeds[0].footer.text.startsWith("⭐") && m.embeds[0].footer.text.endsWith(message.id);
      }
    });

    // Send a new embed if the message not on the starboard
    if (!stars) {
      const starReactions = message.reactions.cache.get("⭐");

      if (!starReactions || (starReactions && starReactions.count < 3)) return;

      const embed = new MessageEmbed()
        .addField("Author", message.author, true)
        .addField("Channel", message.channel, true)
        .addField("Message", message.cleanContent)
        .addField("Go To", `[Message](${message.url})`)
        .setTimestamp(new Date())
        .setFooter(`⭐ 3 | ${message.id}`);

      await starChannel.send({ embed });
    }

    // Edit the embed if the message is already on the starboard
    if (stars) {
      const star = /^⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text);
      const starEmbed = await starChannel.messages.fetch(stars.id);
      const foundStarEmbed = stars.embeds[0];
      const foundStarMessage = foundStarEmbed.fields.find(field => field.name === "Message");
      const embed = new MessageEmbed()
        .addField("Author", message.author, true)
        .addField("Channel", message.channel, true)
        .addField("Message", foundStarMessage.value)
        .addField("Go To", `[Message](${message.url})`)
        .setTimestamp();

      if (remove) {
      // Reduce the amount of stars if the message is already on starboard, remove if no stars left
        if (parseInt(star[1]) - 1 == 0) return starEmbed.delete({ timeout: 1000 });

        embed.setFooter(`⭐ ${parseInt(star[1]) - 1} | ${message.id}`);

        return await starEmbed.edit({ embed });
      }

      embed.setFooter(`⭐ ${parseInt(star[1]) + 1} | ${message.id}`);

      await starEmbed.edit({ embed });
    }
  }
}

module.exports = new Starboard;
