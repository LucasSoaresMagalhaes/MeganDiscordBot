const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Role um dado!')
        .addIntegerOption(option =>
            option.setName('lados')
                .setDescription('De quantos lados é o dado? (Padrão: 20)')
                .setRequired(false)),

    async execute(interaction) {
        // Pega o número de lados ou define 20 como padrão
        const lados = interaction.options.getInteger('lados') || 20;

        // Gera número aleatório
        const roll = Math.floor(Math.random() * lados) + 1;

        await interaction.reply(`🎲 Você rolou um dado de ${lados} lados e tirou: **${roll}**`);

        // Mensagens adicionais
        if (roll === 1) {
            await interaction.followUp('Patético...');
        } else if (roll === lados) {
            await interaction.followUp('Olha só, um número máximo, espero que use bem esse número.');
        } else if (roll < lados / 2) {
            await interaction.followUp('Medíocre.');
        } else {
            await interaction.followUp('Não fez mais do que a obrigação.');
        }
    }
};
