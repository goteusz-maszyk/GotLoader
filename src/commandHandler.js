const { GuildMember } = require("discord.js")
const { embed } = require("./util")
/**
 * @param {GotLoader} instance
*/
module.exports = (instance) => {
  /**
   * @param {GuildMember} member 
   * @param {string[]} args
   */
  const canRun = async (command, member, args) => {
    if (command.permissions && !member.permissions.has(command.permissions)) {
      return await instance.translate(member.guild, "no_permission_to_execute")
    }

    if (command.args && args && (args.length < command.args.filter(element => element.required == true).length)) {
      return await instance.translate(member.guild, "not_enough_args") + (command.usage ? "\n" + (await instance.translate(member.guild, "usage_is")).replace('%usage%', command.usage) : "")
    }

    return false
  }

  instance.client.on('messageCreate', async (msg) => {
    const { content, author, guild } = msg
    if (!content.toLowerCase().startsWith(instance.prefix)) return

    if (instance.ignoreBots && author.bot) {
      return
    }

    const args = content.substring(instance.prefix.length).split(/[ ]+/g)

    let commandName = args.shift()
    if (!commandName) return

    commandName = commandName.toLowerCase()

    const command = instance.commands.get(commandName)
    if (!command) return

    const runError = await canRun(command, msg.member, args)

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
      msg.reply(await instance.translate(guild, "execute_error"))
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

    const runError = await canRun(command, msg.member)

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
      msg.reply(await instance.translate(guild, "execute_error"))
      console.error(e)
    }
  })
}