const { GuildMember } = require("discord.js")
const { embed } = require("./util")
const { join } = require('path')
const fs = require('fs')
/**
 * @param {GotLoader} instance
*/
module.exports = (instance) => {
  const guildData = await instance.getGuildData(member.guild)
  let translations, defaultTranslations = require('./translations.json')

  if (fs.existsSync(join(instance.translationsDir, guildData.lang))) {
    translations = require(join(instance.translationsDir, guildData.lang))
  } else {
    translations = require('./translations.json')
  }
  /**
   * @param {GuildMember} member 
   * @param {string[]} args
   */
  const canRun = async(command, member, args) => {
    if (!member.permissions.has(command.permissions)) {
      return translations.no_permission_to_execute || defaultTranslations.no_permission_to_execute
    }

    if (args && (args.length < command.args.filter(element => element.required == true).length)) {
      return translations.not_enough_args || defaultTranslations.not_enough_args
    }

    return false
  }

  instance.client.on('messageCreate', async (msg) => {
    const { content, author } = msg
    if (!content.toLowerCase().startsWith(instance.prefix)) return

    if (instance.ignoreBots && author.bot) {
      return
    }

    const args = content.substring(instance.prefix.length).split(/[ ]+/g)

    let commandName = args.shift()
    if (!commandName) return

    commandName = commandName.toLowerCase()

    const command = instance.commands.get(commandName)

    const runError = canRun(command, msg.member, args)

    if (runError) {
      msg.reply({ embeds: [embed(runError)] })
      return
    }

    const executeData = {
      message: msg,
      args: args
    }

    try {
      command.execute(executeData)
    } catch (e) {
      msg.reply(translations.execute_error)
      console.error(e)
    }
  })

  instance.client.on('interactionCreate', async (itr) => {
    if (!itr.isCommand()) {
      return
    }
    const commandName = itr.commandName

    const command = instance.commands.get(commandName)

    args = []

    itr.options.data.forEach(({ value }) => {
      args.push(String(value))
    })

    const runError = canRun(command, msg.member)

    if (runError) {
      itr.editReply({ embeds: [embed(runError)] })
      return
    }

    const executeData = {
      interaction: itr,
      args: args
    }


    try {
      await itr.deferReply({ ephemeral: true })
      command.execute(executeData)
    } catch (e) {
      msg.reply(translations.execute_error)
      console.error(e)
    }
  })
}