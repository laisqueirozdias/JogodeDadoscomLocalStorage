const Botton01 = document.getElementById("botao01");
const text01 = document.getElementById("texto01");
const Botton02 = document.getElementById("botao02");
const text02 = document.getElementById("texto02");
const resultado = document.getElementById("resultado");
const btreiniciar = document.getElementById("reiniciar");
let rodada = 0;
let vitoriadado01 = 0;
let vitoriadado02 = 0;
let dado01 = null;
let dado02 = null;

document.addEventListener("DOMContentLoaded", function () {
  const savedState = localStorage.getItem("gameState");
  if (savedState) {
    const gameState = JSON.parse(savedState);
    rodada = gameState.rodada;
    vitoriadado01 = gameState.vitoriadado01;
    vitoriadado02 = gameState.vitoriadado02;
    dado01 = gameState.dado01;
    dado02 = gameState.dado02;
    updateUI();
  }
});

function updateUI() {
  text01.innerHTML = dado01 ? dado01 : "Dado 01";
  text02.innerHTML = dado02 ? dado02 : "Dado 02";
  resultado.innerHTML = "";
  if (rodada === 10) {
    Botton01.disabled = true;
    Botton02.disabled = true;
    if (vitoriadado01 > vitoriadado02) {
      resultado.innerHTML = "Jogador 01 Ganhou ";
    } else if (vitoriadado02 > vitoriadado01) {
      resultado.innerHTML = "Jogador 02 Ganhou ";
    } else {
      resultado.innerHTML = "Empate";
    }
  }
}

function saveState() {
  const gameState = {
    rodada: rodada,
    vitoriadado01: vitoriadado01,
    vitoriadado02: vitoriadado02,
    dado01: dado01,
    dado02: dado02
  };
  localStorage.setItem("gameState", JSON.stringify(gameState));
}

function reiniciar() {
  rodada = 0;
  vitoriadado01 = 0;
  vitoriadado02 = 0;
  dado01 = null;
  dado02 = null;
  Botton01.disabled = false;
  Botton02.disabled = true;
  updateUI();
  saveState();
}

function btJogarDado01() {
  dado01 = Math.floor(Math.random() * 6) + 1;
  Botton02.disabled = false;
  Botton01.disabled = true;
  updateUI();
  saveState();
}

function btJogarDado02() {
  dado02 = Math.floor(Math.random() * 6) + 1;
  Botton01.disabled = false;
  Botton02.disabled = true;
  rodada++;
  if (dado01 > dado02) {
    vitoriadado01++;
    resultado.innerHTML = "Jogador 01 Ganhou a Rodada " + rodada;
  } else if (dado01 < dado02) {
    vitoriadado02++;
    resultado.innerHTML = "Jogador 02 Ganhou a Rodada " + rodada;
  } else {
    resultado.innerHTML = "Empate";
  }
  updateUI();
  saveState();
}

Botton01.onclick = btJogarDado01;
Botton02.onclick = btJogarDado02;
btreiniciar.onclick = reiniciar;
