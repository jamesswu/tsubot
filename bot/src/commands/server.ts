import { SlashCommandBuilder } from 'discord.js';
import type { CommandInteraction } from 'discord.js';

const data = new SlashCommandBuilder()
    .setName('server')
    .setDescription('Provides information about the server');
const cooldown = 5;
const execute = async (interaction: CommandInteraction) => {
  return await interaction.reply(`This server is ${interaction.guild?.name} and has ${interaction.guild?.memberCount} members.`);
}

export {
  data,
  execute
}