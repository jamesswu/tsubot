import { Client, Intents } from 'discord.js';
import { config } from 'dotenv';
config();
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });



client.once('ready', () => {
  console.log('tsubot is ready');
});

client.login(process.env.TOKEN!);
