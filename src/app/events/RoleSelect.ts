import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, Guild } from 'discord.js';
import Log, { LogUtils } from '../utils/Log';
import { GuildMemberRoleManager, GuildTextThreadManager, ChannelType } from 'discord.js';
import { DiscordEvent } from '../types/discord/DiscordEvent';

const ROLES = {
  mhstarter: '1060180531729416223',
  govstarter: '1060180885586055168',
};
const channelId = process.env.DISCORD_CHANNEL_WELCOME_KP;


export default class implements DiscordEvent {
  name = 'interactionCreate';
  once = true;

  async execute(interaction): Promise<any> {
    if(!interaction.isButton) return;

    const role = interaction.guild.roles.cache.get(
      ROLES[interaction.customId],
    );

    if(!role) return interaction.reply({ content: 'Role not found', ephemeral: true });

    const hasRole = interaction.member.roles.cache.has(role.id);
    if(!hasRole) {
      try {
        interaction.member.roles.add(role).then((member) => {
          interaction.reply({
            content: `The ${role} role was added to you ${member}`,
            ephemral: true,
          });
        })
          .catch(error => Log.error(error));
      } catch(e) {
        interaction.reply({
          content: 'The role not added to you',
          ephemral: true,
        });
        Log.error(e);
      }
    } else {
      interaction.reply({
        content: 'You already have the role',
        ephemeral: true,
      });
    }

    const channel = interaction.member.guild.channels.cache.get(channelId);
    const thread = await channel.threads.create({
      name: 'MadHatter',
      autoArchiveDuration: 60,
      type: ChannelType.PrivateThread,
      reason: 'A private thread to onboard you.',
    });

    await thread.members.add(`${interaction.member.id}`);
  }
}

