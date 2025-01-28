console.log("Script works");

//The game loop code is from the source: https://spicyyoghurt.com/tutorials/html5-javascript-game-development/create-a-proper-game-loop-with-requestanimationframe
let secondsPassed;
let oldTimeStamp;
let fps;

let canvas;
let context;

let relevantkeysList = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Escape", "KeyW", "KeyA", "KeyS", "KeyD", "KeyQ", "KeyE", "KeyH", "Space"];
let pressedkeysList = [];

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

window.onload = init;

function init(){
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

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

    // Draw number to the screen
    context.fillStyle = 'yellow';
    context.fillRect(0, 0, 200, 100);
    context.font = '25px Arial';
    context.fillStyle = 'black';
    context.fillText("FPS: " + fps, 10, 30);

    // Perform the drawing operation
    draw();

    // The loop function has reached it's end. Keep requesting new frames
    if (key("Escape")){
        context.fillStyle = 'yellow';
        context.fillRect(0, 0, 200, 100);
        context.font = '25px Arial';
        context.fillStyle = 'black';
        context.fillText("Escape");
        console.log("Game End: terminated via ESCAPE key");
    } else {
        window.requestAnimationFrame(gameLoop);
    }
}

function draw(){
  let randomColor = Math.random() > 0.5? '#ff8080' : '#0099b0';
        context.fillStyle = randomColor;
        context.fillRect(100, 50, 200, 175);
}
