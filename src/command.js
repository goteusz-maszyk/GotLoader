'use strict';

class Command {
  /**
   * @param {CommandOptions} options command options
   */
  constructor(options) {
    this.name = options.name
    this.description = options.description
    this.args = options.args
    this.execute = options.execute
    this.type = options.type
    this.permissions = options.permissions
  }
}

module.exports = Command