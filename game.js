// Declaração de constantes
const arena = document.querySelector(".arena");
const Pontuacao = document.querySelector(".pontuação");
const Recorde = document.querySelector(".pontuação-recorde");

// Declaração de variáveis
let gameOver = false;
let cobraX = 5, cobraY = 10;
let corpoDaCobra = [];
let comidaX, comidaY;
let velocidadeX = 0, velocidadeY = 0;
let setIntervalID;
let pontuacao = 0;

let recorde = localStorage.getItem("pontuação-recorde") || 0;
Recorde.textContent = `Pontuação Recorde: ${recorde}`;

// Atribui um local aleatório para a comida
const mudarComida = () => {
    comidaX = Math.floor(Math.random() * 30) + 1;
    comidaY = Math.floor(Math.random() * 30) + 1;
}

const fimDeJogo = () => {
    clearInterval(setIntervalID);
    alert("Fim de Jogo! Clique em OK para rejogar!");
    location.reload(); 
}

// Função para ler as teclas e mudar a direção da cobrinha
const mudarDirecao = (event) => {
    if (event.key === "ArrowUp" && velocidadeY !== 1) {
        velocidadeX = 0;
        velocidadeY = -1;
    } else if (event.key === "ArrowDown" && velocidadeY !== -1) {
        velocidadeX = 0;
        velocidadeY = 1;
    } else if (event.key === "ArrowLeft" && velocidadeX !== 1) {
        velocidadeX = -1;
        velocidadeY = 0;
    } else if (event.key === "ArrowRight" && velocidadeX !== -1) {
        velocidadeX = 1;
        velocidadeY = 0;
    }
    iniciarJogo();
}

const iniciarJogo = () => {
    if(gameOver) return fimDeJogo();

    let htmlMarkup = `<div class="comida" style="grid-area: ${comidaY} / ${comidaX} "></div>`;

    // Colisão com a comida
    if (cobraX === comidaX && cobraY === comidaY) {
        mudarComida();
        corpoDaCobra.push([comidaX, comidaY]);
        pontuacao++;

        recorde = pontuacao >= recorde ? pontuacao : recorde;
        localStorage.setItem("pontuação-recorde", recorde);
        Pontuacao.textContent = `Pontuação: ${pontuacao}`;
        Recorde.textContent = `Pontuação Recorde: ${recorde}`;
    }

    for (let i = corpoDaCobra.length - 1; i > 0; i--) {
        //mudando o valor dos elementos no corpo
        corpoDaCobra[i] = corpoDaCobra[i - 1];
    }

    corpoDaCobra[0] = [cobraX, cobraY]; //Definindo primeiro elemento do corpo para a posição atual

    // Atualizando a velocidade da cobrinha com base na velocidade 
    cobraX += velocidadeX;
    cobraY += velocidadeY;

    if(cobraX <= 0 || cobraX > 30 || cobraY <= 0 || cobraY > 30){
        gameOver = true;
    }

    for (let i = 0; i < corpoDaCobra.length; i++) {
        // Adicionando uma div para cada parte do corpo da cobrinha
        htmlMarkup += `<div class="cabeça" style="grid-area: ${corpoDaCobra[i][1]} / ${corpoDaCobra[i][0]} "></div>`;
        // Colisão com o corpo
        if(i !== 0 && corpoDaCobra[0][1] === corpoDaCobra[i][1] && corpoDaCobra[0][0] === corpoDaCobra[i][0]){
            gameOver = true;
        }
    }
    arena.innerHTML = htmlMarkup;
}

mudarComida();
setIntervalID = setInterval(iniciarJogo, 125);
document.addEventListener("keydown", mudarDirecao);