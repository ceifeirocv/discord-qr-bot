const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('qrcode')
		.setDescription('Recive a string and reply whit a QRCode')
    .addStringOption(option =>
      option.setName('text')
        .setDescription('Text to qr')
        .setRequired(true)),
	async execute(interaction) {
    const text = interaction.options.getString('text')
    console.log(text);
    const encodedText = encodeURIComponent(text)
    console.log(encodedText)
		await interaction.reply(`https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encodedText}`);
	},
};