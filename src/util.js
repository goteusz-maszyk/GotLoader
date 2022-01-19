const { MessageEmbed } = require("discord.js")

module.exports = {
  embed(content, color) {
    let embed = new MessageEmbed()
    embed.setColor(color || "ORANGE")
    embed.setDescription(content)
    return embed
  }
}