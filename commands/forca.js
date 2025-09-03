const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('forca')
        .setDescription('Jogue forca!'),

    async execute(interaction) {

        const palavras = [
            // Tecnologia e programação
            'javascript', 'discord', 'programacao', 'nodejs', 'bot', 'computador', 'teclado',
            'monitor', 'internet', 'desenvolvedor', 'backend', 'frontend', 'fullstack',
            'html', 'css', 'python', 'java', 'golang', 'rust', 'typescript', 'csharp',
            'linux', 'windows', 'macos', 'ubuntu', 'terminal', 'github', 'git', 'api',
            'framework', 'library', 'database', 'mysql', 'mongodb', 'postgres', 'docker',
            'kubernetes', 'server', 'client', 'router', 'modem', 'wifi', 'firewall',
            'cloud', 'virtualizacao', 'inteligencia', 'artificial', 'machinelearning',
            'rede', 'programador', 'script', 'algoritmo', 'codigo', 'bug', 'debug',
            'compilador', 'frontend', 'backend', 'react', 'vue', 'angular', 'express',
            'django', 'flask', 'fastapi', 'laravel', 'php', 'typescript',

            // Games
            'minecraft', 'fortnite', 'valorant', 'roblox', 'pokemon', 'zelda', 'mario',
            'sonic', 'leagueoflegends', 'overwatch', 'csgo', 'gta', 'skyrim', 'eldenring',

            // Hardware
            'processador', 'placamae', 'memoria', 'ssd', 'hd', 'placadevideo', 'gabinete',
            'fonte', 'headset', 'mouse', 'webcam', 'notebook', 'smartphone',

            // Conceitos gerais
            'software', 'hardware', 'codigoaberto', 'opensource', 'criptografia',
            'seguranca', 'navegador', 'servidor', 'dominio', 'website', 'aplicativo',
            'programa', 'engenharia', 'tecnologia', 'robotica', 'dados', 'bigdata',
            'armazenamento', 'backup', 'criptomoeda', 'blockchain', 'bitcoin', 'ethereum',

            // Palavras extras para diversão
            'gato', 'cachorro', 'floresta', 'praia', 'montanha', 'sol', 'lua', 'estrela',
            'planeta', 'galaxia', 'universo', 'tempo', 'chuva', 'vento', 'fogo', 'agua',
            'terra', 'arvore', 'flor', 'carro', 'moto', 'bicicleta', 'livro', 'caneta',
            'copo', 'cadeira', 'mesa', 'porta', 'janela', 'casa', 'predio', 'cidade',
            'pais', 'idioma', 'comida', 'pizza', 'hamburguer', 'sorvete', 'chocolate',
            'bolo', 'doce', 'salgado', 'fruta', 'banana', 'maca', 'laranja', 'uva'
        ]; 
        const palavra = palavras[Math.floor(Math.random() * palavras.length)];
        let letrasErradas = [];
        let letrasCertas = [];
        let tentativas = 6;
        let displayPalavra = '_ '.repeat(palavra.length).trim();
        let jogoAtivo = true;
        await interaction.reply(`Bem-vindo ao jogo da Forca! A palavra tem ${palavra.length} letras.\n${displayPalavra}\nVocê tem ${tentativas} tentativas. Use /adivinhar <letra> para tentar uma letra.`);
        const filter = m => m.author.id === interaction.user.id;
        const collector = interaction.channel.createMessageCollector({ filter, time: 300000 });
        collector.on('collect', m => {
            if (!jogoAtivo) return;
            const input = m.content.toLowerCase();
            if (input.length !== 1 || !/[a-z]/.test(input)) {
                m.reply('Insere uma letra que nem gente.');
                return;
            }
            if (letrasErradas.includes(input) || letrasCertas.includes(input)) {
                m.reply('Já foi essa letra, esquece ela logo.');
                return;
            }
            if (palavra.includes(input)) {
                letrasCertas.push(input);
                displayPalavra = palavra.split('').map(l => (letrasCertas.includes(l) ? l : '_')).join(' ');
                if (!displayPalavra.includes('_')) {
                    jogoAtivo = false;
                    m.reply(`Parabéns. Você conseguiu adivinhar, superou minhas expectativas: ${palavra}`);
                    collector.stop();
                    return;
                }
            } else {
                letrasErradas.push(input);
                tentativas--;
                if (tentativas === 0) {
                    jogoAtivo = false;
                    m.reply(`Você perdeu, nada fora do esperado. A palavra era: ${palavra}`);
                    collector.stop();
                    return;
                }
            }
            m.reply(`Palavra: ${displayPalavra}\nLetras erradas: ${letrasErradas.join(', ')}\nTentativas restantes: ${tentativas}`);
        });
        collector.on('end', collected => {
            if (jogoAtivo) {
                interaction.followUp('O tempo acabou! Jogo encerrado.');
            }
        });
    }
}