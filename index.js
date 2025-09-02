const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

const dotenv = require('dotenv');
dotenv.config();
const { TOKEN } = process.env;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});
// Importação dos comandos
const fs = require('node:fs');
const path = require('node:path');

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


client.commands = new Collection();

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const commands = require(filePath);

    if ('data' in commands && 'execute' in commands) {
        client.commands.set(commands.data.name, commands);
    }
    else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }

}


client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(TOKEN);

// Listener de interação

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
        console.log(`Executed command ${interaction.commandName} by ${interaction.user.tag}`);
    }
    catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        }
        else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

// Listener de mensagens
client.on('messageCreate', async (message) => {

    // Transforma o conteúdo da mensagem em minúsculas
    const content = message.content.toLowerCase();

    // Verifica se menciona "megan"
    if (message.author.tag === 'Stacy The Fusion#9708' && content.includes('megan')) {

        try {
            // Reage à mensagem
            await message.react('🖤');
            await message.reply(`Oi Stacy...`);
        } catch (err) {
            console.error('Erro ao reagir à mensagem:', err);
        }

    }
    if (content.includes('oi megan')) {
        try {
            // Reage à mensagem
            await message.react('💀');
            await message.reply(`O que foi ${message.author.tag}?!\nDeixei chamar meu nome?`);
            // Opcional: log no console
            console.log(`Megan mencionada por ${message.author.tag}: ${message.content}`);
        } catch (err) {
            console.error('Erro ao reagir à mensagem:', err);
        }
    }
    else if (content.includes('megan')) {
        try {
            // Reage à mensagem
            await message.react('🙄');
            // Opcional: log no console
            console.log(`Megan mencionada por ${message.author.tag}: ${message.content}`);
        } catch (err) {
            console.error('Erro ao reagir à mensagem:', err);
        }
    }

    // Verifica se menciona "stacy"
    else if (content.includes('stacy') && message.author.tag !== 'Megan#5246') {
        try {
            // Reage à mensagem
            await message.react('🔫');
        } catch (err) {
            console.error('Erro ao reagir à mensagem:', err);
        }
    }

    if (content.includes('macaco')) {
        try {
            // Reage à mensagem
            await message.react('🐒');
        } catch (err) {
            console.error('Erro ao reagir à mensagem:', err);
        }
    }
});

// Listener de reações
client.on('messageReactionAdd', async (reaction, user) => {
    try {
        if (reaction.partial) await reaction.fetch();
        if (reaction.message.partial) await reaction.message.fetch();

        if (!reaction.message.author || reaction.message.author.id !== client.user.id) return;

        if (reaction.emoji.name === '❤️' && reaction.count === 2) {
            await reaction.message.reply(`Não é como se eu gostasse de atenção ou algo assim...`);
        } 
        else if (reaction.emoji.name === '🔥' && reaction.count === 2) {
            await reaction.message.reply(`Pai tá quente!`);
        } 
        else if (reaction.emoji.name === '👎' && reaction.count === 2) {
            await reaction.message.reply(`Vocês não gostam de mim, né? Tudo bem, eu também não gosto de vocês.`);
        }
    } catch (error) {
        console.error('Erro ao processar reação:', error);
    }
});