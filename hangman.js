var defeat = false;
var except_chars = "1234567890./,;'*[]=-+`".split("");
var word = document.getElementsByClassName("word")[0];
var selectedWord = words[Math.floor((Math.random()*500))];
var hangMan = document.getElementById("hg-img");
var board = document.getElementById("result-board")
var attempts = 0;
var falseAttempts = 1;
var usedLetters = [];
var letterListBeta = selectedWord.split("");
let j = -1;
var trueChArray = [];
var letterList = letterListBeta.map(function (element) {
  j++;
  return element + j;
});
var letterObj = {};
letterList.forEach((element) => {
  let h2elem = document.createElement("h2");
  h2elem.setAttribute("class", "default");
  let elemIndex = letterList.indexOf(element);
  word.appendChild(h2elem);
  h2elem.style.width = String(Math.round(80 / letterList.length)) + "%";
  letterObj[element] = h2elem;
});
document.addEventListener("keydown", function(e){Play(e, true)});
function Play(event, prevent) {
  if(prevent){event.preventDefault()};
  if(event.key[1]){
    return null;
  }else if(!(except_chars.indexOf(event.key)==-1)){
    return null;
  }
  if(!defeat){
  let flag = false;
  letterList.forEach((element) => {
    if (event.key == element[0]) {
      let h2correct = letterObj[element];
      h2correct.innerHTML = element[0].toUpperCase();
      h2correct.classList.add("True");
      if(!prevent){
        let Btn = document.getElementById(event.key.toUpperCase());
        Btn.style.background = "lightgreen";
        Btn.setAttribute("disabled", "disabled");
      }
      if(trueChArray.indexOf(element)==-1){
        trueChArray.push(element)
      }
      flag = true;
    }
  });
  if(trueChArray.length == selectedWord.length){
    var win = true;
  }
  if(win){
    Swal.fire({
      type:'success',
      title: 'You Saved The Man!',
      text:"You Guessed The Word Correctly. Congratulations!",
      confirmButtonText: 'Play Again!',
    })
    var playAgain = document.getElementsByClassName("swal2-confirm swal2-styled")[0];
    playAgain.addEventListener("click", function(){location.reload()});
    return null;
  };
  if (!flag && usedLetters.indexOf(event.key)==-1) {
    if (falseAttempts < 7) {
      if(prevent){
      board.innerHTML += event.key.toUpperCase()+"  ";
      }else{
        let Btn = document.getElementById(event.key.toUpperCase());
        Btn.style.background = "lightcoral";
        Btn.setAttribute("disabled", "disabled");
      };
      usedLetters.push(event.key);
      falseAttempts++;
      if(falseAttempts >= 7){
        hangMan.src = "images/" + falseAttempts + ".png";
        Swal.fire({
          type:'error',
          title: 'The Man Hanged!',
          text:"You Couldn't Guess The Word Correctly.The Word Was: **" + selectedWord.toUpperCase() + "**",
          confirmButtonText: 'Play Again!',
        })
        var playAgain = document.getElementsByClassName("swal2-confirm swal2-styled")[0];
        playAgain.addEventListener("click", function(){location.reload()});
        defeat = true;
        return null;
      }
      hangMan.src = "images/" + falseAttempts + ".png";
    }
    let i = 0;
    var wrongloop = setInterval(wrongLetter, 100);
    function wrongLetter() {
      if (i < 5) {
        letterList.forEach((element) => {
          let h2wrong = letterObj[element];
          h2wrong.classList.toggle("False");
          letterObj[element] = h2wrong;
        });
      } else {
        letterList.forEach((element) => {
          let h2wrong = letterObj[element];
          h2wrong.classList.remove("False");
          letterObj[element] = h2wrong;
        });
        clearInterval(wrongloop);
        i = 0;
      }
      i++;
    }
    flag = false;
  }
  }
};
var keyBoardDiv = document.getElementById("result-board");
var keyBoard = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");
function addBtns(){
  if(window.innerWidth <= "550"){
    keyBoard.forEach(btn => {
      let Button = document.createElement("Button")
      Button.innerHTML = btn;
      Button.classList.add("typebtn");
      Button.id = btn;
      var btnEvent = {};
      btnEvent.key = btn.toLowerCase();
      Button.addEventListener("click", function(){Play(btnEvent, false)});
      keyBoardDiv.style.display = "block";
      keyBoardDiv.append(Button);
    });
  }
}
addBtns();
document.addEventListener("resize", function(){
  console.log(window.innerWidth)
})
