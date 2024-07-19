const Command = require("./command.js");

class Message {
  // Write code here!
  constructor(name, commands) {
    this.name = name;
    if (!name) {
      throw Error("Massage required.");
    }
    this.commands = commands;
  }
}

module.exports = Message;
