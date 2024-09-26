const { SlashCommandBuilder } = require('discord.js');
const api = require('../../api.js');
 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('canvas')
		.setDescription('Replies with Canvas commands'),
	async execute(interaction) {   
        interaction.reply('/courses: Replies with users active Canvas courses.'+ '\n' + '/assignments: Replies with users todo list assignments.' );
    }
};