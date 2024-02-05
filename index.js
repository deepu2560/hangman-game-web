import {word_list} from "./words.js";
import {drawMan, canvasCreator} from "./draw.js";
const {initialDrawing} = canvasCreator()

var choosen_word = chooseWord();
var ans_letters = new Array(choosen_word.length).fill("_");
var lives = 6;

handleGuessedLetterDisplay();
initialDrawing();

document.querySelectorAll(".custom_keyboard").forEach(element => element.addEventListener("click", function(event) {
    handleKeyPress(event.target.innerText.toLowerCase())
}))

function chooseWord(){
    let randint = Math.floor(Math.random()*word_list.length)
    return word_list[randint].toLowerCase().split("")
}

function handleKeyPress(key) {
    if(lives == 0){
        console.log("You Lost");
        handleGameOver(false);
        return;
    }

    if (choosen_word.includes(key)){
        for (let index = 0; index < choosen_word.length; index++) {
            if (key == choosen_word[index]){
                ans_letters[index] = key;
                handleGuessedLetterDisplay();
            }
        }
    } else{
        lives--;
        handleLivesLost()
    }
    
    if(!ans_letters.includes("_")){
        console.log("You Won");
        handleGameOver(true);
        return;
    }
}

function handleLivesLost(){
    document.getElementById("remaining_lives_display").innerText = `Your remaining lives: ${lives}`;
    drawMan(lives);
}

function handleGuessedLetterDisplay() {
    const temp = ans_letters.join(" ");
    document.getElementById("guessed_letter_display").innerText = temp;
}

function handleGameOver(status){
    const body = document.body;

    let mainDiv=document.createElement("div");
            mainDiv.id = "game_over_modal_container";
    let modal = document.createElement("div");
    let gameOverHeading = document.createElement("h3");
        gameOverHeading.innerText = "Game Over";
    let gameStatus = document.createElement("p");
            gameStatus.innerText = status?"You Won. Want to play again ?":"You Lost. Want to play again ?";
    let gameWord = document.createElement("p");
            gameWord.innerText = `Word was: ${choosen_word.join("")}`
    let restartButton = document.createElement("button");
            restartButton.innerText = "Restart Game"
            restartButton.addEventListener("click", function(){
                window.location.reload();
            });

    modal.append(gameOverHeading, gameStatus, gameWord, restartButton);
    mainDiv.appendChild(modal);
    
    body.appendChild(mainDiv);
}


