# RUNNER — Endless Run

Jogo de corrida infinita inspirado no conceito do Chrome Dino, feito com HTML, CSS e JavaScript puro.

## Como jogar
- Pressione **Espaço**, **↑** ou **W** para pular.
- No celular, toque na área do jogo.
- Desvie dos obstáculos e tente bater seu recorde.

## Executar
Abra `index.html` no navegador. Não precisa instalar dependências nem configurar servidor.

## Dados
O recorde fica salvo localmente no navegador usando `localStorage`. O jogo não coleta nem envia endereço IP ou dados pessoais.


## Analytics opcionais (com consentimento)

O site mostra um aviso de privacidade. Somente visitantes que clicarem em **Aceitar** enviam eventos de visita, início e fim de partida (incluindo a pontuação final). Quem recusar não envia esses eventos. Não são enviados IP, localização, nome, navegador, sistema operacional ou identificadores pessoais.

### Configurar o webhook no Vercel

1. Importe este repositório na Vercel como projeto.
2. Em **Settings → Environment Variables**, crie `DISCORD_WEBHOOK_URL` com a URL do webhook novo.
3. Faça um novo deploy.

O webhook fica somente no servidor, em variável de ambiente; nunca coloque o segredo no `index.html`. O endpoint `/api/track` é uma função serverless da Vercel. Em hospedagem estática sem suporte a funções serverless, o envio de analytics não funcionará.
