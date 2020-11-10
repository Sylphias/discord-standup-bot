const Discord = require('discord.js');
require('dotenv').config()
const client = new Discord.Client();
client.login(process.env.DISCORD_BOT_TOKEN);

client.on('message', async message => {
  if (message.content.startsWith('--start-timer')) {
    let duration = message.content.replace("--start-timer", "").trim()
    const args = duration.split(" ")

    if (args[0].length <= 0 || isNaN(args[0])) {
      message.reply('You did not set the number of seconds properly! You can do so by running `--start-timer 5` to set a 5 second timer');
      return
    }
    if (parseInt(args[0]) > 900) {
      message.reply('Max time limit is 15 minutes (or 900 seconds)');
      return
    }
    console.log(`starting timer of ${args[0]} seconds `);
    setTimeout(() => { playSound(message) }, args[0] * 1000);
  }
});

const playSound = async (message) => {
  if (message.member.voice.channel) {
    const connection = await message.member.voice.channel.join();
    const dispatcher = connection.play('./assets/bell.mp3');
    dispatcher.on('finish', () => {
      dispatcher.destroy();
      message.member.voice.channel.leave();
    });
  } else {
    message.reply('You need to join a voice channel first!');
  }
}
