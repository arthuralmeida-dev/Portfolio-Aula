# Portfólio — Arthur Souza Almeida

**Site publicado:** https://arthuralmeida-dev.github.io/Portfolio-Aula/

Portfólio pessoal de Arthur Souza Almeida, estudante do 2º semestre de Engenharia de Software (UCSAL) com foco em back-end (Java e Spring Boot).

Feito com **HTML, CSS e JavaScript puro**, sem frameworks nem dependências.

## O que a página tem

- **Início, Sobre e Habilidades**: objetivo profissional, trajetória e habilidades agrupadas por contexto de uso.
- **Projetos**: cards gerados por JavaScript a partir de uma lista de dados, com **filtro por categoria** (Todos, Web, Segurança, Terminal, API), contagem de resultados e mensagem quando não há resultado.
- **Contato**: canais reais (e-mail, telefone, GitHub, LinkedIn) e um **formulário de demonstração** com validação, regra condicional e estados de envio.
- **Menu responsivo** com `aria-expanded`, fechamento pela tecla Esc e link "Pular para o conteúdo".

## Como executar

1. Baixe ou clone o repositório.
2. Abra o arquivo `index.html` no navegador (dois cliques já funcionam).
   - No VS Code, outra opção é a extensão **Live Server**: botão direito no `index.html` → *Open with Live Server*.

Não há build nem instalação.

## Estrutura

```
Portfolio/
├── index.html          → estrutura e conteúdo fixo
├── style.css           → aparência e responsividade
├── script.js           → menu, projetos/filtro, animação e formulário
├── img/
│   ├── foto.jpg        → foto otimizada (38 KB)
│   └── projetos/       → imagens dos cards
├── docs/
│   ├── DOCUMENTACAO.md → diagnóstico, testes, evidências e decisões
│   └── evidencias/     → prints de antes e depois
└── README.md
```

## Como o contato funciona

- Os **canais reais** de contato estão listados na seção Contato.
- O **formulário é uma demonstração**: **nenhum e-mail é enviado**, e o aviso aparece no próprio formulário. O envio é simulado por uma função assíncrona (`enviarDemonstracao`) que responde depois de 1,5 s com sucesso ou falha, conforme a opção escolhida em "Resultado da demonstração".
- A validação acontece só no navegador. Em uma aplicação real, o servidor também precisaria validar os dados.

Detalhes, testes e evidências estão em [docs/DOCUMENTACAO.md](docs/DOCUMENTACAO.md).
