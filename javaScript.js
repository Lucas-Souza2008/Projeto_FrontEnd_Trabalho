const cartas = [
  { nome: 'macaco', img: 'Imagens_Trabalho_JogoMemoria/3513751-ilustracao-desenho-desenho-arvore-macaco-bonito-pendurado-gratis-vetor.jpg' },
  { nome: 'macaco', img: 'Imagens_Trabalho_JogoMemoria/3513751-ilustracao-desenho-desenho-arvore-macaco-bonito-pendurado-gratis-vetor.jpg' },
  { nome: 'tigre', img: 'Imagens_Trabalho_JogoMemoria/5151726-desenho-tigre-isolado-em-fundo-branco-gratis-vetor.jpg' },
  { nome: 'tigre', img: 'Imagens_Trabalho_JogoMemoria/5151726-desenho-tigre-isolado-em-fundo-branco-gratis-vetor.jpg' },
  { nome: 'leao', img: 'Imagens_Trabalho_JogoMemoria/14762647-ilustracaoial-de-um-leao-em-um-estilo-bonito-de-desenho-animado-gratis-vetor.jpg' },
  { nome: 'leao', img: 'Imagens_Trabalho_JogoMemoria/14762647-ilustracaoial-de-um-leao-em-um-estilo-bonito-de-desenho-animado-gratis-vetor.jpg' },
  { nome: 'esquilo', img: 'Imagens_Trabalho_JogoMemoria/28312973-fofa-esquilo-desenho-animado-em-branco-fundo-gratis-vetor.jpg' },
  { nome: 'esquilo', img: 'Imagens_Trabalho_JogoMemoria/28312973-fofa-esquilo-desenho-animado-em-branco-fundo-gratis-vetor.jpg' },
  { nome: 'jacare', img: 'Imagens_Trabalho_JogoMemoria/48684852-desenho-animado-jacare-crocodilo-clipart-ilustracao-em-uma-branco-fundo-vetor.jpg' },
  { nome: 'jacare', img: 'Imagens_Trabalho_JogoMemoria/48684852-desenho-animado-jacare-crocodilo-clipart-ilustracao-em-uma-branco-fundo-vetor.jpg' },
  { nome: 'tartaruga', img: 'Imagens_Trabalho_JogoMemoria/49978943-uma-desenho-animado-tartaruga-com-grande-olhos-e-uma-grande-boca-gratis-vetor.jpg' },
  { nome: 'tartaruga', img: 'Imagens_Trabalho_JogoMemoria/49978943-uma-desenho-animado-tartaruga-com-grande-olhos-e-uma-grande-boca-gratis-vetor.jpg' },
];

let cartasViradas = [];
let nomesVirados = [];
let tentativas = 0;
let bloquearTabuleiro = false;

const tabuleiro = document.getElementById('tabuleiro');
const tentativaEl = document.getElementById('tentativas');
const btnReiniciar = document.getElementById('reiniciar');

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

function criarTabuleiro() {
  tabuleiro.innerHTML = '';
  const cartasEmbaralhadas = embaralhar([...cartas]);

  cartasEmbaralhadas.forEach(carta => {
    const cartaEl = document.createElement('div');
    cartaEl.classList.add('carta');
    cartaEl.dataset.nome = carta.nome;

    const frente = document.createElement('div');
    frente.classList.add('frente');

    const verso = document.createElement('div');
    verso.classList.add('verso');

    const imgEl = document.createElement('img');
    imgEl.src = carta.img;
    imgEl.alt = carta.nome;

    verso.appendChild(imgEl);
    cartaEl.appendChild(frente);
    cartaEl.appendChild(verso);

    cartaEl.addEventListener('click', virarCarta);
    tabuleiro.appendChild(cartaEl);
  });
}

function virarCarta() {
  if (bloquearTabuleiro) return;
  if (this.classList.contains('virada')) return;

  this.classList.add('virada');
  cartasViradas.push(this);
  nomesVirados.push(this.dataset.nome);

  if (cartasViradas.length === 2) {
    tentativas++;
    tentativaEl.textContent = tentativas;
    checarMatch();
  }
}

function checarMatch() {
  const [carta1, carta2] = cartasViradas;

  if (nomesVirados[0] === nomesVirados[1]) {
    cartasViradas = [];
    nomesVirados = [];
    verificaVitoria();
  } else {
    bloquearTabuleiro = true;
    setTimeout(() => {
      carta1.classList.remove('virada');
      carta2.classList.remove('virada');
      cartasViradas = [];
      nomesVirados = [];
      bloquearTabuleiro = false;
    }, 1000);
  }
}

function verificaVitoria() {
  const todas = document.querySelectorAll(".carta");
  const viradas = document.querySelectorAll(".carta.virada");

  if (todas.length === viradas.length) {
    setTimeout(() => {
      const mensagem = document.getElementById("mensagemVitoria");
      const tentativasFinal = document.getElementById("tentativasFinal");
      const titulo = mensagem.querySelector("h2");

      tentativasFinal.textContent = tentativas;

      // Mensagem dinâmica
      if (tentativas <= 10) {
        titulo.textContent = "🔥 Incrível! Você dominou o jogo!";
      } else if (tentativas <= 20) {
        titulo.textContent = "🎯 Excelente! Grande desempenho!";
      } else {
        titulo.textContent = "🎉 Parabéns, vitória conquistada!";
      }

      mensagem.classList.remove("oculto");
      confete();
    }, 1000);
  }
}

// Efeito de confete
function confete() {
  for (let i = 0; i < 100; i++) {
    const conf = document.createElement('div');
    conf.classList.add('confete');
    conf.style.left = Math.random() * 100 + 'vw';
    conf.style.animationDuration = 2 + Math.random() * 3 + 's';
    conf.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
    document.body.appendChild(conf);
    setTimeout(() => conf.remove(), 4000);
  }
}

// Botão "Jogar novamente"
document.getElementById('btnJogarNovamente').addEventListener('click', () => {
  const mensagem = document.getElementById('mensagemVitoria');
  mensagem.classList.add('oculto');
  cartasViradas = [];
  nomesVirados = [];
  tentativas = 0;
  tentativaEl.textContent = tentativas;
  bloquearTabuleiro = false;
  criarTabuleiro();
});

// Botão "Reiniciar"
btnReiniciar.addEventListener('click', () => {
  cartasViradas = [];
  nomesVirados = [];
  tentativas = 0;
  tentativaEl.textContent = tentativas;
  bloquearTabuleiro = false;
  criarTabuleiro();
});

// Inicializa o jogo
criarTabuleiro();
