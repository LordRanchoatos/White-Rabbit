import { Client, Guild } from 'discord.js';
import Log, { LogUtils } from '../utils/Log';
import { TextChannel } from 'discord.js';
import { DiscordEvent } from '../types/discord/DiscordEvent';

const channelId = "997872691572916309";
export default class implements DiscordEvent {
    name = 'ready';
    once = true;


    async execute(client: Client): Promise<any> {
        try {
            client.on("guildMemberAdd", (member) => {
                console.log(member)
                const message = `Welcome to the garage, Let's get you started <@${member.id}>`
                const channel = member.guild.channels.cache.get(channelId) as TextChannel;
                channel.send(message)

            })
        } catch (e) {
            LogUtils.logError('Error processing event ready', e);
        }

    }
}