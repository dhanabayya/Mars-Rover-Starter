const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function () {
  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", function () {
    let output = new Rover(98382);
    expect(output).toEqual({
      generatorWatts: 110,
      mode: "NORMAL",
      position: 98382,
    });
  });
  it("response returned by receiveMessage contains the name of the message", function () {
    let msg = new Message("Test message with two commands");
    let output = new Rover().receiveMessage(msg);
    expect(output).toEqual(msg.name);
  });
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    let msg = new Message("Test message with two commands", [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ]);
    let output = new Rover().receiveMessage(msg);
    expect(Object.keys(output).length).toEqual(2);
  });
  it("responds correctly to the status check command", function () {
    let msg = new Message("Test message with two commands", [
      new Command("STATUS_CHECK"),
    ]);
    let output = new Rover(98382).receiveMessage(msg);
    expect(output.results[0]).toEqual({
      completed: true,
      roverStatus: { mode: "NORMAL", generatorWatts: 110, position: 98382 },
    });
  });

  it("responds correctly to the mode change command", function () {
    let msg = new Message("Test message with two commands", [
      new Command("MODE_CHANGE", "LOW_POWER"),
    ]);
    let output = new Rover(98382).receiveMessage(msg);
    expect(output.results[0]).toEqual({
      completed: true,
    });
  });
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    let msg = new Message("Test message with two commands", [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("MOVE", "4321"),
    ]);
    let output = new Rover().receiveMessage(msg);
    expect(output.results[1]).toEqual({
      completed: false,
    });
  });
  it("responds with the position for the move command", function () {
    let msg = new Message("Test message with two commands", [
      new Command("MOVE", "4321"),
    ]);
    let output = new Rover().receiveMessage(msg);
    expect(output.results[0]).toEqual({
      completed: true,
    });
  });
});
