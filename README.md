# Megan Bot — Discord + Ollama AI

Megan é uma goth anime AI para Discord, criada para conversar de forma sarcástica, tímida e estilosa.  
Ela usa Ollama para rodar modelos de linguagem localmente (como `llama2:13b`) e responde diretamente no Discord via slash command `/ask-megan`.  
Além disso, pode gerar imagens com Stable Diffusion e brincar com comandos simples como Ping Pong.

---

## Funcionalidades

<<<<<<< HEAD
- Personalidade única: Megan é emo, tímida, sarcástica e fala em português com gírias.  
- IA local: Usa [Ollama](https://ollama.ai/) para gerar respostas sem depender de serviços externos.  
- Geração de imagens (Stable Diffusion): Crie imagens usando modelos de difusão.  
- Ping Pong: Jogue com Megan para descontrair.  
- Fácil de personalizar: Ajuste a personalidade ou adicione comandos customizados.  
=======
-  **Personalidade única**: Megan é **emo, tímida, sarcástica** e fala em português com gírias.  
-  **IA local**: Usa [Ollama](https://ollama.ai/) para gerar respostas sem depender de serviços externos.  
-  **Slash commands**: Interaja com Megan usando `/ask-megan`.  
-  **Fácil de personalizar**: Ajuste a personalidade no código para criar sua própria persona.  
>>>>>>> d216fcc919668e86901a69312428b8647c33ec38

---

## Pré-requisitos
<<<<<<< HEAD
=======

- [Node.js](https://nodejs.org/) 18+
- [Discord Developer Portal](https://discord.com/developers/applications) para criar o bot e pegar o **TOKEN**
- [Ollama](https://ollama.ai/) instalado e rodando localmente
- Um modelo do Ollama, por exemplo:
>>>>>>> d216fcc919668e86901a69312428b8647c33ec38

- [Node.js](https://nodejs.org/) 18+  
- [Discord Developer Portal](https://discord.com/developers/applications) para criar o bot e pegar o TOKEN  
- [Ollama](https://ollama.ai/) instalado e rodando localmente  
- Um modelo do Ollama (exemplo: `llama2:13b`):
```bash
ollama pull llama2:13b
```

Instalação

    Clone o repositório:

    ```bash
    git clone https://github.com/seu-usuario/megan-bot.git
    cd megan-bot
    ```

    Instale as dependências:
    ```bash
    npm install
    ```
    Configuração

    Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

    ```bash
    DISCORD_TOKEN=SEU_TOKEN_DO_DISCORD
    CLIENT_ID=SEU_CLIENT_ID
    GUILD_ID=SEU_GUILD_ID
    OLLAMA_HOST=http://127.0.0.1:11434
    STABLE_DIFFUSION_URL=http://127.0.0.1:7860
    ```

Como Rodar

    Inicie o servidor do Ollama:
    ```bash
    npm install
    ```

    Inicie o Stable Diffusion:

    ```bash
    python launch.py
    ```

    Inicie o bot:
    
    ```bash
    node index.js
    ```
Agora Megan estará online no seu servidor Discord.