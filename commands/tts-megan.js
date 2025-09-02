const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tts-megan')
    .setDescription('Transforma texto em áudio com a voz da Megan!')
    .addStringOption(option =>
      option.setName('texto')
        .setDescription('O que você quer que a Megan fale?')
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply(); // indica que o bot está processando

    const texto = interaction.options.getString('texto');

    try {
      // Gera áudio usando o modelo de TTS
      const response = await openai.audio.speech.create({
        model: 'gpt-4o-mini-tts',
        voice: 'alloy', // pode trocar para outras vozes
        input: texto,
      });

      // Salva o áudio como arquivo
      const filePath = path.join(__dirname, 'tts_output.mp3');
      const buffer = Buffer.from(await response.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      // Envia como attachment
      const audio = new AttachmentBuilder(filePath, { name: 'tts_output.mp3' });
      await interaction.editReply({ content: '🎙️ Aqui está sua fala:', files: [audio] });

      // Remove o arquivo local depois de enviar
      fs.unlinkSync(filePath);
    } catch (error) {
      console.error(error);
      await interaction.editReply('❌ Erro ao gerar áudio. Confira os logs.');
    }
  },
};