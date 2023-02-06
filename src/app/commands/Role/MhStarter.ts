import {
  SlashCommand,
  CommandContext,
  SlashCreator,
} from 'slash-create';
import client from '../../App';
import { addmhstarterToUser } from '../../service/role/Addmhstarter';
import discordServerIds from '../../service/constants/discordServerIds';
import Log, { LogUtils } from '../../utils/Log';
import { command } from '../../utils/SentryUtils';

export default class Madhatter extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'madhatter',
      description: 'to get the madhatter starter role',
      guildIDs: [discordServerIds.kingPin, discordServerIds.discordBotGarage],
      throttling: {
        usages: 2,
        duration: 1,
      },
      defaultPermission: true,
    });
  }
  

  async run(ctx: CommandContext): Promise<any> {
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
    LogUtils.logCommandStart(ctx);
    if (ctx.user.bot) return;
		
    Log.info('/madhatter starter');
    const guild = await client.guilds.fetch(ctx.guildID);
    const guestUser = await guild.members.fetch(ctx.user.id);

    if (guestUser.user.bot) {
      return ctx.send('Bots can\'t have this role');
    }
    

    try {
      await addmhstarterToUser(guestUser);
      await ctx.send({ embeds: [infoEmbed], ephemeral: true });
    } catch (e) {
      LogUtils.logError('failed to add mhstarter to user', e);
    }
  }
}
