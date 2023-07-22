import { SlashCommandBuilder } from '@discordjs/builders'
import type { CommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder().setName("pf").setDescription("Check FFXIV party finder");

export async function execute(interaction: CommandInteraction) {
  return await interaction.reply('Pong!');
}