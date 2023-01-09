/**
 * Utilities for service layer
 */
import {
  AwaitMessagesOptions,
  Collection,
  DMChannel,
  Guild,
  GuildMember,
  Permissions,
  Role,
  RoleManager,
  Snowflake,
  StageChannel,
  User,
  VoiceChannel,
} from 'discord.js';
import { Db } from 'mongodb';
import { ButtonStyle, CommandContext, ComponentActionRow, ComponentType } from 'slash-create';
import client from '../app';
import ValidationError from '../errors/ValidationError';
import constants from '../service/constants/constants';
import roleIds from '../service/constants/roleIds';
import discordServerIds from '../service/constants/discordServerIds';
import Log, { LogUtils } from './Log';
import MongoDbUtils from '../utils/MongoDbUtils';


const ServiceUtils = {
  getGuestRoleMhstarter(roles: RoleManager): Role {
    return roles.cache.find((role) => {
      return role.id === roleIds.mhstarter;
    });
  },
  getGuestRoleMhKlauncher(roles: RoleManager): Role {
    return roles.cache.find((role) => {
      return role.id === roleIds.kpmhlauncher;
    });
  },
};

export default ServiceUtils;
