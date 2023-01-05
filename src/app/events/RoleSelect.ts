import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, Guild } from 'discord.js';
import Log, { LogUtils } from '../utils/Log';
import { TextChannel } from 'discord.js';
import { DiscordEvent } from '../types/discord/DiscordEvent';

const ROLES = {
    MHstarter: '1060180531729416223',
    GovStarter: '1060180885586055168',
  };



export default class implements DiscordEvent {
    name = 'ready';
    once = false;

    async execute(client: Client): Promise<any>{

        client.on('interactionCreate', async (interaction) => {
        if (interaction.isButton()) {
        const role = interaction.guild.roles.cache.get(
            ROLES[interaction.customId.toUpperCase()] // the button's custom Id MUST match your ROLES property defined above
        );
    
        if (!role)
            return interaction.reply({ content: 'Role not found', ephemeral: true });
    
        const hasRole = interaction.member.roles.cache.has(role.id);
        console.log(hasRole);
    
        if (hasRole)
            return interaction.member.roles
            .remove(role)
            .then((member) =>
                interaction.reply({
                content: `The ${role} role was removed to you ${member}`,
                ephemeral: true,
                })
            )
            .catch((err) => {
                console.log(err);
                return interaction.reply({
                content: `Something went wrong. The ${role} role was not removed to you ${member}`,
                ephemeral: true,
                });
            });
        else
            return interaction.member.roles
            .add(role)
            .then((member) =>
                interaction.reply({
                content: `The ${role} role was added to you ${member}`,
                ephemeral: true,
                })
            )
            .catch((err) => {
                console.log(err);
                return interaction.reply({
                content: `Something went wrong. The ${role} role was not added to you ${member}`,
                ephemeral: true,
                });
            });
    }
  }
);








        
        // try{
        //     client.on('interactionCreate', async (interaction) => {
        //         if (interaction.isButton()) {
        //           const role = interaction.guild.roles.cache.get(
        //             ROLES[interaction.customId.toUpperCase()] // the button's custom Id MUST match your ROLES property defined above
        //           );
              
        //           if (!role)
        //             return interaction.reply({ content: 'Role not found', ephemeral: true });
                    
        //             const role = (interaction.member.roles as GuildMemberRoleManager).cache;
        //           const hasRole = interaction.member.roles.cache.has(role.id);
        //           const hasRole = interaction.member.roles.
        //           console.log(hasRole);
              
        //           if (hasRole)
        //             return interaction.member.roles
        //               .remove(role)
        //               .then((member) =>
        //                 interaction.reply({
        //                   content: `The ${role} role was removed to you ${member}`,
        //                   ephemeral: true,
        //                 })
        //               )
        //               .catch((err) => {
        //                 console.log(err);
        //                 return interaction.reply({
        //                   content: `Something went wrong. The ${role} role was not removed to you ${member}`,
        //                   ephemeral: true,
        //                 });
        //               });
        //           else
        //             return interaction.member.roles
        //               .add(role)
        //               .then((member) =>
        //                 interaction.reply({
        //                   content: `The ${role} role was added to you ${member}`,
        //                   ephemeral: true,
        //                 })
        //               )
        //               .catch((err) => {
        //                 console.log(err);
        //                 return interaction.reply({
        //                   content: `Something went wrong. The ${role} role was not added to you ${member}`,
        //                   ephemeral: true,
        //                 });
        //               });
        //         }
        //       })
        // } catch (e) {
        //     LogUtils.logError('Error processing event ready', e);
        // }
    }
}