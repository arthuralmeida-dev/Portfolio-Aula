// =====================================================
// 1. MENU DO CELULAR
// =====================================================
const botaoMenu = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

function menuEstaAberto() {
  return botaoMenu.getAttribute('aria-expanded') === 'true';
}

function definirMenuAberto(aberto) {
  menu.classList.toggle('aberto', aberto);
  botaoMenu.setAttribute('aria-expanded', String(aberto));
  botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
}

botaoMenu.addEventListener('click', () => {
  definirMenuAberto(!menuEstaAberto());
});

// Um único listener no menu: fecha quando qualquer link é clicado
menu.addEventListener('click', (evento) => {
  if (evento.target.closest('a')) {
    definirMenuAberto(false);
  }
});

// Tecla Esc fecha o menu e devolve o foco ao botão
document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape' && menuEstaAberto()) {
    definirMenuAberto(false);
    botaoMenu.focus();
  }
});


// =====================================================
// 2. PROJETOS: dados (única fonte de conteúdo dos cards)
// =====================================================
const projetos = [
  {
    titulo: 'Drop-21 — Loja de Eletrônicos',
    tipo: 'Projeto pessoal',
    categorias: ['Web', 'Segurança'],
    problema: 'Lojas pequenas costumam usar um sistema para vender online e outro no balcão, o que deixa estoque e vendas desencontrados. O Drop-21 une e-commerce e PDV em um só sistema.',
    publico: 'Pequenas lojas que vendem pela internet e no balcão.',
    contribuicao: 'Projeto individual: modelei as regras de negócio, implementei o back-end em camadas (Controllers, Services, Repositories), configurei o login com Spring Security e BCrypt e fiz o front-end.',
    tecnologias: ['Java 21', 'Spring Boot', 'Spring Security', 'BCrypt', 'SQLite', 'Spring Data JPA', 'HTML5', 'CSS3', 'JavaScript'],
    imagem: 'img/projetos/drop21.jpg',
    descricaoImagem: 'Página inicial da loja Drop-21, com fundo preto, campo de busca e o número 21 em destaque.',
    links: [
      { texto: 'Ver site publicado', url: 'https://drop-21.vercel.app' }
    ]
  },
  {
    titulo: 'Sistema de Informações Meteorológicas',
    tipo: 'Projeto pessoal',
    categorias: ['Terminal', 'API'],
    problema: 'Consultar o clima de qualquer cidade de forma rápida, direto no terminal.',
    publico: 'Pessoas que já trabalham no terminal e querem uma consulta rápida, sem abrir o navegador.',
    contribuicao: 'Projeto individual: fiz a integração com uma API externa de clima e o tratamento das respostas em JSON para mostrar os dados em tempo real.',
    tecnologias: ['Java', 'API REST', 'JSON'],
    imagem: 'img/projetos/clima.svg',
    descricaoImagem: 'Ilustração de terminal consultando o clima de Salvador: 29 °C, umidade de 74% e tempo parcialmente nublado.',
    links: [
      { texto: 'Ver no GitHub', url: 'https://github.com/arthuralmeida-dev' }
    ]
  },
  {
    titulo: 'Gerador de Senhas Seguras',
    tipo: 'Projeto pessoal',
    categorias: ['Terminal', 'Segurança'],
    problema: 'Muitas pessoas reutilizam senhas fracas e fáceis de adivinhar.',
    publico: 'Qualquer pessoa que precise criar senhas fortes para suas contas.',
    contribuicao: 'Projeto individual: escrevi o algoritmo em Java que combina letras maiúsculas, minúsculas, números e símbolos de forma aleatória.',
    tecnologias: ['Java', 'Segurança'],
    imagem: 'img/projetos/senhas.svg',
    descricaoImagem: 'Ilustração de terminal mostrando uma senha gerada de 16 caracteres classificada como muito forte.',
    links: [
      { texto: 'Ver no GitHub', url: 'https://github.com/arthuralmeida-dev' }
    ]
  }
];


// =====================================================
// 3. PROJETOS: criação dos cards e filtro
// =====================================================
const filtrosProjetos = document.getElementById('filtrosProjetos');
const listaProjetos = document.getElementById('listaProjetos');
const contagemProjetos = document.getElementById('contagemProjetos');
const semProjetos = document.getElementById('semProjetos');

const CATEGORIA_TODOS = 'Todos';

// Cria um parágrafo do tipo "Rótulo: texto" usando textContent (nunca innerHTML)
function criarParagrafoRotulado(rotulo, texto) {
  const paragrafo = document.createElement('p');
  const negrito = document.createElement('strong');
  negrito.textContent = `${rotulo}: `;
  paragrafo.append(negrito, texto);
  return paragrafo;
}

function criarCardProjeto(projeto) {
  const card = document.createElement('article');
  card.className = 'card';

  const imagem = document.createElement('img');
  imagem.className = 'card-imagem';
  imagem.src = projeto.imagem;
  imagem.alt = projeto.descricaoImagem;
  imagem.width = 640;
  imagem.height = 360;

  const corpo = document.createElement('div');
  corpo.className = 'card-corpo';

  const tipo = document.createElement('p');
  tipo.className = 'card-tipo';
  tipo.textContent = projeto.tipo;

  const titulo = document.createElement('h3');
  titulo.textContent = projeto.titulo;

  const tags = document.createElement('ul');
  tags.className = 'tags';
  tags.setAttribute('aria-label', 'Tecnologias');
  projeto.tecnologias.forEach((tecnologia) => {
    const item = document.createElement('li');
    item.textContent = tecnologia;
    tags.append(item);
  });

  const links = document.createElement('div');
  links.className = 'card-links';
  projeto.links.forEach((dadosLink) => {
    const link = document.createElement('a');
    link.href = dadosLink.url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = `${dadosLink.texto} →`;
    links.append(link);
  });

  corpo.append(
    tipo,
    titulo,
    criarParagrafoRotulado('Problema', projeto.problema),
    criarParagrafoRotulado('Público', projeto.publico),
    criarParagrafoRotulado('Minha contribuição', projeto.contribuicao),
    tags,
    links
  );
  card.append(imagem, corpo);
  return card;
}

function filtrarProjetos(categoria) {
  if (categoria === CATEGORIA_TODOS) {
    return projetos;
  }
  return projetos.filter((projeto) => projeto.categorias.includes(categoria));
}

function textoContagem(quantidade, categoria) {
  const palavra = quantidade === 1 ? 'projeto encontrado' : 'projetos encontrados';
  const onde = categoria === CATEGORIA_TODOS ? '' : ` em "${categoria}"`;
  return `${quantidade} ${palavra}${onde}`;
}

function marcarFiltroAtivo(categoria) {
  filtrosProjetos.querySelectorAll('.filtro').forEach((botao) => {
    const ativo = botao.dataset.categoria === categoria;
    botao.setAttribute('aria-pressed', String(ativo));
  });
}

function mostrarProjetos(categoria) {
  const encontrados = filtrarProjetos(categoria);
  // replaceChildren apaga os cards antigos antes de colocar os novos: nunca duplica
  listaProjetos.replaceChildren(...encontrados.map(criarCardProjeto));
  contagemProjetos.textContent = textoContagem(encontrados.length, categoria);
  semProjetos.hidden = encontrados.length > 0;
  marcarFiltroAtivo(categoria);
}

// Os botões do filtro são gerados a partir das categorias dos projetos
function criarBotoesFiltro() {
  const categorias = [CATEGORIA_TODOS, ...new Set(projetos.flatMap((projeto) => projeto.categorias))];
  categorias.forEach((categoria) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'filtro';
    botao.dataset.categoria = categoria;
    botao.textContent = categoria;
    botao.setAttribute('aria-pressed', 'false');
    filtrosProjetos.append(botao);
  });
}

filtrosProjetos.addEventListener('click', (evento) => {
  const botao = evento.target.closest('.filtro');
  if (botao) {
    mostrarProjetos(botao.dataset.categoria);
  }
});

criarBotoesFiltro();
mostrarProjetos(CATEGORIA_TODOS);


// =====================================================
// 4. ANIMAÇÃO AO ROLAR A PÁGINA
// =====================================================
const elementosRevelar = document.querySelectorAll('.revelar');

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visivel');
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.1 });

elementosRevelar.forEach((elemento) => observador.observe(elemento));


// =====================================================
// 5. FORMULÁRIO: seleção dos elementos
// =====================================================
const formulario = document.getElementById('formContato');
const campos = {
  nome: document.getElementById('nome'),
  email: document.getElementById('email'),
  motivo: document.getElementById('motivo'),
  assunto: document.getElementById('assunto'),
  mensagem: document.getElementById('mensagem')
};
const blocoAssunto = document.getElementById('campoAssunto');
const contadorMensagem = document.getElementById('mensagem-contador');
const resumoErros = document.getElementById('resumoErros');
const listaErros = document.getElementById('listaErros');
const botaoEnviar = document.getElementById('botaoEnviar');
const statusEnvio = document.getElementById('statusEnvio');

const LIMITES = {
  nome: { min: 3, max: 80 },
  assunto: { min: 5, max: 100 },
  mensagem: { min: 30, max: 1000 }
};

const camposUsados = new Set(); // campos que o visitante já preencheu e saiu
let tentouEnviar = false;
let enviando = false;


// =====================================================
// 6. FORMULÁRIO: leitura e normalização dos dados
// =====================================================

// Critério ÚNICO de contagem: tamanho do texto sem espaços nas pontas.
// Usado tanto no contador quanto na validação.
function contarCaracteres(texto) {
  return texto.trim().length;
}

function assuntoSeAplica() {
  return campos.motivo.value === 'outro';
}

// trim() só nas pontas; o conteúdo interno da mensagem não é alterado
function lerDados() {
  const dados = {
    nome: campos.nome.value.trim(),
    email: campos.email.value.trim(),
    motivo: campos.motivo.value,
    mensagem: campos.mensagem.value.trim()
  };
  if (assuntoSeAplica()) {
    dados.assunto = campos.assunto.value.trim();
  }
  return dados;
}


// =====================================================
// 7. FORMULÁRIO: regras de validação
// Cada função devolve a mensagem de erro, ou '' se estiver tudo certo.
// =====================================================
function validarTamanho(texto, limite, rotulo) {
  const total = contarCaracteres(texto);
  if (total === 0) {
    return `Preencha o campo ${rotulo}.`;
  }
  if (total < limite.min) {
    return `O campo ${rotulo} precisa ter pelo menos ${limite.min} caracteres (agora tem ${total}).`;
  }
  if (total > limite.max) {
    return `O campo ${rotulo} pode ter no máximo ${limite.max} caracteres (agora tem ${total}).`;
  }
  return '';
}

const validadores = {
  nome: () => validarTamanho(campos.nome.value, LIMITES.nome, 'Nome'),

  email: () => {
    if (campos.email.value.trim() === '') {
      return 'Preencha o campo E-mail.';
    }
    if (campos.email.validity.typeMismatch) {
      return 'Digite um e-mail em formato válido, como nome@exemplo.com.';
    }
    return '';
  },

  motivo: () => (campos.motivo.value === '' ? 'Escolha um motivo de contato.' : ''),

  assunto: () => (assuntoSeAplica()
    ? validarTamanho(campos.assunto.value, LIMITES.assunto, 'Assunto')
    : ''),

  mensagem: () => validarTamanho(campos.mensagem.value, LIMITES.mensagem, 'Mensagem')
};

// Campos que participam da validação agora (assunto só quando o motivo é "Outro")
function camposAtivos() {
  return Object.keys(validadores).filter((nome) => nome !== 'assunto' || assuntoSeAplica());
}


// =====================================================
// 8. FORMULÁRIO: apresentação de erros e status
// =====================================================
function mostrarErroCampo(nomeCampo, mensagem) {
  const campo = campos[nomeCampo];
  document.getElementById(`${nomeCampo}-erro`).textContent = mensagem;
  if (mensagem) {
    campo.setAttribute('aria-invalid', 'true');
  } else {
    campo.removeAttribute('aria-invalid');
  }
}

function validarCampo(nomeCampo) {
  const mensagem = validadores[nomeCampo]();
  mostrarErroCampo(nomeCampo, mensagem);
  return mensagem;
}

function validarFormulario() {
  const erros = [];
  camposAtivos().forEach((nomeCampo) => {
    const mensagem = validarCampo(nomeCampo);
    if (mensagem) {
      erros.push({ nomeCampo, mensagem });
    }
  });
  return erros;
}

function mostrarResumoErros(erros) {
  listaErros.replaceChildren();
  erros.forEach((erro) => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${erro.nomeCampo}`;
    link.textContent = erro.mensagem;
    item.append(link);
    listaErros.append(item);
  });
  resumoErros.hidden = erros.length === 0;
}

function mostrarStatus(tipo, texto) {
  statusEnvio.className = `status status-${tipo}`;
  statusEnvio.textContent = texto;
}

function limparStatus() {
  statusEnvio.className = 'status';
  statusEnvio.textContent = '';
}

function atualizarContador() {
  const total = contarCaracteres(campos.mensagem.value);
  contadorMensagem.textContent = `${total} de ${LIMITES.mensagem.max} caracteres`;
}

// Mostra/esconde o assunto e tira ele da validação quando não se aplica
function atualizarAssunto() {
  const aplica = assuntoSeAplica();
  blocoAssunto.hidden = !aplica;
  campos.assunto.disabled = !aplica;
  campos.assunto.required = aplica;
  if (!aplica) {
    mostrarErroCampo('assunto', '');
    camposUsados.delete('assunto');
  }
}


// =====================================================
// 9. FORMULÁRIO: processamento do envio
// =====================================================

// Envio de DEMONSTRAÇÃO: nenhum e-mail é enviado.
// Resolve ou rejeita conforme o controle "Resultado da demonstração".
function enviarDemonstracao(dados, resultadoEscolhido) {
  return new Promise((resolver, rejeitar) => {
    setTimeout(() => {
      if (resultadoEscolhido === 'falha') {
        rejeitar(new Error('Falha simulada.'));
      } else {
        resolver(dados);
      }
    }, 1500);
  });
}

function definirEnviando(valor) {
  enviando = valor;
  botaoEnviar.disabled = valor;
  botaoEnviar.textContent = valor ? 'Enviando...' : 'Enviar mensagem';
  formulario.setAttribute('aria-busy', String(valor));
}

function limparFormulario() {
  formulario.reset();
  camposUsados.clear();
  tentouEnviar = false;
  atualizarAssunto();
  atualizarContador();
  mostrarResumoErros([]);
}

async function aoEnviarFormulario(evento) {
  evento.preventDefault();

  // Já existe um envio em andamento: ignora cliques repetidos
  if (enviando) {
    return;
  }

  tentouEnviar = true;
  const erros = validarFormulario();
  mostrarResumoErros(erros);

  if (erros.length > 0) {
    mostrarStatus('erro', `Erro: ${erros.length} campo(s) precisam de correção.`);
    campos[erros[0].nomeCampo].focus();
    return;
  }

  const dados = lerDados();
  const resultadoEscolhido = formulario.querySelector('input[name="resultadoDemo"]:checked').value;

  definirEnviando(true);
  mostrarStatus('processando', 'Enviando sua mensagem...');

  try {
    await enviarDemonstracao(dados, resultadoEscolhido);
    limparFormulario();
    mostrarStatus('sucesso', 'Sucesso: mensagem recebida! (Demonstração: nenhum e-mail foi enviado de verdade.)');
  } catch (erro) {
    mostrarStatus('falha', 'Falha: a mensagem não foi enviada. Seus dados foram mantidos; tente novamente.');
  } finally {
    definirEnviando(false);
  }
}

// Ao digitar: atualiza contador/assunto, apaga status antigo e revalida
function aoEditarCampo(nomeCampo) {
  if (!enviando) {
    limparStatus();
  }
  if (nomeCampo === 'mensagem') {
    atualizarContador();
  }
  if (nomeCampo === 'motivo') {
    atualizarAssunto();
  }
  if (tentouEnviar) {
    mostrarResumoErros(validarFormulario());
  } else if (camposUsados.has(nomeCampo)) {
    validarCampo(nomeCampo);
  }
}

// Ao sair de um campo preenchido: passa a validar esse campo
function aoSairDoCampo(nomeCampo) {
  if (campos[nomeCampo].value !== '') {
    camposUsados.add(nomeCampo);
  }
  if (camposUsados.has(nomeCampo)) {
    validarCampo(nomeCampo);
  }
}

Object.keys(campos).forEach((nomeCampo) => {
  campos[nomeCampo].addEventListener('input', () => aoEditarCampo(nomeCampo));
  campos[nomeCampo].addEventListener('blur', () => aoSairDoCampo(nomeCampo));
});

formulario.addEventListener('submit', aoEnviarFormulario);
atualizarContador();
