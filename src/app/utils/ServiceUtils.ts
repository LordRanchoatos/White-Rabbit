/**
 * Utilities for service layer
 */
import {
  Role,
  RoleManager,
} from 'discord.js';
import roleIds from '../service/constants/roleIds';


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
