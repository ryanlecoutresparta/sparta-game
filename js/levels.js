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
    Game.token.update();
  };

  clear = () => {
    Game.c.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
  };

  Game.canvas = document.getElementById('canvasGame1');
  Game.c = Game.canvas.getContext('2d');
  Game.keysPressed = [];
  Game.interval = setInterval(Game.updateGame, 10);
  Game.player = new Component(30, 30, "cyan", 30, 30);
  Game.levelName = document.getElementsByClassName('levelName')[0];
  Game.timer = document.getElementsByClassName('timer')[0];
  Game.seconds = 20;
  // Game.hundredthSecond =
  Game.livesRemaining = 3;
  Game.score = 0;
  Game.level1Play = true;

  Game.timer.innerHTML = `Time Left: ${Game.seconds}`;
  countdown = () => {
    if (Game.seconds === 0) {
      window.location.href = '../html/gameOver.html';
    }
    Game.seconds--;
    Game.timer.innerHTML = `Time Left: ${Game.seconds}`;
  };


  // Game.random = (array) => {
  //   let arr = (array.length) - 1
  //   let rand = Number(Math.random()*arr).toFixed();
  //   return fixed
  // }


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

  // parameters
  let sizeSmall = 40;
  let sizeBig = 80;

  let enemyArray = [
    // x variables:
    [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 850, 900], // 18
    // y variables:
    [100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 425, 450], // 15
    // speed variables:
    [1, 2, 3, 4, 5, 6, 7, 8],
    // money array x
    [625, 655, 680, 690, 720, 733, 750, 775, 800, 825, 850, 875, 900, 925],
    // money array y
    [300, 310, 320, 330, 340, 360, 370, 380, 390, 400, 410, 420, 430, 440]
  ]

  Game.verticalEnemyMovement = (x, y, size, dy) => {
    movement = () => {
      Game.c.beginPath();
      Game.c.fillStyle = "#ff0000";
      Game.c.fillRect(x, y, size, size);
      Game.c.fill();
      Game.c.closePath();
      if (y+dy < 0) {
        dy = -dy;
      } else if (y+dy > 500 - size) {
        dy = -dy;
      }
      y = y + dy;
      if (Game.player.x <= x + size && Game.player.y <= y + size && Game.player.y + 30 >= y && Game.player.x >= x){
        Game.player.x = 30;
        Game.player.y = 30;
        Game.livesRemaining--;
        if (Game.livesRemaining === 0) {
          window.location.href = '../html/gameOver.html';
        }
      }
      if (Game.player.x + 30 >= x && Game.player.y <= y + size && Game.player.y + 30 >= y && Game.player.x + 30 <= x + size){
        Game.player.x = 30;
        Game.player.y = 30;
        Game.livesRemaining--;
        if (Game.livesRemaining === 0) {
          window.location.href = '../html/gameOver.html';
        }
      }
    }
    setInterval(movement, 10);
  }

  Game.horizontalEnemyMovement = (x, y, size, dx) => {
    movement = () => {
      Game.c.beginPath();
      Game.c.fillStyle = "#ff0000";
      Game.c.fillRect(x, y, size, size);
      Game.c.fill();
      Game.c.closePath();
      if (x+dx < 0) {
        dx = -dx;
      } else if (x+dx > 1000 - size) {
        dx = -dx;
      }
      x += dx;

      if (Game.player.y <= y + size && Game.player.x <= x + size && Game.player.x + 30 >= x && Game.player.y >= y){
        Game.player.x = 30;
        Game.player.y = 30;
        Game.livesRemaining--;
        if (Game.livesRemaining === 0) {
          window.location.href = '../html/gameOver.html';
        }
      }
      if (Game.player.y + 30 >= y && Game.player.x <= x + size && Game.player.x + 30 >= x && Game.player.y + 30 <= y + size){
        Game.player.x = 30;
        Game.player.y = 30;
        Game.livesRemaining--;
        if (Game.livesRemaining === 0) {
          window.location.href = '../html/gameOver.html';
        }
      }
    }
    setInterval(movement, 10);
  }

  // ======= LEVEL 1: ========
  level1 = () => {


    Game.canvas.setAttribute('id', 'canvasGame1')
    Game.token = new Component(35, 7.5, "gold", enemyArray[3][5], enemyArray[4][8]);
    Game.levelName.innerHTML = 'Level 1';
    Game.seconds = 20;
    Game.timer.innerHTML = `Time Left: ${Game.seconds}`;

    Game.verticalEnemyMovement(enemyArray[0][2], enemyArray[1][2], sizeSmall, enemyArray[2][3]);
    Game.verticalEnemyMovement(enemyArray[0][4], enemyArray[1][5], sizeSmall, enemyArray[2][4]);

    levelUp = () => {
      if (Game.player.x <= Game.token.x + 35 && Game.player.y <= Game.token.y + 7.5 && Game.player.y + 30 >= Game.token.y && Game.player.x >= Game.token.x){
        Game.score++
        Game.keysPressed = [];
        level2();
      }
      if (Game.player.x + 30 >= Game.token.x && Game.player.y <= Game.token.y + 7.5 && Game.player.y + 30 >= Game.token.y && Game.player.x <= Game.token.x + 35){
        Game.score++
        Game.keysPressed = [];
        level2();
      }
    }

    setInterval(() => {
      levelUp()
    }, 1);

  }

  if (Game.level1Play === true) {
    level1();
  }
  //======== LEVEL 2: =========

  level2 = () => {

    Game.canvas.setAttribute('id', 'canvasGame2')
    Game.token = new Component(35, 7.5, "gold", enemyArray[3][3], enemyArray[4][8]);
    Game.levelName.innerHTML = 'Level 2';
    Game.player.x = 30;
    Game.player.y = 30;
    Game.seconds = 20;
    Game.timer.innerHTML = `Time Left: ${Game.seconds}`;


    Game.horizontalEnemyMovement(enemyArray[0][6], enemyArray[1][4], sizeSmall, enemyArray[2][6]);
    Game.horizontalEnemyMovement(enemyArray[0][8], enemyArray[1][6], sizeBig, enemyArray[2][4]);


    levelUp = () => {
      if (Game.player.x <= Game.token.x + 35 && Game.player.y <= Game.token.y + 7.5 && Game.player.y + 30 >= Game.token.y && Game.player.x >= Game.token.x){
        Game.score++
        Game.keysPressed = [];
        level3();
      }
      if (Game.player.x + 30 >= Game.token.x && Game.player.y <= Game.token.y + 7.5 && Game.player.y + 30 >= Game.token.y && Game.player.x <= Game.token.x + 35){
        Game.score++
        Game.keysPressed = [];
        level3();
      }
    }

    setInterval(() => {
      levelUp()
    }, 1);
  }

  // ======= LEVEL 3: =========

  level3 = () => {

    Game.canvas.setAttribute('id', 'canvasGame3')
    Game.token = new Component(35, 7.5, "gold", enemyArray[3][1], enemyArray[4][5]);
    Game.levelName.innerHTML = 'Level 3';
    Game.player.x = 30;
    Game.player.y = 30;
    Game.seconds = 20;
    Game.timer.innerHTML = `Time Left: ${Game.seconds}`;

    Game.horizontalEnemyMovement(enemyArray[0][5], enemyArray[1][6], sizeSmall, enemyArray[2][3]);
    Game.verticalEnemyMovement(enemyArray[0][9], enemyArray[1][8], sizeSmall, enemyArray[2][4]);


    levelUp = () => {
      if (Game.player.x <= Game.token.x + 35 && Game.player.y <= Game.token.y + 7.5 && Game.player.y + 30 >= Game.token.y && Game.player.x >= Game.token.x){
        Game.score++
        Game.keysPressed = [];
        level4();
      }
      if (Game.player.x + 30 >= Game.token.x && Game.player.y <= Game.token.y + 7.5 && Game.player.y + 30 >= Game.token.y && Game.player.x <= Game.token.x + 35){
        Game.score++
        Game.keysPressed = [];
        level4();
      }
    }

    setInterval(() => {
      levelUp()
    }, 1);
  }

  level4 = () => {

    Game.canvas.setAttribute('id', 'canvasGame1')
    Game.token = new Component(35, 7.5, "gold", enemyArray[3][5], enemyArray[4][6]);
    Game.levelName.innerHTML = 'Level 4';
    Game.player.x = 30;
    Game.player.y = 30;
    Game.seconds = 20;
    Game.timer.innerHTML = `Time Left: ${Game.seconds}`;

    Game.horizontalEnemyMovement(enemyArray[0][1], enemyArray[1][1], sizeSmall, enemyArray[2][7]);
    Game.verticalEnemyMovement(enemyArray[0][3], enemyArray[1][3], sizeSmall, enemyArray[2][3]);


    levelUp = () => {
      if (Game.player.x <= Game.token.x + 35 && Game.player.y <= Game.token.y + 7.5 && Game.player.y + 30 >= Game.token.y && Game.player.x >= Game.token.x){
        Game.score++
        Game.keysPressed = [];
        level5();
      }
      if (Game.player.x + 30 >= Game.token.x && Game.player.y <= Game.token.y + 7.5 && Game.player.y + 30 >= Game.token.y && Game.player.x <= Game.token.x + 35){
        Game.score++
        Game.keysPressed = [];
        level5();
      }
    }

    setInterval(() => {
      levelUp()
    }, 1);
  }

  level5 = () => {

    Game.canvas.setAttribute('id', 'canvasGame2')
    Game.token = new Component(35, 7.5, "gold", enemyArray[3][7], enemyArray[4][7]);
    Game.levelName.innerHTML = 'Level 5';
    Game.player.x = 30;
    Game.player.y = 30;
    Game.seconds = 20;
    Game.timer.innerHTML = `Time Left: ${Game.seconds}`;

    Game.horizontalEnemyMovement(enemyArray[0][15], enemyArray[1][9], sizeSmall, enemyArray[2][6]);
    Game.verticalEnemyMovement(enemyArray[0][12], enemyArray[1][2], sizeBig, enemyArray[2][5]);


    levelUp = () => {
      if (Game.player.x <= Game.token.x + 35 && Game.player.y <= Game.token.y + 7.5 && Game.player.y + 30 >= Game.token.y && Game.player.x >= Game.token.x){
        Game.score++
        Game.keysPressed = [];
        level6();
      }
      if (Game.player.x + 30 >= Game.token.x && Game.player.y <= Game.token.y + 7.5 && Game.player.y + 30 >= Game.token.y && Game.player.x <= Game.token.x + 35){
        Game.score++
        Game.keysPressed = [];
        level6();
      }
    }

    setInterval(() => {
      levelUp()
    }, 1);
  }

  setInterval(() => {
    countdown()
  }, 1000);

  setInterval(() => {
    lives()
  }, 1);

})
