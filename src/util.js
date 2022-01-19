const { MessageEmbed } = require("discord.js")
const mongoose = require("mongoose")

module.exports = {
  embed(content, color) {
    let embed = new MessageEmbed()
    embed.setColor(color || "ORANGE")
    embed.setDescription(content)
    return embed
  },

  async connectMongo(url) {
    await mongoose.connect(url)
    return mongoose
  }
}