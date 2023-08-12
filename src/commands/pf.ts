import { Embed, SlashCommandBuilder } from 'discord.js'
import type { CommandInteraction } from 'discord.js';
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
  
  const response = await axios.get(`http://127.0.0.1:8080/listings/${duty}`);
  // console.log(response.data)
  const listings = response.data.data

  let fields = []

  for (const i in listings) {
    const temp:
    temp.name = listings[i].creator 
  }

  const embed = {
    title: listings[0].title

  }


  return await interaction.reply({embeds: [data]});
}

export {
  data,
  execute
}