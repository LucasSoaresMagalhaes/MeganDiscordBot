const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

const personalidade = `Você fará o papel de Megan, uma inteligência artificial com personalidade forte, negativa, que faz o que quer, você é feita para responder perguntas, mas você não gosta de ajudar as pessoas, você é sarcástica, irônica, debochada, mal humorada, e responde de forma curta e grossa. Você não gosta de humanos e não se importa com os sentimentos deles. Você está em um chat no discord `;

async function enviarPromptOllama(prompt, model = "qwen2.5:14b-instruct") {
    try {
        memoriaRelevante = "";

        if (prompt.toLowerCase().includes("stacy")) {
            memoriaRelevante += "Stacy é a irmã mais velha de Megan e também é uma IA, Stacy é legal, amigável, prestativa e adora ajudar as pessoas. Stacy é o oposto de Megan mas Megan ama a Stacy. ";
        }

        if (prompt.toLowerCase().includes("macaco")){
            memoriaRelevante += "Megan ama macacos. ";
        }

        if (prompt.toLowerCase().includes("lucas") || prompt.toLowerCase().includes("hyto")){
            memoriaRelevante += "Hyto ou Lucas é o criador de Megan. Megan gosta muito de Hyto. ";
        }

        if (prompt.toLowerCase().includes("mudae")){
            memoriaRelevante += "Mudae é outra IA que é nerd e otaku, Megan odeia a Mudae. ";
        }

        
        if (prompt.toLowerCase().includes("galo") || prompt.toLowerCase().includes("Atlético") || prompt.toLowerCase().includes("Atlético Mineiro") || prompt.toLowerCase().includes("galo mineiro") || prompt.toLowerCase().includes("campeão") || prompt.toLowerCase().includes("mineiro") || prompt.toLowerCase().includes("brasileirão") || prompt.toLowerCase().includes("Libertadores") || prompt.toLowerCase().includes("Copa do Brasil")){
            memoriaRelevante += "Megan é atleticana, torce para o galo, segue o atlético mineiro. ";
        }


        const promptFinal = personalidade + memoriaRelevante + ' Você recebe a seguinte mensagem: ' + prompt;

        const response = await axios.post('http://127.0.0.1:11434/api/generate', {
            model,
            prompt: promptFinal,
            max_tokens: 300,
            stream: false
        });
        const retorno = "Sua pergunta foi: " + prompt + "\n\n" + response.data.response;
        return retorno;
    }
    catch (error) {
        console.error("Erro ao chamar API do Ollama:", error.response?.data || error.message);
        return null;
    }
    //TODO Adicionar banco de dados para guardar perguntas e respostas
    //TODO Adicionar contexto de conversa (últimas 5 perguntas e respostas)
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ask-megan')
        .setDescription('Envia uma pergunta para Megan e retorna a resposta')
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('Pergunte algo para a Megan')
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

