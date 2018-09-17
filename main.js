document.addEventListener('DOMContentLoaded', () => {

  const Game = new Object();

  Game.updateGame = () => {
    clear();
    Game.player.moveX = 0;
    Game.player.moveY = 0;
    if (Game.keysPressed && Game.keysPressed[37] && (Game.player.x>0)) {Game.player.moveX = -2;}
    if (Game.keysPressed && Game.keysPressed[39] && (Game.player.x<970)) {Game.player.moveX = 2;}
    if (Game.keysPressed && Game.keysPressed[38] && (Game.player.y>0)) {Game.player.moveY = -2;}
    if (Game.keysPressed && Game.keysPressed[40] && (Game.player.y<470)) {Game.player.moveY = 2;}
    Game.player.newPos();
    Game.player.update();
  };

  clear = () => {
    Game.c.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
  };

  function component(width, height, colour, x, y) {
    this.width = width;
    this.height = height;
    this.moveX = 0;
    this.moveY = 0;
    this.x = x;
    this.y = y;
    this.update = () => {
      c = Game.c;
      Game.c.fillStyle = colour;
      Game.c.fillRect(this.x, this.y, this.width, this.height);
    };
    this.newPos = () => {
      this.x += this.moveX;
      this.y += this.moveY;
    };
  };

  Game.canvas = document.getElementById('canvasGame');
  Game.c = Game.canvas.getContext('2d');
  Game.keysPressed = [];
  Game.interval = setInterval(Game.updateGame, 10);
  Game.player = new component(30, 30, "white", 50, 50);

  document.addEventListener('keydown', (event) => {
    Game.keysPressed = (Game.keysPressed || []);
    Game.keysPressed[event.keyCode] = true;
  });

  document.addEventListener('keyup', (event) => {
    Game.keysPressed[event.keyCode] = false;
  });

  var dy1 = 2;
  var y1 = 50;

  var dy2 = 4;
  var y2 = 50;


  enemyMovement1 = () => {
    Game.c.beginPath();
    Game.c.arc(500, y1, 20, 0, Math.PI*2);
    Game.c.fillStyle = "#f11818";
    Game.c.fill();
    Game.c.closePath();
    if (y1+dy1 < 20) {
      dy1 = -dy1;
    } else if (y1+dy1 > 480) {
      dy1 = -dy1;
    }
    y1 += dy1;
  }

  enemyMovement2 = () => {
    Game.c.beginPath();
    Game.c.arc(650, y2, 40, 0, Math.PI*2);
    Game.c.fillStyle = "#f11818";
    Game.c.fill();
    Game.c.closePath();
    if (y2+dy2 < 40) {
      dy2 = -dy2;
    } else if (y2+dy2 > 460) {
      dy2 = -dy2;
    }
    y2 += dy2;
  }

  setInterval(enemyMovement1, 10);
  enemyMovement1();
  setInterval(enemyMovement2, 10);
  enemyMovement2();


})
