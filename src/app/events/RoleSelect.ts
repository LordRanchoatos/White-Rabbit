import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, Guild } from 'discord.js';
import Log, { LogUtils } from '../utils/Log';
import { GuildMemberRoleManager } from 'discord.js';
import { DiscordEvent } from '../types/discord/DiscordEvent';

const ROLES = {
  mhstarter: '1060180531729416223',
  govstarter: '1060180885586055168',
};


export default class implements DiscordEvent {
  name = 'interactionCreate';
  once = true;

  async execute(interaction): Promise<any> {

    if (!interaction.isChatInputCommand || interaction.isButton()) {
      const role = interaction.guild.roles.cache.get(
        ROLES[interaction.customId],
      );
    
      if (!role) return interaction.reply({ content: 'Role not found', ephemeral: true });
    
      const hasRole = interaction.member.roles.cache.has(role.id);
    
      if (hasRole) {
        return await interaction.member.roles
          .remove(role)
          .then((member) =>
            interaction.reply({
              content: `The ${role} role was removed to you ${member}`,
              ephemeral: true,
            }),
          )
          .catch((member) => {
            return interaction.reply({
              content: `Something went wrong. The ${role} role was not removed to you ${member}`,
              ephemeral: true,
            });
          });
      } else {
        return await interaction.member.roles
          .add(role)
          .then((member) =>
            interaction.reply({
              content: `The ${role} role was added to you ${member}`,
              ephemeral: true,
            }),
          )
          .catch((member) => {
            return interaction.reply({
              content: `Something went wrong. The ${role} role was not added to you ${member}`,
              ephemeral: true,
            });
          });
      }
    }
  }
}

