import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, Guild } from 'discord.js';
import Log, { LogUtils } from '../utils/Log';
import { TextChannel } from 'discord.js';
import { DiscordEvent } from '../types/discord/DiscordEvent';

const channelId = '997872691572916306';
// const ROLES = {
//     MHstarter: '1060180531729416223',
//     GovStarter: '1060180885586055168',
//   };

// client.on('interactionCreate', async (interaction) => {
//     if (interaction.isButton()) {
//       const role = interaction.guild.roles.cache.get(
//         ROLES[interaction.customId.toUpperCase()] // the button's custom Id MUST match your ROLES property defined above
//       );
  
//       if (!role)
//         return interaction.reply({ content: 'Role not found', ephemeral: true });
  
//   const hasRole = interaction.member.roles.cache.has(role.id);
//       console.log(hasRole);
  
//       if (hasRole)
//         return interaction.member.roles
//           .remove(role)
//           .then((member) =>
//             interaction.reply({
//               content: `The ${role} role was removed to you ${member}`,
//               ephemeral: true,
//             })
//           )
//           .catch((err) => {
//             console.log(err);
//             return interaction.reply({
//               content: `Something went wrong. The ${role} role was not removed to you ${member}`,
//               ephemeral: true,
//             });
//           });
//       else
//         return interaction.member.roles
//           .add(role)
//           .then((member) =>
//             interaction.reply({
//               content: `The ${role} role was added to you ${member}`,
//               ephemeral: true,
//             })
//           )
//           .catch((err) => {
//             console.log(err);
//             return interaction.reply({
//               content: `Something went wrong. The ${role} role was not added to you ${member}`,
//               ephemeral: true,
//             });
//           });
//     }
//   });


export default class implements DiscordEvent {
  name = 'ready';
  once = true;

  // functions on entry to the server 
  // welcome message: 
  // 1. automatically asign a role on joining. 
  // send option to select project, 
  // asign role tag.

  async execute(client: Client): Promise<any> {
    try {
      client.on('guildMemberAdd', (member: any) => {
        // console.log(member);
        const message = `Welcome to the garage, Let's get you started <@${member.id}>, You will have been assigned the Explorer role.`;
        const channel = member.guild.channels.cache.get(channelId) as TextChannel;
        channel.send(message);
        const welcomeRole = member.guild.roles.cache.find(role => role.name === 'Explorer');
        member.roles.add(welcomeRole);
        // member.guild.channels.cache.get('YOU_CHANNEL_ID').send(`Welcome <@${member.user.id}> to our server! Make sure to check out the rules channel!`)
        channel.send({
          content: 'Select the project you would like  to contribute to: ',
          components: [
            new ActionRowBuilder<any>().setComponents(
              new ButtonBuilder().setCustomId('mhstarter').setLabel('Mad Hatter').setStyle(ButtonStyle.Secondary),
            ),
            new ActionRowBuilder<any>().setComponents(
              new ButtonBuilder().setCustomId('govstarter').setLabel('Governator').setStyle(ButtonStyle.Secondary),
            ),
          ],
        });
      });
    
    } catch (e) {
      LogUtils.logError('Error processing event ready', e);
    }

  }
}
