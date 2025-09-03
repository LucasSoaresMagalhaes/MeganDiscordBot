const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('piada')
        .setDescription('Manda uma piada.'),

    async execute(interaction) {
        const piadasLiterais = [
            "Por que o livro foi ao médico? Porque ele estava com muitas páginas doentes.",
            "Qual é o contrário de papelada? Papel em pé.",
            "Por que o computador foi ao médico? Porque pegou um vírus. Literalmente, ele não funciona.",
            "Por que o lápis não pode dirigir? Porque ele não tem carteira de motorista.",
            "Por que o relógio foi expulso da aula? Porque ele estava marcando o tempo. É isso que ele faz.",
            "Por que a cama foi para a escola? Porque ela queria aprender a descansar melhor.",
            "Por que o celular não gosta de frio? Porque ele não tem luvas para tocar na tela.",
            "Qual é o cúmulo da preguiça? Não sei, eu não pesquisei.",
            "Por que a planta foi ao hospital? Porque ela estava sem folhas. Literalmente sem folhas.",
            "Por que a cadeira não fala? Porque ela é um objeto inanimado.",
            "Por que o pão foi preso? Porque ele cometeu um pão-crime. Essa piada não faz sentido, mas aqui está.",
            "Por que o carro não voa? Porque ele não tem asas, obviamente.",
            "Por que a televisão não respondeu? Porque ela não tem boca nem ouvidos.",
            "Por que a água caiu no chão? Porque a gravidade puxou.",
            "Por que o peixe não usa computador? Porque ele não tem dedos para digitar.",
            "Por que o fogão é quente? Porque ele foi ligado."
        ];

        const piada = piadasLiterais[Math.floor(Math.random() * piadasLiterais.length)];
        await interaction.reply("Certo... Aqui vai, contemple a rainha da comédia:\n\n" + piada);
        
    }
}