# Megan Bot — Discord + Ollama AI

Megan é uma **goth anime AI** para Discord, criada para conversar de forma sarcástica, tímida e estilosa.  
Ela usa **Ollama** para rodar modelos de linguagem localmente (como `llama2:13b`) e responde diretamente no Discord via slash command `/ask-megan`.

---

## Funcionalidades

-  **Personalidade única**: Megan é **emo, tímida, sarcástica** e fala em português com gírias.  
-  **IA local**: Usa [Ollama](https://ollama.ai/) para gerar respostas sem depender de serviços externos.  
-  **Slash commands**: Interaja com Megan usando `/ask-megan`.  
-  **Fácil de personalizar**: Ajuste a personalidade no código para criar sua própria persona.  

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [Discord Developer Portal](https://discord.com/developers/applications) para criar o bot e pegar o **TOKEN**
- [Ollama](https://ollama.ai/) instalado e rodando localmente
- Um modelo do Ollama, por exemplo:

```bash
ollama pull llama2:13b
