import JobHandler from '../utils/job';
import RoleHandler from '../utils/role';
import { Embed, SlashCommandBuilder } from 'discord.js'
import type { ChatInputCommandInteraction} from 'discord.js';
import axios from 'axios';
import config from '../config';

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
  
  const response = await axios.get(`${config.XIVSCRAPER_URL}/${duty}`);
  const listings = response.data.data

  if (listings && listings.length) {
    const embedsArray = []
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
      const col1 = { name: listings[i].creator, value: party, inline: true }
      const col2 = { name: listings[i].tags, value: listings[i].description, inline: true }
      const col3 = { name: `<:timer:1146224804748333118>${listings[i].expires}`, value: `<:hourglass:1146224937581949020>${listings[i].updated}`, inline: true }
      fieldsArray.push(col1)
      fieldsArray.push(col2)
      fieldsArray.push(col3)

      // constructs an embed and pushes it onto the array 
      if ((i+1)%5 == 0) {
        // add title if this is the first embed being pushed
        if (embedsArray.length == 0 && i == listings.length-1) {
          const embed = {
            title: listings[0].duty,
            fields: fieldsArray,
            footer: {
              text: `${listings[0].datacenter} Data Center`
            }
          }
          fieldsArray = []
          embedsArray.push(embed)
        // handles the where the embed being pushed is the first and not the last one
        } else if (embedsArray.length == 0) {
          const embed = {
            title: listings[0].duty,
            fields: fieldsArray,
          }
          fieldsArray = []
          embedsArray.push(embed)
          
        } else if (i == listings.length-1) {
          const embed = {
            fields: fieldsArray,
            footer: {
              text: `${listings[0].datacenter} Data Center`
            }
          }
          fieldsArray = []
          embedsArray.push(embed)
        // handles the case where the embed being pushed is not the first and not the last
        } else {
          const embed = {
            fields: fieldsArray,
          }
          fieldsArray = []
          embedsArray.push(embed)
        }
      // constructs an embed of remaining listings that have not been pushed to the array
      } else if (i == listings.length-1) {
        // handles the case where it is the first and last embed
        if (embedsArray.length == 0) {
          const embed = {
            title: listings[0].duty,
            fields: fieldsArray,
            footer: {
              text: `${listings[0].datacenter} Data Center`
            }
          }
          fieldsArray = []
          embedsArray.push(embed)
        // handles the case where this is the last embed
        } else {
          const embed = {
            fields: fieldsArray,
            footer: {
              text: `${listings[0].datacenter} Data Center`
            }
          }
          fieldsArray = []
          embedsArray.push(embed)
        }
      }
    }
    return await interaction.reply({embeds: embedsArray, ephemeral: true});
  }
}

export {
  data,
  execute
}