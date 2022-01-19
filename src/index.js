'use strict';

const { Collection } = require("discord.js");
const { readdirSync } = require('fs');
const commandHandler = require("gotloader/src/commandHandler");

class GotLoader {
  /**
   * @param {LoaderOptions} options options for GotLoader
   */
  constructor(options) {
    this.client = options.client
    this.prefix = options.commandPrefix
    this.commands = new Collection()
    this.useSlashes = options.slashes
    this.featuresDir = options.featuresDir
    this.commandsDir = options.commandsDir

    
    if (this.featuresDir) {
      const featureFiles = this.getAllFiles(this.featuresDir)

      for (const file of featureFiles) {
        let feature = require(`${file[0]}`)
        
        feature.execute(this.client)
      }
    }
    
    if(this.commandsDir) {
      const commandFiles = this.getAllFiles(this.commandsDir)

      for (const file of commandFiles) {
        let command = require(`${file[0]}`)
        let fileName = file[0].split("/")
        fileName.shift()
        fileName = fileName.join("/")
        command.path = fileName
        if (!command.name || !(typeof command.execute == 'function')) { console.log(`Error while registering command from ${file[0]}! No 'name' or 'execute()'`); continue }
        this.commands.set(command.name, command)
        if (this.useSlashes) {
          options.client.application.commands.create({
            name: command.name,
            description: command.description,
            type: command.type,
            options: command.args
          })
        }
      }
      
      commandHandler(this)
    }
  }

  getAllFiles(dir) {
    const files = readdirSync(dir, {
      withFileTypes: true,
    })
    let jsFiles = []

    for (const file of files) {
      if (file.isDirectory()) {
        jsFiles = [...jsFiles, ...helpers.getAllFiles(`${dir}/${file.name}`)]
      } else {
        let fileName = file.name.replace(/\\/g, '/').split('/')
        fileName = fileName[fileName.length - 1]
        fileName = fileName.split('.')[0].toLowerCase()

        jsFiles.push([`${dir}/${file.name}`, fileName])
      }
    }

    return jsFiles
  }
}

module.exports = GotLoader

module.exports.GotLoader = GotLoader
module.exports.Command = require('./command')
module.exports.Feature = require('./feature')