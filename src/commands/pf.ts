import { Embed, SlashCommandBuilder } from 'discord.js'
import type { CommandInteraction } from 'discord.js';
import { EmbedBuilderWrapper } from '../utils/embed';
import axios from 'axios';


const data = new SlashCommandBuilder()
  .setName("pf")
  .setDescription("Check FFXIV party finder listings")
  .addStringOption(option =>
    option.setName('encounter')
      .setDescription("the encounter you want to check")
      .addChoices(
        {name: 'ucob', value: 'ucob'},
        {name: 'uwu', value: 'uwu'},
        {name: 'tea', value: 'tea'},
        {name: 'dsr', value: 'dsr'},
        {name: 'top', value: 'top'}
      ));
const execute = async (interaction:any) => {
  const encounter = interaction.options.getString('encounter');
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/ditto`);
  console.log(response.data);
  const embed = EmbedBuilderWrapper();
  return await interaction.reply({embeds: [embed]});
}

export {
  data,
  execute
}