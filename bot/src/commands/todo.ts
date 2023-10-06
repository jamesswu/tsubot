import { ActionRowBuilder, ComponentType, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
import type { ButtonBuilder, ChatInputCommandInteraction, CommandInteraction } from 'discord.js';

const data = new SlashCommandBuilder()
    .setName('todo')
    .setDescription('todo list')
    .addSubcommand(subcommand => 
      subcommand
        .setName('view')
        .setDescription('view todo list'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('add')
        .setDescription('add to todo list'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('delete')
        .setDescription('delete item in todo list'));
const execute = async (interaction: ChatInputCommandInteraction) => {
  const subcommand = interaction.options.getSubcommand();
  if (subcommand === 'view') {
    return await interaction.reply(`${subcommand}`);
  } else if (subcommand === 'add') {
    const modal = new ModalBuilder()
      .setCustomId('addModal')
      .setTitle('Add to Todo List');

    const itemInput = new TextInputBuilder()
      .setCustomId('item')
      .setLabel('Add Item')
      .setStyle(TextInputStyle.Short);

    const actionRow = new ActionRowBuilder<TextInputBuilder>({
      components: [
        {
          custom_id: "TodoItem",
          label: "Todo Item",
          style: TextInputStyle.Short,
          type: ComponentType.TextInput,
        }
      ]
    })
    modal.addComponents(actionRow)
    await interaction.showModal(modal)
  } else if (subcommand === 'delete') {

    return await interaction.reply(`${subcommand}`);
  }
}

export {
  data,
  execute
}