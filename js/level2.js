document.addEventListener('DOMContentLoaded', () => {

  const Game = new Object();
  Game.updateGame = () => {
    clear();
    Game.player.moveX = 0;
    Game.player.moveY = 0;
    if (Game.keysPressed && Game.keysPressed[37] && (Game.player.x>0)) {Game.player.moveX = -1;}
    if (Game.keysPressed && Game.keysPressed[39] && (Game.player.x<970)) {Game.player.moveX = 1;}
    if (Game.keysPressed && Game.keysPressed[38] && (Game.player.y>0)) {Game.player.moveY = -1;}
    if (Game.keysPressed && Game.keysPressed[40] && (Game.player.y<470)) {Game.player.moveY = 1;}
    Game.player.newPos();
    Game.player.update();
    Game.token.update();
  };

  clear = () => {
    Game.c.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
  };

  Game.canvas = document.getElementById('canvasGame');
  Game.c = Game.canvas.getContext('2d');
  Game.keysPressed = [];
  Game.interval = setInterval(Game.updateGame, 10);
  Game.player = new Component(30, 30, "cyan", 30, 30);
  Game.token = new Component(35, 7.5, "gold", 600, 280);
  Game.levelName = document.getElementsByClassName('levelName')[0];
  Game.levelName.innerHTML = 'Level 2';
  Game.livesRemaining = 3;
  Game.score = 1;
  Game.lifeCounter = document.getElementsByClassName('lifeCounter')[0];
  lives = () => {
    Game.lifeCounter.innerHTML = `Lives Left: ${Game.livesRemaining}`;
  }

  function Component(width, height, colour, x, y) {
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

  document.addEventListener('keydown', (event) => {
    Game.keysPressed = (Game.keysPressed || []);
    Game.keysPressed[event.keyCode] = true;
  });

  document.addEventListener('keyup', (event) => {
    Game.keysPressed[event.keyCode] = false;
  });

  let sizeSmall = 40;
  let sizeBig = 80;

  let x1 = 150;
  let dy1 = 4;
  let y1 = 0;

  let x2 = 375;
  let dy2 = 5;
  let y2 = 50;

  let x3 = 500;
  let dy3 = 4;
  let y3 = 80;

  let x4 = 750;
  let dy4 = 6;
  let y4 = 50;

  let x5 = 750;
  let dx5 = 5;
  let y5 = 400;

  let x6 = 350;
  let dx6 = 4;
  let y6 = 100;

  let x7 = 550;
  let dx7 = 6;
  let y7 = 300;

  let x8 = 425;
  let dx8 = 7;
  let y8 = 200;

  enemyMovement1 = () => {
    Game.c.beginPath();
    Game.c.fillStyle = "#ff0000";
    Game.c.fillRect(x1, y1, sizeBig, sizeBig);
    Game.c.fill();
    Game.c.closePath();
    if (y1+dy1 < 0) {
      dy1 = -dy1;
    } else if (y1+dy1 > 500 - sizeBig) {
      dy1 = -dy1;
    }
    y1 = y1 + dy1;
    if (Game.player.x <= x1 + sizeBig && Game.player.y <= y1 + sizeBig && Game.player.y + 30 >= y1 && Game.player.x >= x1){
      Game.player.x = 50;
      Game.player.y = 50;
      Game.livesRemaining--;
      if (Game.livesRemaining === 0) {
        window.location.href = '../html/gameOver.html';
      }
    }
    if (Game.player.x + 30 >= x1 && Game.player.y <= y1 + sizeBig && Game.player.y + 30 >= y1 && Game.player.x + 30 <= x1 + sizeBig){
      Game.player.x = 50;
      Game.player.y = 50;
      Game.livesRemaining--;
      if (Game.livesRemaining === 0) {
        window.location.href = '../html/gameOver.html';
      }
    }
  }

  enemyMovement2 = () => {
    Game.c.beginPath();
    Game.c.fillStyle = "#ff0000";
    Game.c.fillRect(x2, y2, sizeSmall, sizeSmall);
    Game.c.fill();
    Game.c.closePath();
    if (y2+dy2 < 0) {
      dy2 = -dy2;
    } else if (y2+dy2 > 500 - sizeSmall) {
      dy2 = -dy2;
    }
    y2 += dy2;
    if (Game.player.x <= x2 + sizeSmall && Game.player.y <= y2 + sizeSmall && Game.player.y + 30 >= y2 && Game.player.x >= x2){
      Game.player.x = 50;
      Game.player.y = 50;
      Game.livesRemaining--;
      if (Game.livesRemaining === 0) {
        window.location.href = '../html/gameOver.html';
      }
    }
    if (Game.player.x + 30 >= x2 && Game.player.y <= y2 + sizeSmall && Game.player.y + 30 >= y2 && Game.player.x + 30 <= x2 + sizeSmall){
      Game.player.x = 50;
      Game.player.y = 50;
      Game.livesRemaining--;
      if (Game.livesRemaining === 0) {
        window.location.href = '../html/gameOver.html';
      }
    }
  }

  enemyMovement3 = () => {
    Game.c.beginPath();
    Game.c.fillStyle = "#ff0000";
    Game.c.fillRect(x3, y3, sizeBig, sizeBig);
    Game.c.fill();
    Game.c.closePath();
    if (y3+dy3 < 0) {
      dy3 = -dy3;
    } else if (y3+dy3 > 500 - sizeBig) {
      dy3 = -dy3;
    }
    y3 += dy3;
    if (Game.player.x <= x3 + sizeBig && Game.player.y <= y3 + sizeBig && Game.player.y + 30 >= y3 && Game.player.x >= x3){
      Game.player.x = 50;
      Game.player.y = 50;
      Game.livesRemaining--;
      if (Game.livesRemaining === 0) {
        window.location.href = '../html/gameOver.html';
      }
    }
    if (Game.player.x + 30 >= x3 && Game.player.y <= y3 + sizeBig && Game.player.y + 30 >= y3 && Game.player.x + 30 <= x3 + sizeBig){
      Game.player.x = 50;
      Game.player.y = 50;
      Game.livesRemaining--;
      if (Game.livesRemaining === 0) {
        window.location.href = '../html/gameOver.html';
      }
    }
  }

  enemyMovement4 = () => {
    Game.c.beginPath();
    Game.c.fillStyle = "#ff0000";
    Game.c.fillRect(x4, y4, sizeBig, sizeBig);
    Game.c.fill();
    Game.c.closePath();
    if (y4+dy4 < 0) {
      dy4 = -dy4;
    } else if (y4+dy4 > 500 - sizeBig) {
      dy4 = -dy4;
    }
    y4 += dy4;
    if (Game.player.x <= x4 + sizeBig && Game.player.y <= y4 + sizeBig && Game.player.y + 30 >= y4 && Game.player.x >= x4){
      Game.player.x = 50;
      Game.player.y = 50;
      Game.livesRemaining--;
      if (Game.livesRemaining === 0) {
        window.location.href = '../html/gameOver.html';
      }
    }
    if (Game.player.x + 30 >= x4 && Game.player.y <= y4 + sizeBig && Game.player.y + 30 >= y4 && Game.player.x + 30 <= x4 + sizeBig){
      Game.player.x = 50;
      Game.player.y = 50;
      Game.livesRemaining--;
      if (Game.livesRemaining === 0) {
        window.location.href = '../html/gameOver.html';
      }
    }
  }

  enemyMovement5 = () => {
    Game.c.beginPath();
    Game.c.fillStyle = "#ff0000";
    Game.c.fillRect(x5, y5, sizeSmall, sizeSmall);
    Game.c.fill();
    Game.c.closePath();
    if (x5+dx5 < 0) {
      dx5 = -dx5;
    } else if (x5+dx5 > 1000 - sizeSmall) {
      dx5 = -dx5;
    }
    x5 += dx5;
    if (Game.player.y <= y5 + sizeSmall && Game.player.x <= x5 + sizeSmall && Game.player.x + 30 >= x5 && Game.player.y >= y5){
      Game.player.x = 50;
      Game.player.y = 50;
      Game.livesRemaining--;
      if (Game.livesRemaining === 0) {
        window.location.href = '../html/gameOver.html';
      }
    }
    if (Game.player.y + 30 >= y5 && Game.player.x <= x5 + sizeSmall && Game.player.x + 30 >= x5 && Game.player.y + 30 <= y5 + sizeSmall){
      Game.player.x = 50;
      Game.player.y = 50;
      Game.livesRemaining--;
      if (Game.livesRemaining === 0) {
        window.location.href = '../html/gameOver.html';
      }
    }
  }

  enemyMovement6 = () => {
    Game.c.beginPath();
    Game.c.fillStyle = "#ff0000";
    Game.c.fillRect(x6, y6, sizeSmall, sizeSmall);
    Game.c.fill();
    Game.c.closePath();
    if (x6+dx6 < 0) {
      dx6 = -dx6;
    } else if (x6+dx6 > 1000 - sizeSmall) {
      dx6 = -dx6;
    }
    x6 += dx6;

    if (Game.player.y <= y6 + sizeSmall && Game.player.x <= x6 + sizeSmall && Game.player.x + 30 >= x6 && Game.player.y >= y6){
      Game.player.x = 50;
      Game.player.y = 50;
      Game.livesRemaining--;
      if (Game.livesRemaining === 0) {
        window.location.href = '../html/gameOver.html';
      }
    }
    if (Game.player.y + 30 >= y6 && Game.player.x <= x6 + sizeSmall && Game.player.x + 30 >= x6 && Game.player.y + 30 <= y6 + sizeSmall){
      Game.player.x = 50;
      Game.player.y = 50;
      Game.livesRemaining--;
      if (Game.livesRemaining === 0) {
        window.location.href = '../html/gameOver.html';
      }
    }
  }

  enemyMovement7 = () => {
    Game.c.beginPath();
    Game.c.fillStyle = "#ff0000";
    Game.c.fillRect(x7, y7, sizeSmall, sizeSmall);
    Game.c.fill();
    Game.c.closePath();
    if (x7+dx7 < 0) {
      dx7 = -dx7;
    } else if (x7+dx7 > 1000 - sizeSmall) {
      dx7 = -dx7;
    }
    x7 += dx7;

    if (Game.player.y <= y7 + sizeSmall && Game.player.x <= x7 + sizeSmall && Game.player.x + 30 >= x7 && Game.player.y >= y7){
      Game.player.x = 50;
      Game.player.y = 50;
      Game.livesRemaining--;
      if (Game.livesRemaining === 0) {
        window.location.href = '../html/gameOver.html';
      }
    }
    if (Game.player.y + 30 >= y7 && Game.player.x <= x7 + sizeSmall && Game.player.x + 30 >= x7 && Game.player.y + 30 <= y7 + sizeSmall){
      Game.player.x = 50;
      Game.player.y = 50;
      Game.livesRemaining--;
      if (Game.livesRemaining === 0) {
        window.location.href = '../html/gameOver.html';
      }
    }
  }

  enemyMovement8 = () => {
    Game.c.beginPath();
    Game.c.fillStyle = "#ff0000";
    Game.c.fillRect(x8, y8, sizeSmall, sizeSmall);
    Game.c.fill();
    Game.c.closePath();
    if (x8+dx8 < 0) {
      dx8 = -dx8;
    } else if (x8+dx8 > 1000 - sizeSmall) {
      dx8 = -dx8;
    }
    x8 += dx8;

    if (Game.player.y <= y8 + sizeSmall && Game.player.x <= x8 + sizeSmall && Game.player.x + 30 >= x8 && Game.player.y >= y8){
      Game.player.x = 50;
      Game.player.y = 50;
      Game.livesRemaining--;
      if (Game.livesRemaining === 0) {
        window.location.href = '../html/gameOver.html';
      }
    }
    if (Game.player.y + 30 >= y8 && Game.player.x <= x8 + sizeSmall && Game.player.x + 30 >= x8 && Game.player.y + 30 <= y8 + sizeSmall){
      Game.player.x = 50;
      Game.player.y = 50;
      Game.livesRemaining--;
      if (Game.livesRemaining === 0) {
        window.location.href = '../html/gameOver.html';
      }
    }
  }


  levelUp = () => {
    if (Game.player.x <= Game.token.x + 20 && Game.player.y <= Game.token.y + 20 && Game.player.y + 30 >= Game.token.y && Game.player.x >= Game.token.x){
      Game.keysPressed = [];
      window.location.href = '../html/game2.html';
    }
    if (Game.player.x + 30 >= Game.token.x && Game.player.y <= Game.token.y + 20 && Game.player.y + 30 >= Game.token.y && Game.player.x <= Game.token.x + 20){
      Game.keysPressed = [];
      window.location.href = '../html/game2.html';
    }
  }

  setInterval(levelUp, 1);

  setInterval(lives, 1);

  setInterval(enemyMovement1, 10);

  setInterval(enemyMovement2, 10);

  setInterval(enemyMovement3, 10);

  setInterval(enemyMovement4, 10);

  setInterval(enemyMovement5, 10);

  setInterval(enemyMovement6, 10);

  setInterval(enemyMovement7, 10);

  setInterval(enemyMovement8, 10);

})
