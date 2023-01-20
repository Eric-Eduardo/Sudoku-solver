// var sudoku = [[0, 9, 6, 0, 0, 0, 1, 0, 0],
//               [0, 0, 4, 0, 0, 0, 6, 0, 0],
//               [0, 0, 0, 0, 0, 0, 5, 8, 3],
//               [2, 0, 7, 0, 0, 9, 0, 0, 0],
//               [0, 0, 0, 0, 6, 0, 0, 2, 0],
//               [0, 0, 0, 0, 0, 1, 0, 0, 8],
//               [6, 0, 0, 5, 3, 0, 0, 0, 0],
//               [0, 3, 0, 0, 0, 0, 0, 0, 0],
//               [0, 5, 0, 8, 0, 0, 0, 1, 0]];
var sudoku = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]];
var resolucaoPossivel = 1;

var error = document.getElementsByClassName("mensagem-erro")[0];
var closeErro = document.getElementsByClassName("icone-fechar")[0];

const btnSouve = document.getElementById("btn-solve");

const esconderErro = () => {
    error.style.transform = "translate(-50%, -40px)";
    error.style.visibility = "hidden";
    error.style.opacity = "0%";
}

closeErro.addEventListener("click", esconderErro);
btnSouve.addEventListener("click", resolverSudoku);

function getSudoku() { // Pega o sudoku da tela e atualiza o array
    for (var i = 0; i < 9; i++) {
        for (var a = 0; a < 9; a++) {
            sudoku[i][a] = Number(document.getElementById(`cel-${i}${a}`).innerHTML);
        }
    }
}

function setSudoku() { //Mostra o sudoku para o usuario
    for (var i = 0; i < 9; i++) {
        for (var a = 0; a < 9; a++) {
            sudoku[i][a] != 0 ? document.getElementById(`cel-${i}${a}`).innerHTML = sudoku[i][a] : document.getElementById(`cel-${i}${a}`).innerHTML = "";
        }
    }
}

function resolverSudoku() {
    getSudoku();
    if (sudokuValido()) {
        resolucaoPossivel = solve(sudoku, 0, 0);
        setSudoku();
    } else {
        error.style.transform = "translate(-50%, 0px)";
        error.style.visibility = "visible";
        error.style.opacity = "100%";
        setTimeout(esconderErro, 10000);
    }
}

function mostrarSudoku(sudok) {
    var linha = "";
    for (var i = 0; i < 9; i++) {
        for (var a = 0; a < 9; a++) {
            linha += sudok[i][a] + " ";
        }
        console.log(linha);
        linha = "";    
    }
    console.log("");
}

function quadrante(lin, col) {
    return (Math.floor(col/3) + Math.floor(lin/3)*3);
}

function existeLinCol(num, lin, col, jogo) {
    for (var i = 0; i < 9; i++) { // verifica linha
        if (jogo[lin][i] == num)
            return 1;
        if (jogo[i][col] == num) // veririfica coluna
            return 1;
    }

    return 0;
}

function existeNoQuadrante(num, lin, col, jogo) {
    //Quadrante é o conjunto de 9 casas do sudoku
    for (var i = 0; i < 9; i++) {
        for (var a = 0; a < 9; a++) {
            if (quadrante(i, a)==quadrante(lin, col) && jogo[i][a]==num) {
                return 1;
            }
        }
    }
    return 0;
}

function valido(num, lin, col, jogo) {
    if (existeNoQuadrante(num, lin, col, jogo) || existeLinCol(num, lin, col, jogo))
        return 0;
    else
        return 1;
}

function sudokuValido() {
    for (var i=0; i < 9; i ++) {
        for (var a=0; a < 9; a ++) {
            if (sudoku[i][a]!=0) {
                if (valido(sudoku[i][a], i, a, sudoku)==0){
                    return 0;
                }
            }
        }
    }
    return 1;
}

function solve(jogo, lin, col) {
    if (lin==8 && col==9) {
        return 1;
    } else if (col>8) {
        return solve(jogo, lin+1, 0);
    } else if (jogo[lin][col] != 0) {
        return solve(jogo, lin, col+1);
    } else {
        for (var i = 1; i <= 9; i++){
            if (valido(i, lin, col, jogo)) {
                jogo[lin][col] = i;
                if (solve(jogo, lin, col+1))
                    return 1;
                else 
                    jogo[lin][col] = 0;
            }
        }
        return 0;
    }
}

/*
function solve(jogo, lin, col) {
    if (lin==8 && col==9) {
        return 1;
    } else if (col>8) {
        return solve(jogo, lin+1, 0);
    } else if (jogo[lin][col] != 0) {
        return solve(jogo, lin, col+1);
    } else {
        for (var i = 1; i <= 9; i++){
            if (valido(i, lin, col, jogo)) {
                jogo[lin][col] = i;
                if (solve(jogo, lin, col+1))
                    return 1;
                else 
                    jogo[lin][col] = 0;
            }
        }
        return 0;
    }
}
*/
