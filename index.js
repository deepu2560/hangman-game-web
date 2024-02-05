import {word_list} from "./words.js"
var choosen_word = chooseWord();
console.log(choosen_word)

function chooseWord(){
    let randint = Math.floor(Math.random()*word_list.length)
    console.log(word_list.length,randint, word_list[randint])
    return word_list[randint]
}