import { Embed, SlashCommandBuilder } from 'discord.js'
import type { CommandInteraction } from 'discord.js';
import { EmbedBuilderWrapper } from '../utils/embed';
import axios from 'axios';


const data = new SlashCommandBuilder()
  .setName("pf")
  .setDescription("Check FFXIV party finder listings")
  .addStringOption(option =>
    option.setName('duty')
      .setDescription("the encounter you want to check")
      .addChoices(
        {name: 'ucob', value: 'ucob'},
        {name: 'uwu', value: 'uwu'},
        {name: 'tea', value: 'tea'},
        {name: 'dsr', value: 'dsr'},
        {name: 'top', value: 'top'}
      ));
const execute = async (interaction:any) => {
  const duty = interaction.options.getString('duty');
  
  const response = await axios.get(`http://127.0.0.1:8000/${duty}`);
  const listings = response.data
  const embed = EmbedBuilderWrapper(listings);
  return await interaction.reply({embeds: [embed]});
}

export {
  data,
  execute
}