const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('xingar')
        .setDescription('Mande alguém a merda')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Usuário a ser xingado')
                .setRequired(true)),

    async execute(interaction) {
        const xingamentos = ["Vai se foder!", "Vai tomar no cu!", "Vai à merda!", "Vai se catar!", "Vai se lascar!", "Vai pro inferno!", "Vai se enfiar numa caverna escura e nunca mais sair!", "Vai se afogar em um copo d'água!", "Vai se perder no meio do nada!", "Vai se queimar com fogo brando!", "Vai se empalar em um espinho!", "Vai se trancar em um quarto escuro e nunca mais sair!", "Vai se esconder embaixo da cama e nunca mais aparecer!", "Vai se enterrar vivo!", "Vai se perder na floresta e nunca mais ser encontrado!", "Vai se afogar em um mar de lágrimas!", "Vai se queimar com óleo fervente!", "Vai se cortar com uma faca cega!", "Vai se enforcar com uma corda velha!", "Vai se jogar de um penhasco!", "Vai se perder em um labirinto sem saída!", "Vai se queimar com uma vela acesa!", "Vai se cortar com um vidro quebrado!", "Vai se afogar em um rio de lama!", "Vai se perder em um deserto sem fim!"];
        const usuario = interaction.options.getUser('usuario');
        const adjetivos = [
            "burro", "idiota", "otario", "otária", "imbecil", "estupido", "estúpido",
            "animal", "retardado", "doente", "inutil", "inútil", "lixo", "merda",
            "bosta", "cocô", "desgraçado", "desgraçada", "vagabundo", "vagabunda",
            "canalha", "crapula", "crápula", "miseravel", "miserável", "patetico",
            "patético", "nojento", "nojenta", "ridiculo", "ridícula", "ridículo",
            "idiotice", "paspalho", "energúmeno", "corno", "corna", "fdp", "filhodaputa",
            "porra", "caralho", "buceta", "rola", "pau", "piroca", "pentelho",
            "boqueteiro", "boceta", "pqp", "vsf", "vai se foder", "vai tomar no cu",
            "pau no cu", "otário", "bosta seca", "pau de arara", "pau mandado",
            "trouxa", "otaria", "palhaço", "palhaça", "merdinha", "cretino",
            "cretina", "safado", "safada", "escroto", "escrota"
        ];
        const adjetivo = adjetivos[Math.floor(Math.random() * adjetivos.length)];
        const xingamento = xingamentos[Math.floor(Math.random() * xingamentos.length)];
        await interaction.reply(`${usuario}, tu é ${adjetivo},  ${xingamento}`);
    }
}