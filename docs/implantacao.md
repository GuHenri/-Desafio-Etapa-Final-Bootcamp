# Plano de implantação do PortfolioHUB

## 1. Objetivo e escopo

O PortfolioHUB apresenta o perfil de Gustavo Henrique, competências, repositórios públicos e as práticas usadas na implantação. O site é estático para reduzir custo operacional e superfície de ataque.

## 2. Arquitetura

- Interface: HTML semântico, CSS responsivo e JavaScript nativo.
- Dados externos: API pública do GitHub, sem token no navegador.
- Build: cópia reproduzível de `src` para `dist`.
- Hospedagem: GitHub Pages e uma versão privada de validação no Sites.
- Automação: GitHub Actions para testes, análise de segurança e publicação.

## 3. Gestão de usuários e acesso

O conteúdo publicado é somente leitura e não exige cadastro. A gestão de usuários ocorre no GitHub:

- Proprietário com autenticação em dois fatores.
- Colaboradores adicionados individualmente e com menor privilégio necessário.
- Mudanças propostas por branches e pull requests.
- Branch padrão protegida contra alterações diretas, quando o plano do repositório permitir.
- Revisão periódica de colaboradores, chaves e sessões autorizadas.

## 4. Segurança

O projeto não armazena credenciais. A política CSP limita scripts, imagens e conexões. Os workflows declaram permissões mínimas, e o CodeQL analisa o JavaScript. Links externos abertos em nova aba recebem isolamento. A integração com o GitHub usa apenas dados públicos.

## 5. Colaboração e versionamento

O fluxo recomendado usa uma branch por mudança, commits objetivos e pull requests com evidências de teste. O arquivo `CONTRIBUTING.md` registra o processo. Issues podem registrar melhorias e defeitos sem expor dados sensíveis.

## 6. Testes e critérios de aceite

O comando `npm run check` precisa concluir sem erros. Ele verifica a geração dos arquivos finais, idioma, estrutura semântica, navegação acessível, integração com GitHub, CSP e preferência de movimento reduzido. A revisão visual cobre desktop e celular.

## 7. Publicação e reversão

Ao atualizar a branch padrão, o workflow executa build, testes e publica o conteúdo de `dist`. Cada implantação mantém relação com um commit. Para reverter, o administrador restaura um commit estável e executa novamente o workflow.

## 8. Monitoramento

O responsável deve acompanhar GitHub Actions, alertas do CodeQL e disponibilidade da API pública. A interface apresenta conteúdo local quando a API estiver indisponível.

## 9. Checklist de produção

- Conteúdo e links revisados.
- Testes automatizados aprovados.
- Layout revisado em desktop e celular.
- Nenhum segredo presente no repositório.
- CodeQL habilitado.
- Permissões de colaboradores revisadas.
- GitHub Pages habilitado para GitHub Actions.
- URL publicada registrada no relatório final.

