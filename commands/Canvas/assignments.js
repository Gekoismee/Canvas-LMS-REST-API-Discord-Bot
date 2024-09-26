const { SlashCommandBuilder } = require('discord.js');
const api = require('../../api.js');
 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('assignments')
		.setDescription('Replies with assignments for one of the users active Canvas courses')
        
        .addStringOption(option => option.setName('bucket').setDescription('Due date relativity').setRequired(true).addChoices(
            {name:  'past', value: 'past' },
            {name: 'overdue', value: 'overdue'},
            {name: 'undated', value: 'undated'},
            {name: 'ungraded', value: 'ungraded'},
            {name: 'unsubmitted',value: 'unsumbitted'},
            {name: 'upcoming', value:'upcoming'},
            {name: 'future', value: 'future'}
        )).addStringOption(option => option.setName('courseid').setDescription('Course Id')),

	async execute(interaction) {
        const course = interaction.options.getString('courseid') ?? 'No course provided';
        const bucket = interaction.options.getString('bucket');
        let response = '';
        api.getAssignments(course,bucket).then(res2 => {
             
             for(r2 in res2){
                response += res2[r2].name + ', '+res2[r2].id+'\n';
            }
            interaction.reply(response);
        }
        ).catch(console.error);        
    
	},
};