negativePrompt = "lowres, text, error, cropped, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, out of frame, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, username, watermark, signature, letters, log, ai-generated, ai-assisted, stable diffusion, nai diffusion, worst quality, worst aesthetic, bad quality, normal quality, average quality, oldest, old, early, very displeasing, displeasing, adversarial noise, unknown artist, banned artist, what, off-topic, artist request, text, artist name, signature, username, logo, watermark, copyright name, copyright symbol, resized, downscaled, source larger, low quality, lowres, jpeg artifacts, compression artifacts, blurry, artistic error, bad anatomy, bad hands, bad feet, disfigured, deformed, extra digits, fewer digits, missing fingers, censored, bar censor, mosaic censoring, missing, extra, fewer, bad, hyper, error, ugly, worst, tagme, unfinished, bad proportions, bad perspective, aliasing, unclear, photo, icon, multiple views, sequence, comic, 2koma, 4koma, multiple images, turnaround, collage, panel skew, speech bubble, lossy-lossless, scan artifacts, out of frame, cropped, abstract, child";
positivePrompt = "masterpiece, best quality, good quality, very aesthetic, absurdres, newest, very awa, highres";
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
            ADETAILER_ARGS = [
                { "ad_model": "hand_yolov8n.pt" }
            ]
            // Faz a requisição para o Stable Diffusion
            const response = await axios.post(`${STABLE_DIFFUSION_URL}/sdapi/v1/txt2img`, {
                prompt: promptFinal,
                negative_prompt: negativePrompt,
                steps: 35,
                sampler_name: "Euler a",
                cfg_scale: 5,
                width: 1024,
                height: 1024,
                alwayson_scripts: {
                    ADetailer: {
                        args: ADETAILER_ARGS,
                        sampler_name: "Euler a"
                    }
                }
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

    //TODO Criar bancpo de dados para salvar imagens favoritas
    //TODO Adicionar opção de salvar imagem no banco de dados (Limitar para 5 imagens por usuário e usuários marcados)
    //TODO Adicionar comando para ver imagens favoritas
    //TODO Adicionar comando para remover imagem favorita

}