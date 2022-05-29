const wordE1 = document.getElementById('word');
const wrongLettersE1 = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts= document.querySelectorAll(".figure-part");

// Arrays of words for each difficulty
const wordseasy = ['bacon', 'apple', 'pear', 'kiwi', 'peach', 'mango', 'fig', 'plum'];
const wordsmedium = ['orange', 'banana', 'papaya', 'longan', 'pottery', 'cycling', 'laptop', 'wizard'];
const wordshard = ['application', 'programming', 'interface', 'automobile', 'raspberry', 'mandarine', 'development'];

const correctLetters = [];
const wrongLetters = [];

// Get difficulty from previous webpage. If none selected, difficulty is medium
var difficulty = sessionStorage.getItem('difficulty');
var selectedWord;

// Assigning words according to difficulty level
if (difficulty == 'easy'){
    selectedWord = wordseasy[Math.floor(Math.random() * wordseasy.length)];
} else if (difficulty == 'medium') {
    selectedWord = wordsmedium[Math.floor(Math.random() * wordsmedium.length)];
} else if (difficulty == 'hard') {
    selectedWord = wordshard[Math.floor(Math.random() * wordshard.length)];
}

//Show hidden word
function displayWord(){
    wordE1.innerHTML = `
    ${selectedWord
    .split('')
    .map(
        letter =>`
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `
    )
    .join('')}
    `;

    const innerWord = wordE1.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord){
        finalMessage.innerText = 'Congratulations! You won! 😃';
        popup.style.display= 'flex';
    }
}

// Update the wrong letters
function updateWrongLetterE1(){
    //Display wrong letters
    wrongLettersE1.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    //Display parts
    figureParts.forEach((part,index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block'
        }
        else{
            part.style.display = 'none';
        }
    });

    //Check if lost
    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = 'Unfortunately you lost. 😕';
        popup.style.display = 'flex';
    }
}

//Show notification
function showNotification(){
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

//Keydown letter press
window.addEventListener('keydown', e =>{
    if(e.keyCode >= 65 && e.keyCode <=90){
        const letter = e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);

                displayWord();
            } else{
                showNotification();
            }
        } else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);

                updateWrongLetterE1();
            } else{
                showNotification();
            }
        }
    }
});

//Restart game and play again
playAgainBtn.addEventListener('click', () => {
    //Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);
    
    if (difficulty == 'easy'){
        selectedWord = wordseasy[Math.floor(Math.random() * wordseasy.length)];
    } else if (difficulty == 'medium') {
        selectedWord = wordsmedium[Math.floor(Math.random() * wordsmedium.length)];
    } else if (difficulty == 'hard') {
        selectedWord = wordshard[Math.floor(Math.random() * wordshard.length)];
    }

    displayWord();

    updateWrongLetterE1();

    popup.style.display = 'none';
});

displayWord();
