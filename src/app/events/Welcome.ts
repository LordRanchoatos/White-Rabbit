import { Client, Guild } from 'discord.js';
import Log, { LogUtils } from '../utils/Log';
import { TextChannel } from 'discord.js';
import { DiscordEvent } from '../types/discord/DiscordEvent';

const channelId = '997872691572916309';
export default class implements DiscordEvent {
  name = 'ready';
  once = true;

//   functions on entry to the server 
// welcome message. 
// send option to select project.
// asign role tag.

  async execute(client: Client): Promise<any> {
    try {
      client.on('guildMemberAdd', (member: any) => {
        // console.log(member);
        const message = `Welcome to the garage, Let's get you started <@${member.id}>`;
        const channel = member.guild.channels.cache.get(channelId) as TextChannel;
        channel.send(message);
      });
    } catch (e) {
      LogUtils.logError('Error processing event ready', e);
    }

  }
}
