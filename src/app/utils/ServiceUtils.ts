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
      return role.id === roleIds.mhstarterkp;
    });
  },
  getGuestRoleMhKlauncher(roles: RoleManager): Role {
    return roles.cache.find((role) => {
      return role.id === roleIds.kpmhlauncher;
    });
  },
  getGuestRoleMechanic(roles: RoleManager): Role {
    return roles.cache.find((role) => {
      return role.id === roleIds.kpmechanic;
    });
  },
};

export default ServiceUtils;
