import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, Guild } from 'discord.js';
import Log, { LogUtils } from '../utils/Log';
import { GuildMemberRoleManager, GuildTextThreadManager, ChannelType } from 'discord.js';
import { DiscordEvent } from '../types/discord/DiscordEvent';
import { embed } from 'nft.storage/dist/src/token';

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

    const infoEmbed = {
      color: 0x0099ff,
      title: 'Discord Developer Portal',
      url: 'https://discord.com/developers/applications',
      author: {
        name: 'White Rabbit',
        icon_url: 'https://i.imgur.com/AfFp7pu.png',
        url: 'https://i.imgur.com/AfFp7pu.png',
      },
      description: 'SETUP YOUR BOTS',
      thumbnail: {
        url: 'https://i.imgur.com/AfFp7pu.png',
      },
      fields: [
        {
          name: 'Step A: Setup your bot Application',
          value: 'To set up your bot appliation visit the discord Developer portal.',
        },
        {
          name: 'Step B: Get your bot into the server.',
          value: 'Run "/mhlauncher" command with your bot invite link ',
        },
        {
          name: 'Next',
          value:  'Your Bot will be added to the server by someone in the MHMT',
        },
        {
          name: 'Mad Hatter setup',
          value:  'Fork the mad hatter bot repository <Madhatterlink> and run the and',
        },
      ],
      image: {
        url: 'https://i.imgur.com/AfFp7pu.png',
      },
      timestamp: new Date().toISOString(),
      footer: {
        text: 'white Rabbit',
        icon_url: 'https://i.imgur.com/AfFp7pu.png',
      },
    };

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
    await thread.send({ embeds: [infoEmbed] });
  }
}

