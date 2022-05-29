let start = document.querySelector('.brand');
let ex = 10;
function swing(element) {

    function update(time) {
        
        const x = Math.sin(time / 1231) * ex;
        const y = Math.sin(time / 1458) * ex;

        element.style.transform = [
            `rotateX(${x}deg)`,
            `rotateY(${y}deg)`
        ].join(' ');

        requestAnimationFrame(update);
    }
    update(0); //love your nested functions
}

swing(start);


let start_button = start.querySelector('a');
let og_color = start_button.style.color;
let inter = 0;

start.addEventListener('mouseover', (e) => {
  
 ex = 20;  
 inter = setInterval(()=>{  
    start_button.style.color = '#'+Math.floor(Math.random()*16777215).toString(16); 
  }, 1000); 
  
});


start.addEventListener('mouseout', (e) => {
  
  ex = 10;
  clearInterval(inter);
  start_button.style.color = og_color; 
  
});

let level = 0;

function changeDifficulty(difficulty = 0) {
  level = difficulty;
  randomWords = [];
  
  if (level == 0){
    sessionStorage.setItem('difficulty', 'medium');
  } else if (level == 1) {
    sessionStorage.setItem('difficulty', 'easy');
  } else if (level == 2) {
    sessionStorage.setItem('difficulty', 'medium');
  } else if (level == 3) {
    sessionStorage.setItem('difficulty', 'hard');
  }
}
