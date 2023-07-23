import { REST, Routes } from 'discord.js';
import config from './config'
import * as commandModules from './commands';
import type { RequestData, SlashCommandBuilder } from 'discord.js';

type Command = {
  data: unknown
}

const commands: any = [];

for (const module of Object.values<Command>(commandModules)) {
  commands.push(module.data);
}

const rest = new REST().setToken(config.DISCORD_TOKEN);

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    const data: any = await rest.put(Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID), { body: commands });
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.log(error);
  }
})();

  // .then(() => console.log('Successfully registered application commands.'))
  // .catch(console.error);