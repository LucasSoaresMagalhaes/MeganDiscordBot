const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('jokenpo')
        .setDescription('Jogue pedra papel ou tesoura!')
        .addStringOption(option =>
            option.setName('escolha')
                .setDescription('Sua escolha: pedra, papel ou tesoura')
                .setRequired(true)
                .addChoices(
                    { name: 'pedra', value: 'pedra' },
                    { name: 'papel', value: 'papel' },
                    { name: 'tesoura', value: 'tesoura' },
                )),

    async execute(interaction) {

        const escolhas = ['pedra', 'papel', 'tesoura'];
        const escolhaUsuario = interaction.options.getString('escolha');
        const escolhaBot = escolhas[Math.floor(Math.random() * escolhas.length)];

        let resultado;
        if (escolhaUsuario === escolhaBot) {
            resultado = "Empate!";
        } else if (
            (escolhaUsuario === 'pedra' && escolhaBot === 'tesoura') ||
            (escolhaUsuario === 'papel' && escolhaBot === 'pedra') ||
            (escolhaUsuario === 'tesoura' && escolhaBot === 'papel')
        ) {
            resultado = "Você ganhou uma vez na vida pelo menos";
        } else {
            resultado = "Eu ganhei como esperado.";
        }

        await interaction.reply(`Você escolheu **${escolhaUsuario}**. Eu escolhi **${escolhaBot}**. ${resultado}`);

    }
}