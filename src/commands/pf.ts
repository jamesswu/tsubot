import { Embed, SlashCommandBuilder } from 'discord.js'
import type { CommandInteraction } from 'discord.js';
import { EmbedBuilderWrapper } from '../utils/embed';

const encounterHandler = (encounter: string) =>  {
  switch(encounter) {
    case 'ucob':
      return 'The Unending Coil of Bahamut';
      break;
    case 'uwu':
      return '';
      break;
    case 'tea':
      return 'The Epic of Alexander';
      break;
    case 'dsr':
      return 'Dragonsong\'s Reprise';
      break;
    case 'top':
      return 'The Omega Protocol';
      break;
    default:
      return ''
      break;
  }
}

const data = new SlashCommandBuilder()
  .setName("pf")
  .setDescription("Check FFXIV party finder listings")
  .addStringOption(option =>
    option.setName('encounter')
      .setDescription("the encounter you want to check")
      .addChoices(
        {name: 'ucob', value: 'The Unending Coil of Bahamut'},
        {name: 'uwu', value: 'The Weapon\'s Refrain'},
        {name: 'tea', value: 'The Epic of Alexander'},
        {name: 'dsr', value: 'Dragonsong\'s Reprise'},
        {name: 'top', value: 'The Omega Protocol'}
      ));
const execute = async (interaction:any) => {
  const encounter = interaction.options.getString('encounter');
  const embed = EmbedBuilderWrapper();
  return await interaction.reply({embeds: [embed]});
}

export {
  data,
  execute
}