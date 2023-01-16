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
      defaultPermission: true,
    });
  }

	@command
  async run(ctx: CommandContext): Promise<any> {
    LogUtils.logCommandStart(ctx);
    if (ctx.user.bot) return;
		
    Log.info('/mad hatter starter');
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
    await ctx.send({ content: `<@${ctx.user.id}> You now have the Mad Hatter Starter Role`, ephemeral: true });
  }
}

