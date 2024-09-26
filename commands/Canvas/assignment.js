const { SlashCommandBuilder } = require('discord.js');
const api = require('../../api.js');
 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('assignment')
		.setDescription('Replies with assignment name and description')
        
        .addStringOption(option => option.setName('assignmentid').setDescription('Assignment Id'))
        .addStringOption(option => option.setName('courseid').setDescription('Course Id')),

	async execute(interaction) {
        const assignment = interaction.options.getString('assignmentid') ?? 'No assignment provided';
        const course = interaction.options.getString('courseid') ?? 'No course provided';
        let response = '';
        api.getAssignment(course, assignment).then(res2 => {
             
             response = res2.name + '\n'+ res2.description ;
            interaction.reply(response);
        }
        ).catch(console.error);        
    
	},
};