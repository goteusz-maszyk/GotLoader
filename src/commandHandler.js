
/**
 * @param {GotLoader} instance
*/
module.exports = (instance) => {
  instance.client.on('messageCreate', async (msg) => {
    const { content, author } = msg
    if(!content.toLowerCase().startsWith(instance.prefix)) return

    if (instance.ignoreBots && author.bot) {
      return
    }

    const args = content.substring(instance.prefix.length).split(/[ ]+/g)

    let commandName = args.shift()
    if(!commandName) return

    commandName = commandName.toLowerCase()

    const command = instance.commands.get(commandName)

    const executeData = {
      message: msg,
      args: args
    }

    try {
      command.execute(executeData)
    } catch (e) {
      msg.reply(':x: An error occurred while executing this command.')
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

    const executeData = {
      interaction: itr,
      args: args
    }

    try {
      await itr.deferReply({ ephemeral: true })
      command.execute(executeData)
    } catch (e) {
      msg.reply(':x: An error occurred while executing this command.')
      console.error(e)
    }
  })
}