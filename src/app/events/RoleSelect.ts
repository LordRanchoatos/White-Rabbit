import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, Guild } from 'discord.js';
import Log, { LogUtils } from '../utils/Log';
import { GuildMemberRoleManager } from 'discord.js';
import { DiscordEvent } from '../types/discord/DiscordEvent';

const ROLES = {
    mhstarter: '1060180531729416223',
    govstarter: '1060180885586055168',
};


export default class implements DiscordEvent {
  name = 'interactionCreate';
  once = true;

  async execute(interaction, client): Promise<any> {
  
        if(interaction.isButton()){
            const mhstarter = '1060180531729416223';
            const govstarter = '1060180885586055168';
            const member = interaction.member;

                if(interaction.customId == "mhstarter"){
                    interaction.guild.roles.fetch(mhstarter)
                        .then(role => { 
                            member.roles.add(role)
                            interaction.reply({
                                content: `The ${role} role was added to you ${member}`,
                                ephemeral: true,
                            })
                        })
                        .catch((e) => {
                            LogUtils.logError('error adding role', e); 
                        })
                } else if(interaction.customId === 'govstarter'){
                    interaction.guild.roles.fetch(govstarter)
                            .then( role => 
                            { member.roles.add(role),
                                interaction.reply({
                                    content: `The ${role} role was added to you ${member}`,
                                    ephemeral: true,
                                })
                            }
                        )
                        .catch((e) => {
                            LogUtils.logError('error adding role', e); 
                        })
                }
        }

    }
}



//     try{
//         if (interaction.isButton()) {
//         const role = interaction.guild.roles.cache.get(
//             ROLES[interaction.customId.toUpperCase()], // the button's custom Id MUST match your ROLES property defined above
//         );
        
//         if (!role) return interaction.reply({ content: 'Role not found', ephemeral: true });
        
//         const hasRole = interaction.member.roles.cache.has(role.id);
//         console.log("===============ISROLE=============",hasRole);
        
//         if (hasRole) {
//             return interaction.member.roles
//             .remove(role)
//             .then((member) =>
//                 interaction.reply({
//                 content: `The ${role} role was removed to you ${member}`,
//                 ephemeral: true,
//                 }),
//             )
//             .catch((err, member) => {
//                 // console.log(err);
//                 return interaction.reply({
//                 content: `Something went wrong. The ${role} role was not removed to you ${member}`,
//                 ephemeral: true,
//                 });
//             });
//         } else {
//             return interaction.member.roles
//             .add(role)
//             .then((member) =>
//                 interaction.reply({
//                 content: `The ${role} role was added to you ${member}`,
//                 ephemeral: true,
//                 }),
//             )
//             .catch((err, member) => {
//                 return interaction.reply({
//                 content: `Something went wrong. The ${role} role was not added to you ${member}`,
//                 ephemeral: true,
//                 });
//             });
//         }
//         }
//     } catch (e) {
//         LogUtils.logError('error processing button innteraction', e);
//         // console.log(e)
//     }
//   }