import JobHandler from '../utils/job';
import RoleHandler from '../utils/role';
import { Embed, SlashCommandBuilder } from 'discord.js'
import type { ChatInputCommandInteraction} from 'discord.js';
import axios from 'axios';

type Temp = {
  name: string
  value: string
  inline: boolean
} | undefined

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
const execute = async (interaction:ChatInputCommandInteraction) => {
  const duty = interaction.options.getString('duty');
  
  const response = await axios.get(`http://127.0.0.1:8080/listings/${duty}`);
  const listings = response.data.data



  if (listings && listings.length) {
    const embedArray = []
    // go through the listings array
    let fieldsArray = []
    for (let i = 0; i < listings.length; i++) {
      // field per listing
      let party = '';
      for (let j = 0; j < listings[i].party.length; j++) {
        if (listings[i].party[j].Filled) {
          party += JobHandler(listings[i].party[j].Job) + ' '
        } else {
          party += RoleHandler(listings[i].party[j].Roles.Roles) + ' '
        }
      }
      let col1 = { name: listings[i].creator, value: party, inline: true }
      let col2 = { name: listings[i].tags, value: listings[i].description, inline: true }
      let col3 = { name: listings[i].expires, value: listings[i].updated, inline: true }
      fieldsArray.push(col1)
      fieldsArray.push(col2)
      fieldsArray.push(col3)

      // constructs an embed and pushes it onto the array 
      if ((i+1)%5 == 0) {
        const embed = {
          title: listings[0].duty,
          fields: fieldsArray,
          footer: {
            text: `${listings[0].datacenter} data center`
          }
        }
        fieldsArray = []
        embedArray.push(embed)

      } else if (i == listings.length-1) {
        const embed = {
          title: listings[0].duty,
          fields: fieldsArray,
          footer: {
            text: `${listings[0].datacenter} data center`
          }
        }
        fieldsArray = []
        embedArray.push(embed)
      }
    }
    return await interaction.reply({embeds: embedArray, ephemeral: true});
  }
}

export {
  data,
  execute
}