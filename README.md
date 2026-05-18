# GovBR Classless

Um framework CSS sem classes baseado no [Padrão Digital de Governo](https://www.gov.br/ds/) (GovBR-DS) v3.7.0. Adicione uma tag `<link>` e escreva HTML semântico puro — sem classes, sem JavaScript, sem etapa de build necessária.

## Uso

### Via CDN (jsDelivr)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tarsiswt/govbr-classless@main/dist/govbr-classless.min.css">
```

### Auto-hospedado

Baixe o arquivo `dist/govbr-classless.min.css` e sirva-o diretamente.

## O que está coberto

Todos os elementos HTML padrão estilizados conforme o GovBR-DS:

- Tipografia (títulos, parágrafos, citações, código, pré-formatado)
- Formulários (input, select, textarea, checkbox, radio, switch, range)
- Botões e links
- Tabelas
- Listas
- Mídia (figure, img, video)
- Navegação (nav, breadcrumb)
- Diálogos e details/summary
- Barras de progresso
- Painéis aside com variantes de estado

## Tema para Pico CSS

Um tema complementar para o [Pico CSS v2](https://picocss.com/) que mapeia os tokens de design do GovBR-DS sobre o sistema de variáveis do Pico:

```html
<!-- Carregue o Pico CSS primeiro, depois o tema GovBR -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.classless.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tarsiswt/govbr-classless@main/dist/govbr-pico-theme.min.css">
```

O tema aplica as cores do GovBR-DS, tipografia Rawline, botões arredondados e o característico contorno vermelho tracejado no foco.

## Build

A minificação é feita pelo [lightningcss](https://lightningcss.dev/) e executa automaticamente via GitHub Actions a cada push na branch `main` que alterar um arquivo CSS fonte. O resultado minificado é commitado de volta em `dist/` para entrega via CDN.

Para fazer o build localmente:

```bash
npm ci
npm run build
# Saída:
#   dist/govbr-classless.min.css   (~34 KB)
#   dist/govbr-pico-theme.min.css  (~7 KB)
```

## Referências do design system

- **Especificação GovBR-DS:** https://www.gov.br/ds/
- **Tokens de design:** `@govbr-ds/core@3.7.0` (carregado via CDN em tempo de execução)
- **Tipografia:** [Rawline](https://fonts.cdnfonts.com/css/rawline)

## Licença

Os arquivos fonte são disponibilizados sob a licença [Creative Commons CC0](https://creativecommons.org/publicdomain/zero/1.0/). Os tokens de design e ativos do GovBR-DS são propriedade do Governo Federal Brasileiro.
