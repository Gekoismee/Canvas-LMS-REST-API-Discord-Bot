const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder,  EmbedBuilder, bold } = require('discord.js');
const api = require('../../api.js');
 const assignments = require('./assignments.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('courses')
		.setDescription('Replies with users active Canvas courses'),
	async execute(interaction) {
        let btns = [];
        /*----------------------------------------------------------------------------------------------------------------*/
        api.getCourses().then(async res => {for(r in res){
            if(res[r].end_at != null){
            btns.push(new ButtonBuilder().setCustomId(res[r].id.toString()).setLabel(res[r].name).setStyle(ButtonStyle.Secondary));
            }
        }
        /*----------------------------------------------------------------------------------------------------------------*/
           
        const row = new ActionRowBuilder().addComponents(...btns); 
        let response = await interaction.reply({
            content:'Select a Class to see its assignments',
            components: [row]
        });

        const collectorFilter = i => i.user.id === interaction.user.id;

		try{
			const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60000_000});
            let btns2 = [];
            /*----------------------------------------------------------------------------------------------------------------*/
			api.getAssignments(confirmation.customId).then(async res2 =>{
                for(r2 in res2){
                    btns2.push(new ButtonBuilder().setCustomId(res2[r2].id.toString()).setLabel(res2[r2].name).setStyle(ButtonStyle.Secondary))
                }
            /*----------------------------------------------------------------------------------------------------------------*/    
                if(btns2.length>5){
                    const rows = [];
                    let j = 0;
                    for(let i = 0; i < 5 && (i*5)+j < btns2.length;i++){
                        let newRow = [];
                        for(j = 0; j<5 && (i*5)+j < btns2.length;j++){
                            newRow.push(btns2[(i*5)+j]);
                        }
                        rows.push(new ActionRowBuilder().addComponents(...newRow));
                        j=0;
                    }
                    let courseName = '';
                    for(r in res){
                        if (res[r].id.toString() == confirmation.customId){
                            courseName = res[r].name;
                        }
                    }
                    response = await confirmation.update({content: `Select an assignment from ${courseName}(${confirmation.customId}) to get more info.`,components:rows})
                }
                else{
                    const row2 = new ActionRowBuilder().addComponents(...btns2); 
                    response = await confirmation.update({content: 'Select an assignment to get more info.',components:[row2]})
                }

                try{
                    const confirmation2 = await response.awaitMessageComponent({ filter: collectorFilter, time: 60000_000});
                    let assignment;
                    for( r2 in res2){
                        if(res2[r2].id == confirmation2.customId){
                            assignment = res2[r2];
                        }
                    }
                    let name = bold(assignment.name);
                    let description = api.unHTTP(assignment.description);
                    //console.log(assignment);
                   // await confirmation2.update({content: `${name} \n ${description}`,components:[]})
                   let dueDate;
                   if(assignment.due_at===null){
                    dueDate = 'No Due Date';
                   }
                   else{
                    dueDate = new Date(assignment.due_at);
                    dueDate = dueDate.toLocaleString();
                   }
                   let submissions;
                   if(assignment.has_submitted_submissions){
                    submissions = 'Already submitted';
                   }
                   else{
                    submissions = 'Not submitted yet';

                   }
                    let assignmentEmbed = new EmbedBuilder().setColor(0xE13D29).setTitle(name).setURL(assignment.html_url)
                    .addFields(
                        {name: '\u200B', value: '\u200B'},
                        {name: 'Possible Points', value: `${assignment.points_possible}`,inline:true},
                        {name: 'Due Date', value: `${dueDate}`,inline:true},
                        {name: 'Submitted?', value: `${submissions}`,inline:true}
                    )
                    .setDescription(description).setTimestamp();
                   confirmation2.update({content:"",embeds: [assignmentEmbed],components:[]});

                }catch (e){
			    await interaction.editReply({content: 'Error', components:[]});
		    }
            });

		} catch (e){
			await interaction.editReply({content: 'Error', components:[]});
		}

    }).catch(console.error);
        
    
	},
};