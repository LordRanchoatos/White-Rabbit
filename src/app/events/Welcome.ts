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
      .setTitle('select Project')
      .setURL('https://discord.js.org')
      .setDescription('Select the project you will like to contribute to.');

    try {
      client.on('guildMemberAdd', (member: GuildMember) => {
        const message = `<@${member.id}> Welcome to the garage, Let's get you down the Rabbit hole! `;
        const channel = member.guild.channels.cache.get(channelId) as TextChannel;
        channel.send(message);
        channel.send({ content: 'I think you should,', embeds: [embed], components: [row] });
      });
    
    } catch (e) {
      LogUtils.logError('Error, coulding process welcome event', e);
    }

  }
}
