import {
  SlashCommand,
  CommandOptionType,
  ApplicationCommandPermissionType,
  CommandContext,
  SlashCreator,
} from 'slash-create';
import client from '../../App';
import roleIds from '../../service/constants/roleIds';
import { addmhstarterToUser } from '../../service/role/Addmhstarter';
import discordServerIds from '../../service/constants/discordServerIds';
import Log, { LogUtils } from '../../utils/Log';
import { command } from '../../utils/SentryUtils';

export default class madhatterStarter extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'madhatter',
      description: 'To get the Mad Hatter starter Role',
      guildIDs: [discordServerIds.kingPin, discordServerIds.discordBotGarage],
      throttling: {
        usages: 2,
        duration: 1,
      },
      defaultPermission: false,
      permissions: {
        [discordServerIds.kingPin]: [
          {
            type: ApplicationCommandPermissionType.ROLE,
            id: roleIds.kpexplorer,
            permission: true,
          },
        ],
        [discordServerIds.discordBotGarage]: [
          {
            type: ApplicationCommandPermissionType.ROLE,
            id: roleIds.explorer,
            permission: true,
          },
        ],
      },
    });
  }
  

	@command
  async run(ctx: CommandContext): Promise<any> {
    const exampleEmbed = {
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
          value: 'Send your bot invite to the one of the Mad Hatter Management.',
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
    } catch (e) {
      LogUtils.logError('failed to mad hatter starter to user', e);
    }
    await ctx.send({ embeds: [exampleEmbed], ephemeral: true });
  }
}

