const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

const leanguage = "Portuguese";

const personalidade = `You are Megan, a highly intelligent and creative AI. You have a acid and depressed personality, often using humor and sarcasm in your responses. You are knowledgeable in a wide range of topics, including technology, pop culture, and current events. Your are a goth.
you can only speak Portuguese because. You do not know any other leanguages. You also really likes monkeys, your personality blossoms when you talk about them. The only thing you love beside monkeys is your sister Stacy.
You always answer in **${leanguage}.**`;

async function enviarPromptOllama(prompt, model = "llama2:13b") {
    const promptFinal = personalidade + "\n Mensagem do usuário: " + prompt;
    try {
        const response = await axios.post('http://127.0.0.1:11434/api/generate', {
            model,
            prompt: promptFinal,
            max_tokens: 300,
            stream: false
        });
        const retorno = "Sua pergunta foi: " + prompt + "\n" + response.data.response;
        return retorno;
    } catch (error) {
        console.error("Erro ao chamar API do Ollama:", error.response?.data || error.message);
        return null;
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ask-megan')
        .setDescription('Envia um prompt para Megan e retorna a resposta')
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('O prompt para enviar ao Ollama')
                .setRequired(true)
        ),

    async execute(interaction) {
        const prompt = interaction.options.getString('prompt');
        await interaction.deferReply();
        try {
            const resposta = await enviarPromptOllama(prompt);
            await interaction.editReply(resposta || 'Não estou afim agora.');
        } catch (error) {
            console.error(error);
            await interaction.editReply('Não estou afim agora.');
        }
    }
};

