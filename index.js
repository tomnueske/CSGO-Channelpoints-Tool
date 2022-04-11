const Telnet = require("telnet-client");
const config = require("./config.json");
const tmi = require("tmi.js");

async function listen(con) {
  const client = new tmi.Client({
    options: { debug: false, messagesLogLevel: "info" },
    connection: {
      reconnect: true,
      secure: true,
    },
    channels: [config.username],
  });
  client.connect().catch(console.error);
  client.on("message", (channel, tags, message, self) => {
    if (self) return;
    //console.log(JSON.stringify(tags, null, 2));
    if (tags["custom-reward-id"] === config.troll_reward_id) {
      if (message.toLowerCase() === "jump") {
        sendMessage(con, "+jump");
        setTimeout(() => sendMessage(con, "-jump"), 100);
        console.log(tags["username"] + " just made you jump");
      }

      if (message.toLowerCase() === "silence") {
        sendMessage(con, "volume " + 0.0);
        setTimeout(() => sendMessage(con, "volume " + config.volume), 15000);
        console.log(tags["username"] + " just made your game silent");
      }
      if (message.toLowerCase() === "atomsens") {
        sendMessage(con, "sensitivity " + config.sensitivity * 10);
        setTimeout(
          () => sendMessage(con, "sensitivity " + config.sensitivity / 10),
          500
        );
        setTimeout(
          () => sendMessage(con, "sensitivity " + config.sensitivity),
          500
        );
        console.log(tags["username"] + " just gave you atomsens");
      }
      if (message.toLowerCase() === "schweineaim") {
        sendMessage(con, "+right");
        setTimeout(() => sendMessage(con, "-right"), 100);
        console.log(tags["username"] + " just made you have schweineaim");
      }

      if (message.toLowerCase() === "droprifle") {
        sendMessage(con, "slot1");
        setTimeout(() => sendMessage(con, "drop"), 100);
        setTimeout(() => sendMessage(con, "lastinv"), 100);
        
        
        console.log(tags["username"] + " just made you drop your rifle");
      }
      if (message.toLowerCase() === "droppistol") {
        sendMessage(con, "slot2");
        setTimeout(() => sendMessage(con, "drop"), 100);
        setTimeout(() => sendMessage(con, "lastinv"), 100);
        console.log(tags["username"] + " just made you drop your pistol");
      }
    }
    if (tags["custom-reward-id"] === config.crosshair_reward_id) {
      sendMessage(con, "apply_crosshair_code " + message);
      sendMessage(
        con,
        "echo applied crosshair from: " +
          tags["username"] +
          " | code: " +
          message
      );
      console.log(
        "applied crosshair from: " + tags["username"] + " | code: " + message
      );

      setTimeout(
        () => sendMessage(con, "apply_crosshair_code " + config.crosshair),
        60000
      );
    }
  });
}

async function csgoconsole() {
  const connection = new Telnet.Telnet();
  const params = {
    host: "127.0.0.1",
    port: "2121",
    negotiationMandatory: false,
    timeout: 1500,
  };
  try {
    await connection.connect(params);
  } catch (e) {
    console.log(
      `Error: Unable to connect to ${params.host}:${params.port}.\nMake sure that "-netconport ${params.port}" is added to the CS:GO launch options and that the game is running.\nRetrying in 10 seconds...`
    );
    setTimeout(() => {
      listen();
    }, RETRY_TIMEOUT);
    return;
  }
  const socket = connection.getSocket();
  await sendMessage(connection, "clear");
  await sendMessage(
    connection,
    ` echo ------------------------------------------ \n
    echo |..Toms Twitch Channelpoint Tool loaded..| \n
    echo ------------------------------------------ `
  );
  socket.on("data", async (data) => {
    var msg = data.toString("utf8");
  });
  listen(connection);
}
async function sendMessage(con, message) {
  try {
    await con.exec(message);
  } catch (e) {}
}

csgoconsole();
