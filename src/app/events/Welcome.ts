import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client } from 'discord.js';
import { LogUtils } from '../utils/Log';
import { TextChannel } from 'discord.js';
import { DiscordEvent } from '../types/discord/DiscordEvent';

const channelId = process.env.DISCORD_CHANNEL_WELCOME_KP;


export default class implements DiscordEvent {
  name = 'ready';
  once = true;

  async execute(client: Client): Promise<any> {
    const infoEmbed = {
      color: 0x0099ff,
      title: 'Discord Developer Portal',
      url: 'https://discord.com/developers/applications',
      author: {
        name: 'White Rabbit',
        icon_url: 'https://i.imgur.com/AfFp7pu.png',
        url: 'https://i.imgur.com/AfFp7pu.png',
      },
      description: 'GETTING STARTED',
      fields: [
        {
          name: 'EXPLORER',
          value: 'You have been asigned the explorer tag.',
        },
        {
          name: 'Mad Hatter',
          value: 'To Contribute to Mad Hatter bot pro: run the "/madhatter" command.',
        },
        {
          name: 'MHStarter',
          value: 'You will be asigned the mhstarter tag',
        },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'white Rabbit',
        icon_url: 'https://i.imgur.com/AfFp7pu.png',
      },
    };

    try {
      client.on('guildMemberAdd', (member: any) => {
        const message = `<@${member.id}> Welcome to the garage, Let's get you down the Rabbit hole! `;
        const channel = member.guild.channels.cache.get(channelId) as TextChannel;
        channel.send(message);
        const userRole = member.guild.roles.cache.find(role => role.name === 'Explorer');
        member.roles.add(userRole);
        channel.send({
          embeds: [infoEmbed],
        });
      });
    
    } catch (e) {
      LogUtils.logError('Error, coulding process welcome event', e);
    }

  }
}
