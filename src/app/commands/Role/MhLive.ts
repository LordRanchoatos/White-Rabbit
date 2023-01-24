import {
	SlashCommand,
	CommandOptionType,
	ApplicationCommandPermissionType,
	CommandContext,
	SlashCreator,
} from 'slash-create';
import client from '../../app';
import roleIds from '../../service/constants/roleIds';
import discordServerIds from '../../service/constants/discordServerIds';
import Log, { LogUtils } from '../../utils/Log';
import { command } from '../../utils/SentryUtils';
import { getinfo } from '../../../app/service/github/checkRepo'

export default class GuestPass extends SlashCommand {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'mhlive',
			description: 'Grant a temporary guest pass to a user',
            guildIDs: [discordServerIds.kingPin, discordServerIds.discordBotGarage],
			options: [
				{
					type: CommandOptionType.STRING,
					name: 'Github Username',
					description: 'Grant the Mechanic Role:',
					required: true,
				},
			],
			throttling: {
				usages: 2,
				duration: 1,
			},
			defaultPermission: false,
			permissions: {
				[discordServerIds.kingPin]: [
					{
						type: ApplicationCommandPermissionType.ROLE,
						id: roleIds.kpmhlauncher,
						permission: true,
					},
				],
				[discordServerIds.discordBotGarage]: [
					{
						type: ApplicationCommandPermissionType.ROLE,
						id: roleIds.mhlauncher,
						permission: true,
					},
				],
			},
		});
	}

	@command
	async run(ctx: CommandContext): Promise<any> {
		LogUtils.logCommandStart(ctx);
		if (ctx.user.bot) return;
		
		Log.info('/mhlive start');
		const guild = await client.guilds.fetch(ctx.guildID);
		const guestUser = await guild.members.fetch(ctx.options.user);

		if (guestUser.user.bot) {
			return ctx.send('Bots can\'t be a mechanic!');
		}
        const fork = getinfo()



        //check if user forked the project repo
		try {
			await addMechanicRoleToUser(guestUser);
		} catch (e) {
			LogUtils.logError('failed to add guest role to user', e);
		}
		await ctx.send(`<@${ctx.user.id}> Mechanic role added and message sent!`);
	}
}

