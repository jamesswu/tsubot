import { SlashCommandBuilder} from 'discord.js';
import type { CommandInteraction } from 'discord.js';

const data = new SlashCommandBuilder().setName("ping").setDescription("Replies with pong");

const execute = async (interaction: CommandInteraction) => {
  return await interaction.reply('Pong!');
}

export {
  data,
  execute
}
