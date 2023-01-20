
const celulas = document.getElementsByTagName("td");
const linhas = document.getElementsByTagName("tr");
const tecladoSudoku = document.getElementById("teclado-sudoku");
var idCelulaSelecionada = "cel-00";


for (var i = 0; i < 9; i++) {
    linhas[i].setAttribute("id",`linha${i}`);
    for (var a = 0; a < 9; a++) {
        celulas[(i*9)+a].classList.add(`l${i}`);
        celulas[(i*9)+a].classList.add(`quad-${quadrante(i, a)}`);
        celulas[(i*9)+a].classList.add(`c${a}`);
        celulas[(i*9)+a].setAttribute("id", `cel-${i}${a}`);
        celulas[(i*9)+a].addEventListener("click", marcarCelula);
        celulas[(i*9)+a].addEventListener("change", alterarValorBotao);
    }
}

document.getElementById(idCelulaSelecionada).classList.add("selecionado");

function alterarValorBotao() {
    console.log("Mudou");
}

function selecionarCelula(id) {
    if (id != idCelulaSelecionada) {
        document.getElementById(id).classList.add("selecionado");
        document.getElementById(idCelulaSelecionada).classList.remove("selecionado");
        idCelulaSelecionada = id;
    }
}

function marcarCelula(evento) {
    selecionarCelula(evento.target.id);
}

function quadrante(lin, col) {
    return (Math.floor(col/3) + Math.floor(lin/3)*3);
}

const moverParaCima = () => {
    var linha = Number(idCelulaSelecionada.slice(-2, -1));
    if (linha > 0) {
        linha -= 1;
        selecionarCelula(`cel-${linha}${idCelulaSelecionada.slice(-1)}`);
    }
}
const moverParaBaixo = () => {
    var linha = Number(idCelulaSelecionada.slice(-2, -1));
    if (linha < 8) {
        linha += 1;
        selecionarCelula(`cel-${linha}${idCelulaSelecionada.slice(-1)}`);
    }    
}
const moverParaDireita = () => {
    var coluna = Number(idCelulaSelecionada.slice(-1));
    if (coluna < 8) {
        coluna += 1;
        selecionarCelula(`cel-${idCelulaSelecionada.slice(-2, -1)}${coluna}`);
    }
}
const moverParaEsquerda = () => {
    var coluna = Number(idCelulaSelecionada.slice(-1));
    if (coluna > 0) {
        coluna -= 1;
        selecionarCelula(`cel-${idCelulaSelecionada.slice(-2, -1)}${coluna}`);
    }
}

const digitarNumero = (numero) => {
    document.getElementById(idCelulaSelecionada).innerHTML = numero;
}

const apagarNumero = () => {
    document.getElementById(idCelulaSelecionada).innerHTML = "";
}

const verificarTecla = (evento) => {
    if (evento.key.startsWith("Arrow")) {
        switch(evento.key) {
            case "ArrowUp": moverParaCima(); break;
            case "ArrowDown": moverParaBaixo(); break;
            case "ArrowRight": moverParaDireita(); break;
            case "ArrowLeft": moverParaEsquerda(); break;
        }
    } else if (Number(evento.key)) {
        digitarNumero(Number(evento.key));
    } else if (evento.key == "Backspace") {
        apagarNumero();
    }
}

const verificarTeclado = (evento) => {
    if (Number(evento.target.innerHTML)) {
        digitarNumero(Number(evento.target.innerHTML));
    }
}

document.getElementById("btn-apagar").addEventListener("click", apagarNumero);
tecladoSudoku.addEventListener("click", verificarTeclado);
window.addEventListener("keydown", verificarTecla);
