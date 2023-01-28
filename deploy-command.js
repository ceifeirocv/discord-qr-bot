
const { REST, Routes } = require('discord.js');
const fs = require('fs');
require('dotenv/config');

const TOKEN = process.env.QR_BOT_TOKEN;
const CLIENT_ID = process.env.QR_CLIENT_ID


const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

commandFiles.map(file =>{
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
});

const rest = new REST({ version: '10' }).setToken(TOKEN);


(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(CLIENT_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();