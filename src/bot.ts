import { Client, Events, GatewayIntentBits } from 'discord.js';
import config from './config';
import fs from 'fs';
import path from 'path';
import * as commandModules from './commands';

export const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Command handling
const commands = Object(commandModules);
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;

  if (!commands[commandName]) {
    console.error(`No command matching ${interaction.commandName} was found.`);
  }

  try {
    await commands[commandName].execute(interaction, client);

  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({content: 'There was an error while executing this command!', ephemeral: true});
    } else {
      await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
  }

});

// Event handling
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(config.DISCORD_TOKEN);
