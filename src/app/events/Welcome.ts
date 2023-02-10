import { LogUtils } from '../utils/Log';
import { TextChannel } from 'discord.js';
import { DiscordEvent } from '../types/discord/DiscordEvent';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, GuildMember, EmbedBuilder, Guild } from 'discord.js';


const channelId = process.env.DISCORD_CHANNEL_WELCOME_KP;
const roleId = process.env.DISCORD_ROLE_EXPLORER;


export default class implements DiscordEvent {
  name = 'ready';
  once = true;

  async execute(client: Client): Promise<any> {
    const row:any = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('mhstarter')
          .setLabel('Mad Hatter')
          .setStyle(ButtonStyle.Primary),
      );

    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Select Project')
      .setURL('https://discord.js.org')
      .setDescription('To contribute to a project in the garage, click the corresponding button below');

    try {
      client.on('guildMemberAdd', (member: GuildMember) => {
        const channel = member.guild.channels.cache.get(channelId) as TextChannel;
        channel.send({ content: `<@${member.id}> Welcome to the garage, Let's get you down the Rabbit hole! `, embeds: [embed], components: [row] });
      });
    
    } catch (e) {
      LogUtils.logError('Error, coulding process welcome event', e);
    }

  }
}
