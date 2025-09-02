negativePrompt = "lowres, text, error, cropped, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, out of frame, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, username, watermark, signature";
positivePrompt = "masterpiece, best quality, 8k, highres, detailed, intricate details, sharp focus, illustration, artstation, concept art, smooth, sharp, professional lighting, cinematic lighting";
const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const axios = require('axios');
const fs = require('fs');

STABLE_DIFFUSION_URL = 'http://127.0.0.1:8080'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('generate-image')
        .setDescription('Generates an image based on a prompt')
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('The prompt to generate the image')
                .setRequired(true)),

    async execute(interaction) {
        const prompt = interaction.options.getString('prompt');
        promptFinal = positivePrompt + ', ' + prompt;
        await interaction.deferReply();
        try {
            // Faz a requisição para o Stable Diffusion
            const response = await axios.post(`${STABLE_DIFFUSION_URL}/sdapi/v1/txt2img`, {
                prompt: promptFinal,
                negative_prompt: negativePrompt,
                steps: 35,
                sampler_name: "Euler a",
                width: 1024,
                height: 1024
            });

            const imageBase64 = response.data.images[0];
            const imageBuffer = Buffer.from(imageBase64, 'base64');
            const fileName = `generated.png`;
            fs.writeFileSync(fileName, imageBuffer);

            const attachment = new AttachmentBuilder(fileName);
            await interaction.editReply({ content: `Você jogou os seguintes ingredientes: **${prompt}**\nCozinhou no final essa atrocidade:`, files: [attachment] });

            fs.unlinkSync(fileName); // Remove o arquivo depois de enviar
        } catch (error) {
            console.error(error);
            await interaction.editReply('Não estou afim agora.');
        }
        
    }

    

}