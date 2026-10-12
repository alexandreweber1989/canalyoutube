# Comece aqui — AgentTube

Cópia do [darkzOGx/youtube-automation-agent](https://github.com/darkzOGx/youtube-automation-agent)
(licença MIT, versão 2.10.0, commit `e26792a`), o projeto do vídeo "7 agentes de IA
que tocam seu canal do YouTube". O original continua no remoto `upstream`.

## O que ele faz

Um painel web (`http://localhost:3456`) que leva um vídeo da ideia à publicação:

| Agente | Faz |
|--------|-----|
| Estratégia | Pesquisa o que está em alta no nicho e monta o calendário |
| Roteiro | Escreve gancho, história e chamada final |
| Thumbnail | Cria as capas e variações para teste A/B |
| SEO | Título, descrição e tags |
| Produção | Narração (TTS), imagens/vídeo e montagem do MP4 com FFmpeg |
| Publicação | Agenda e sobe no YouTube **só depois da sua aprovação** |
| Analytics | Lê métricas e comentários e sugere o próximo passo |

Nada é publicado sem você aprovar no **Review Studio**.

## O que já vem instalado

- Node.js 18+ (testado com 22) e todas as bibliotecas do `package.json` via `npm ci`.
- FFmpeg embutido (`ffmpeg-static`, versão 7.0.2). Não precisa instalar à parte.
- SQLite (`sqlite3`) e processamento de imagem (`sharp`) já compilados.
- Na nuvem do Claude Code, `.claude/hooks/session-start.sh` roda o `npm ci` sozinho
  ao abrir a sessão.

No PC:

```bash
npm ci
npm run walkthrough   # assistente que pede as chaves e testa cada uma
npm start             # abre o painel em http://localhost:3456
```

## O que você precisa conseguir (contas e chaves)

1. **YouTube (obrigatório, grátis).** No [Google Cloud Console](https://console.cloud.google.com/):
   crie um projeto, ative **YouTube Data API v3**, crie um cliente OAuth do tipo
   **App para computador** (Desktop app) e salve o JSON como `config/credentials.json`.
2. **Um provedor de texto de IA (obrigatório).** O mais barato para começar é o
   **Gemini**: chave grátis no [Google AI Studio](https://aistudio.google.com/),
   em `GEMINI_API_KEY` no `.env`. Ele também faz a narração (TTS) de graça.
   Alternativas: OpenAI, OpenRouter, Anthropic.
3. **Imagens e vídeo por IA (opcional, pago).** Sem isso o app monta o vídeo em
   slideshow com fundos em gradiente, sem custo.

Copie `.env.example` para `.env` e preencha. **Nunca** commite `.env`,
`config/credentials.json` ou `config/tokens.json` (o `.gitignore` já bloqueia).

## Pontos de atenção

- **Login do YouTube precisa de navegador.** A autorização OAuth abre uma página
  em `127.0.0.1`; por isso a primeira configuração é mais fácil no PC. Depois o
  `config/tokens.json` gerado pode ser reaproveitado.
- **Token cripto no README original.** O título do README do autor traz um
  endereço de token (`…pump`, padrão do pump.fun). Não tem relação com o código e
  o código não mexe com carteira nem cripto, mas não compre nada por causa disso.
- **Dependências com alertas de segurança.** `npm audit` aponta 35 alertas
  (2 críticos, 22 altos) nas versões travadas pelo autor (axios, express,
  playwright, sharp, tar…). Para uso local, atrás do seu próprio PC, o risco é
  baixo; antes de expor o painel na internet, rode `npm audit fix` e os testes.
- **Telemetria desligada.** Só envia algo se você ativar
  `ANONYMOUS_TELEMETRY_ENABLED=true` e informar um endereço.
- **Custos.** Os vídeos por IA (Seedance, Kling, etc.) cobram por segundo. O padrão
  é slideshow local, sem custo. Defina `VIDEO_MAX_GENERATED_SECONDS` antes de ligar.

## Atualizar com o original

```bash
git fetch upstream master
git merge upstream/master
npm ci
```
