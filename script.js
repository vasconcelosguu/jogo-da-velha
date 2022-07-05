const combinacoes =[
  [0,1,2], // linha 1
  [3,4,5], // linha 2
  [6,7,8], // linha 3
  [0,3,6], // coluna 1
  [1,4,7], // coluna 2
  [2,5,8], // coluna 3
  [0,4,8], // diagonal esqueda direita
  [2,4,6] // diagonal direita esquerda
]

const resetButton = document.querySelector('#reset');
const textoVez = document.querySelector('#player');

let player = 'X';

function generateDiv(number) {
  const pai = document.querySelector('div .grid');
  for (let i = 0; i < number; i += 1) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('celula');
    newDiv.id = i;
    newDiv.addEventListener('click', jogar);
    pai.appendChild(newDiv);
  }
}

generateDiv(9);

function jogar(event) {
  const quadrado = event.target;
  if (player === 'X') {
    if (quadrado.innerText === '') {
      textoVez.innerText = 'Vez do jogador O';
      quadrado.innerText = 'X';
      jogada('X');
      player = 'O';
      return;
    } else {
      alert('Quadrado já preenchido!')
    }
  }
  if (player === 'O') {
    if (quadrado.innerText === '') {
      textoVez.innerText = 'Vez do jogador X';
      quadrado.innerText = 'O';
      jogada('O');
      player = 'X';
      return;
    } else {
      alert('Quadrado já preenchido!')
    }
  }
}

function removeListener() {
  const divs = document.querySelectorAll('div .celula');
  for (const each of divs) {
    each.removeEventListener('click', jogar);
  }
}

function jogada(jogador) {
  const divs = document.querySelectorAll('div .celula');
  let ondeJogouJogador = [];
  for (let cada of divs) {
    if (cada.innerText === jogador) {
      ondeJogouJogador.push(parseInt(cada.id));
    }
  }
  let jogadaVencedora = [];
  let pontos = 0;
  
  for (let each of combinacoes) {
    pontos = 0;
    jogadaVencedora = each;
    for (let jogada of jogadaVencedora) {
      if (ondeJogouJogador.includes(jogada)) {
        pontos += 1;
        if (pontos >= 3) {
          textoVez.innerText = `Vitória do Jogador ${jogador}`;
          removeListener();
        }
      }
      else {
        checkEmpate();
      }
    }
  }
}

function checkEmpate() {
  const divs = document.querySelectorAll('div .celula');
  let checker = 0;
  for (const each of divs) {
    if (each.innerText === '') {
      checker += 1;
    }
  }
  if (checker === 0) {
    textoVez.innerText = 'Empate!';
  }
}

function reset() {
  const divs = document.querySelectorAll('div .celula');
  for (const each of divs) {
    each.innerText = '';
    each.addEventListener('click', jogar);
  }
  if (player === 'X') {
    textoVez.innerText = 'Vez do jogador X';
  }
  if (player === 'O') {
    textoVez.innerText = 'Vez do jogador O';
  }
}



resetButton.addEventListener('click', reset);