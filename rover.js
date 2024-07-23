const Command = require("./command.js");
const Message = require("./message.js");

class Rover {
  // Write code here!
  mode = "";
  constructor(position, mode = "NORMAL", generatorWatts = 110) {
    this.position = position;
    this.mode = mode;
    this.generatorWatts = generatorWatts;
  }

  receiveMessage(message) {
    let results = [];
    let response = {};
    if (message.commands) {
      for (let index = 0; index < message.commands.length; index++) {
        if (message.commands[index].commandType === "STATUS_CHECK") {
          results.push({
            completed: true,
            roverStatus: {
              mode: this.mode,
              generatorWatts: this.generatorWatts,
              position: this.position,
            },
          });
        } else if (message.commands[index].commandType === "MODE_CHANGE") {
          results.push({
            completed: true,
          });
          this.mode = message.commands[index].value;
        } else if (message.commands[index].commandType === "MOVE") {
          if (this.mode === "NORMAL") {
            results.push({
              completed: true,
            });
            this.position = message.commands[index].value;
          } else if (this.mode === "LOW_POWER") {
            results.push({ completed: false });
          }
        }
      }

      return (response = { message: message.name, results: results });
    }

    return message.name;
  }
}

module.exports = Rover;
