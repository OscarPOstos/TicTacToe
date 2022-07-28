let squares = document.querySelectorAll(".square");
let square_state = new Array(9);
let turn = 1;
let hasCPU = true, hasWin = false;
let completeSquares = 0;
let CPUPlayer1Score = 0, CPUPlayer2Score = 0, 
TwoPlayer1Score = 0, TwoPlayer2Score = 0, CPUTies = 0, TwoTies = 0;

squares.forEach(
    (value, key) => value.addEventListener("click", function () { clickSquare(value, key) })
);

document.getElementById("cpu_button").addEventListener("click", function () { changeScore(true) });
document.getElementById("two_button").addEventListener("click", function () { changeScore(false) });

/**

 * Comprueba la celda escogida por el jugador actual y procesa esa decision

 * @param {boolean} value Es la casilla escogida
 * @param {key} key Es el indice de la casilla escogida

*/
function clickSquare(value, key) {
    if(square_state[key] == null && !hasWin && completeSquares != 9) {
        value.innerHTML = (turn == 1) ? "X" : "O"; 
        value.style.color = (turn == 1) ? "red" : "rgb(0, 225, 255)";
        value.style.textShadow = (turn == 1) ? "0px 0px 10px red" : "0px 0px 10px rgb(0, 225, 255)";
        value.style.fontSize = (window.innerWidth > 500) ? "90px" : "40px";
        square_state[key] = turn;
        completeSquares++;
        hasWin = checkWin(key,false);
        if(completeSquares == 9 && !hasWin) {
            document.getElementById("tie").innerHTML = (hasCPU) ? ++CPUTies : TwoTies;
        }
        if(hasWin) {
            addScore();
        }
        turn = (turn == 1) ? 2 : 1
        if(turn == 2 && hasCPU && completeSquares != 9) {
            enemyChoice();
        }
    } else if(hasWin || completeSquares == 9) {
        resetSquare();
    }
}

/**

 * Dependiendo del boton que hayas pulsado, aparte de reiniciar, te puede
 * colocar contra una CPU o un segundo jugador dependiendo de lo que hayas
 * escogido

 * @param {boolean} isCPU Se comprueba si el segundo jugador es un CPU o no

*/

function changeScore(isCPU) {
    resetSquare();
    hasCPU = isCPU;
    if(hasCPU) {
        document.getElementById("j1").innerHTML = CPUPlayer1Score;
        document.getElementById("j2").innerHTML = CPUPlayer2Score;
        document.getElementById("tie").innerHTML = CPUTies;
    } else {
        document.getElementById("j1").innerHTML = TwoPlayer1Score;
        document.getElementById("j2").innerHTML = TwoPlayer2Score;
        document.getElementById("tie").innerHTML = TwoTies;
    }
}

/**

 * Añade su respectiva puntuacion al ganador del juego

*/

function addScore() {
    if(turn == 1 && hasCPU) {
        CPUPlayer1Score++;
        document.getElementById("j1").innerHTML = CPUPlayer1Score;
    } else if(turn == 2 && hasCPU) {
        CPUPlayer2Score++;
        document.getElementById("j2").innerHTML = CPUPlayer2Score;
    } else if(turn == 1 && !hasCPU) {
        TwoPlayer1Score++;
        document.getElementById("j1").innerHTML = TwoPlayer1Score;
    } else {
        TwoPlayer2Score++;
        document.getElementById("j2").innerHTML = TwoPlayer2Score;
    }
}

/**

 * Reinicia el tablero a su estado inicial

*/

function resetSquare() {
    squares.forEach(
        value => {value.innerHTML = "";
        value.style.color = "white";
        value.style.textShadow = "none";
        value.style.fontSize = "0px";}
    );
    for(let i = 0;i<9;i++) {
        square_state[i] = null;
    }
    completeSquares = 0;
    hasWin = false;
    if(turn == 2 && hasCPU) {
        enemyChoice();
    }
}

/**

 * Revisa si hay una linea completa ganadora

 * @param {boolean} CPUThinking Dice si es producto del pensamiento de la IA
 * o no.

 * @return Devuelve true si el jugador actual hizo una linea de 3 completa y false si no.

*/

function checkWin(square_number, CPUThinking) {
    return checkHorizontalLine(Math.floor(square_number / 3), CPUThinking) || 
    checkVerticalLine(square_number % 3,CPUThinking)
    || checkDiagonalLine(CPUThinking);
}

/**

 * Revisa si hay una linea horizontal completa

 * @param {boolean} CPUThinking Dice si es producto del pensamiento de la IA
 * o no.

 * @return Devuelve true si el jugador actual hizo una linea horizontal y false si no.

*/

function checkHorizontalLine(row,CPUThinking) {
    let hasLine = square_state[row * 3] == square_state[row * 3 + 1] && 
    square_state[row * 3] == square_state[row * 3 + 2] && 
    square_state[row * 3] != null;
    if(hasLine && !CPUThinking) {
        squares[row * 3].style.color = "white";
        squares[row * 3 + 1].style.color = "white";
        squares[row * 3 + 2].style.color = "white";
    }
    return hasLine;
}

/**

 * Revisa si hay una linea vertical completa

 * @param {boolean} CPUThinking Dice si es producto del pensamiento de la IA
 * o no.

 * @return Devuelve true si el jugador actual hizo una linea vertical y false si no.

*/

function checkVerticalLine(column,CPUThinking) {
    let hasLine = square_state[column] == square_state[column + 3] && 
    square_state[column] == square_state[column + 6] && 
    square_state[column] != null;
    if(hasLine && !CPUThinking) {
        squares[column].style.color = "white";
        squares[column + 3].style.color = "white";
        squares[column + 6].style.color = "white";
    }
    return hasLine;
}

/**

 * Revisa si hay una linea diagonal completa

 * @param {boolean} CPUThinking Dice si es producto del pensamiento de la IA
 * o no.

 * @return Devuelve true si el jugador actual hizo una linea diagonal y false si no.

*/

function checkDiagonalLine(CPUThinking) {
    let hasNormalDiagonal = square_state[0] == square_state[4] && 
    square_state[0] == square_state[8] && 
    square_state[0] != null;
    let hasInverseDiagonal = square_state[2] == square_state[4] && 
    square_state[2] == square_state[6] && 
    square_state[2] != null
    if(hasNormalDiagonal && !CPUThinking) {
        squares[0].style.color = "white";
        squares[4].style.color = "white";
        squares[8].style.color = "white";
    }
    if(hasInverseDiagonal && !CPUThinking) {
        squares[2].style.color = "white";
        squares[4].style.color = "white";
        squares[6].style.color = "white";
    }
    return hasNormalDiagonal || hasInverseDiagonal;
}

/**

 * Se encarga de seleccionar cada una de las casillas libres 
 * y esperar el resultado de cada elección y escoge la mejor casilla
 * a su favor


*/

function enemyChoice() {
    let best = 0;
    let bestScore = -1000;
    let score;
    for (let i = 0; i < square_state.length; i++) {
        if (square_state[i] == null) {
            square_state[i] = turn;
            completeSquares++;
            score = bestChoice(i,0, bestScore, 1000);
            if (score > bestScore) {
                bestScore = score;
                best = i;
            }
            square_state[i] = null;
            completeSquares--;
        }
    }
    clickSquare(squares[best],best);
}

/**

 * Se encarga de procesar cada decision de la IA y las consecuencias de dicha decision

 * @param {int} cellNumber Celda seleccionada.
 * @param {int} argTurn Jugador que estaria mentalmente escogiendo
 * @param {int} alpha Resultado del primer jugador
 * @param {int} beta Resultado de la IA

 * @return Devuelve el resultado de la celda escogido ya sea victoria si es 1, 
    /* derrota si es - 1 o empate si es 0

*/

function bestChoice(cellNumber,argTurn,alpha, beta) {
    let score;
    if (checkWin(cellNumber,true)) {
        return argTurn == 2 ? -1 : 1;
    } else if (completeSquares == 9) {
        return 0;
    } else {
        for (let i = 0; i < square_state.length; i++) {
            if (square_state[i] == null) {
                square_state[i] = argTurn;
                completeSquares++;
                score = bestChoice(i,argTurn == 1 ? 2 : 1, alpha, beta);
                square_state[i] = null;
                completeSquares--;
                if (argTurn == 2) {
                    alpha = Math.max(alpha, score);
                    if (alpha >= beta) {
                        return beta;
                    }
                } else {
                    beta = Math.min(beta, score);
                    if (beta < alpha) {
                        return alpha;
                    }
                }
            }
        }
        if (argTurn == 2)
            return alpha;
        else
            return beta;
    }
}