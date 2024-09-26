const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {

		const btn = new ButtonBuilder().setCustomId('btn').setLabel("This is button").setStyle(ButtonStyle.Primary);

		const row = new ActionRowBuilder().addComponents(btn);
		const response = await interaction.reply({
			content:'Look a button!',
			components: [row]
		});

		const collectorFilter = i => i.user.id === interaction.user.id;

		try{
			const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 6_000});

			if(confirmation.customId === 'btn'){
				await confirmation.update({content: 'You pressed me!', components:[]});
			}

		} catch (e){
			await interaction.editReply({content: 'You didn\'t press it!', components:[]});
		}
	},
};