# PortfolioHUB - Gustavo Henrique

Portfólio digital responsivo integrado à API pública do GitHub. O projeto foi desenvolvido para o desafio final do Bootcamp I e documenta planejamento, versionamento, segurança, testes e implantação.

**Site publicado:** https://guhenri.github.io/-Desafio-Etapa-Final-Bootcamp/

## Executar localmente

Requisito: Node.js 20 ou superior.

```bash
npm run check
npx serve dist
```

O comando `npm run check` gera o diretório `dist` e executa as verificações automatizadas.

## Estrutura

- `src/`: código-fonte do site.
- `scripts/`: automação de build sem dependências externas.
- `tests/`: validações estruturais e de segurança.
- `docs/`: implantação, colaboração, prompts e roteiro do vídeo.
- `.github/workflows/`: integração contínua, CodeQL e GitHub Pages.
- `output/`: PDF e apresentação final gerados para a entrega.

## Integração com GitHub

O site consulta `https://api.github.com/users/GuHenri/repos` no navegador e apresenta os repositórios públicos mais recentes. Caso a API esteja indisponível, a interface mantém um cartão local do próprio PortfolioHUB.

## Segurança

- Content Security Policy no documento HTML.
- Nenhum token ou segredo no código cliente.
- Links externos com `noopener noreferrer`.
- Dependências de produção inexistentes.
- Análise automática por CodeQL.
- Permissões mínimas nos fluxos do GitHub Actions.

Consulte [SECURITY.md](SECURITY.md) e [docs/implantacao.md](docs/implantacao.md) para mais detalhes.

## Apoio do Google Gemini

O Gemini foi utilizado para revisar a priorização técnica do projeto. A análise recomendou manter como essenciais o fallback da API, a responsividade, a acessibilidade básica e a ausência de tokens no frontend. CodeQL, CSP e permissões mínimas foram mantidos porque já estavam implementados e não criam custo operacional relevante para o portfólio.

## Licença

Projeto acadêmico de autoria de Gustavo Henrique. O código pode ser consultado para avaliação e estudo.

