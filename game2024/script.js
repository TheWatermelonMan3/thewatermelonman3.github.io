console.log("Script works");

//The game loop code is from the source: https://spicyyoghurt.com/tutorials/html5-javascript-game-development/create-a-proper-game-loop-with-requestanimationframe
let secondsPassed;
let oldTimeStamp;
let fps;

let canvas;
let context;

let imgFilenameList = ['Canteloupe.png'];
let imgList = [];
let imgNicknameList = ['Cant'];

let adiFilenameList = ['Kick Sounds.mp3'];
let adiList = [];
let adiNicknameList = ['Kick'];

let relevantkeysList = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Escape", "KeyW", "KeyA", "KeyS", "KeyD", "KeyQ", "KeyE", "KeyH", "Space"];
let pressedkeysList = [];

let mouseclicked = false;
let mousex = 0;
let mousey = 0;

function clickDOWN(){
  if (loaded){
    mouseclicked = true;
  }
}

function clickMOVE(event){
  if (loaded){
    var rect = canvas.getBoundingClientRect();
    mousex = event.clientX - rect.left;
    mousey = event.clientY - rect.top;
  }
}

function clickUP(){
  if (loaded){
    mouseclicked = false;
  }
}

//             KEYLISTENERS
function key(keycode) {
  return (pressedkeysList.indexOf(keycode) != -1);
}

document.addEventListener('keydown', (e) => {
  if (relevantkeysList.indexOf(e.code) != -1) {
    if (!key(e.code)) {
      pressedkeysList.push(e.code);
      calculateAxisInput();
    }
    e.preventDefault();
  }
});
document.addEventListener('keyup', (e) => {
  if (relevantkeysList.indexOf(e.code) != -1) {
    let idx = pressedkeysList.indexOf(e.code)
    if (idx > -1) {
      pressedkeysList.splice(idx, 1);
      calculateAxisInput();
    }
  }
});

function img(nickname) {
  let idx = imgNicknameList.indexOf(nickname);
  if (idx == -1) {
    return null;
  } else {
    return imgList[idx];
  }
}

function adi(nickname) {
  let idx = adiNicknameList.indexOf(nickname);
  if (idx == -1) {
    return null;
  } else {
    return adiList[idx];
  }
}

function checkAdiIP(adi){
  return adi.currentAudio && adi.currentAudio.currentTime>0 && !adi.currentAudio.paused && !adi.currentAudio.ended && adi.currentAudio.readyState>2;
}

function safePlay(adi){
  if(!checkAdiIP(adi)){
    adi.play();
  }
}

function restartPlay(adi){
  adi.currentTime = 0;
  adi.play();
}

function loadImage(imageNameList, idx) {
  let img = new Image(); // Create new img element
  if (idx < imageNameList.length - 1) {
    img.addEventListener(
      "load",
      () => {
        console.log("Loading image " + img.toString() + idx + " with nickname " + imgNicknameList[idx]);
        imgList.push(img);
        loadImage(imageNameList, idx + 1);
      },
      false,
    );
  } else {
    img.addEventListener(
      "load",
      () => {
        console.log("Loading image " + img.toString() + idx + " with nickname " + imgNicknameList[idx]);
        imgList.push(img);
        loadAudio(adiFilenameList, 0);
      },
      false,
    );
  }
  img.src = imageNameList[idx];
}

function loadAudio(audioNameList, idx) {
  let adi = new Audio(audioNameList[idx]); // Create new img element
  if (idx < audioNameList.length - 1) {
    
    adi.addEventListener(
      "loadstart",
      () => {
        console.log("Loading Audio" + adi.toString() + idx + " with nickname " + adiNicknameList[idx]);
        adiList.push(adi);
        loadAudio(audioNameList, idx + 1);
      },
      false,
    );
  } else {
    adi.addEventListener(
      "loadstart",
      () => {
        console.log("Loading Audio" + adi.toString() + idx + " with nickname " + adiNicknameList[idx]);
        adiList.push(adi);
        init();
      },
      false,
    );
  }
  adi.src = audioNameList[idx];
}

window.onload = function() {
  loadImage(imgFilenameList, 0);
};

function init(){
  //code from: https://javascript.info/task/scrollbar-width
    // create a div with the scroll
  let div = document.createElement('div');

  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';

  // must put it in the document, otherwise sizes will be 0
  document.body.append(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;

  div.remove();
  
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    canvas.height = window.innerHeight - scrollWidth;
    canvas.width = window.innerWidth - scrollWidth;

    // Start the first frame request
    console.log("Game Initiated");
    window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp) {

    // Calculate the number of seconds passed since the last frame
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    // Calculate fps
    fps = Math.round(1 / secondsPassed);

    // Perform the drawing operation
    draw();

    // Draw number to the screen
    context.fillStyle = 'yellow';
    context.fillRect(0, 0, 200, 50);
    context.font = '25px Arial';
    context.fillStyle = 'black';
    context.fillText("FPS: " + fps, 10, 30);

    // The loop function has reached its end. Keep requesting new frames
    if (key("Escape")){
        context.fillStyle = 'yellow';
        context.fillRect(0, 0, 200, 50);
        context.font = '25px Arial';
        context.fillStyle = 'black';
        context.fillText("Escape", 10, 30);
        console.log("Game End: terminated via ESCAPE key");
    } else {
        window.requestAnimationFrame(gameLoop);
    }

    if (key("KeyA")){
      safePlay(adi("Kick"));
    }
}

function draw(){
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  let randomColor = Math.random() > 0.5? '#ff8080' : '#0099b0';
  context.fillStyle = randomColor;
  context.fillRect(100, 50, 200, 175);
  context.drawImage(img("Cant")), 500, 600, 50, 50);
}
