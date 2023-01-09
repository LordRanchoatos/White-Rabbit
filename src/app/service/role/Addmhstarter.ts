import constants from '../constants/constants';
import ServiceUtils from '../../utils/serviceUtils';
import { GuildMember } from 'discord.js';
import Log, { LogUtils } from '../../utils/Log';

export const addmhstarterToUser = async (guestUser: GuildMember): Promise<void> => {
  const guestRole = ServiceUtils.getGuestRole(guestUser.guild.roles);
  await guestUser.roles.add(guestRole);
  Log.info(`user ${guestUser.user.tag} given ${guestRole.name} role`);
};

export const addmhlauncherToUser = async (guestUser: GuildMember): Promise<void> => {
  const guestRole = ServiceUtils.getGuestRole(guestUser.guild.roles);
  await guestUser.roles.add(guestRole);
  Log.info(`user ${guestUser.user.tag} given ${guestRole.name} role`);
};

