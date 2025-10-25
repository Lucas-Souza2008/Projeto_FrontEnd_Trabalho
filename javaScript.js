const cartas = [
  { nome: 'gato', img: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' },
  { nome: 'gato', img: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' },
  { nome: 'cachorro', img: 'https://cdn-icons-png.flaticon.com/512/616/6164081.png' },
  { nome: 'cachorro', img: 'https://cdn-icons-png.flaticon.com/512/616/6164081.png' },
  { nome: 'panda', img: 'https://cdn-icons-png.flaticon.com/512/616/616554.png' },
  { nome: 'panda', img: 'https://cdn-icons-png.flaticon.com/512/616/616554.png' },
  { nome: 'tigre', img: 'https://cdn-icons-png.flaticon.com/512/616/6164082.png' },
  { nome: 'tigre', img: 'https://cdn-icons-png.flaticon.com/512/616/6164082.png' },
  { nome: 'raposa', img: 'https://cdn-icons-png.flaticon.com/512/616/6164084.png' },
  { nome: 'raposa', img: 'https://cdn-icons-png.flaticon.com/512/616/6164084.png' },
  { nome: 'urso', img: 'https://cdn-icons-png.flaticon.com/512/616/6165544.png' },
  { nome: 'urso', img: 'https://cdn-icons-png.flaticon.com/512/616/6165544.png' }
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
