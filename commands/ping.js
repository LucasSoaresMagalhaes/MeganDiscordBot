const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Jogue Ping Pong!'),

    async execute(interaction) {
        randomNumber = Math.floor(Math.random() * 100);
        if (randomNumber >= 40) {
            await interaction.reply('Pong!');
        }
        else if (randomNumber >= 20) {
            await interaction.reply('PONG! RECEBA, GANHEI! Você nunca teve chance!');
        }
        else {
            await interaction.reply('PONJ! MERDA! REVANCHE!');
        }
    }
}