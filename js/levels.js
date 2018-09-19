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
    Game.token1.update();
    Game.token2.update();
    Game.token3.update();
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
  Game.seconds = 30;
  Game.livesRemaining = 3;
  Game.score = 0;
  Game.level1Play = true;
  Game.tokensCollected = 0;

  Game.timer.innerHTML = `Time Left: ${Game.seconds}`;
  countdown = () => {
    if (Game.seconds === 0) {
      window.location.href = '../html/gameOver.html';
    }
    Game.seconds--;
    Game.timer.innerHTML = `Time Left: ${Game.seconds}`;
  };

  Game.random = (array) => {
    let arr = (array.length) - 1;
    let rand = Math.floor(Math.random()*arr);
    return rand;
  }

  squaresSounds = (src) => {
    let audio = document.createElement('audio');
    audio.src = src;
    return audio;
  }

  let lostLife = squaresSounds('../sound/172334__knova__grenade-knova.wav');
  let coinGet = squaresSounds('../sound/242857__plasterbrain__coin-get.ogg');

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

  let enemyArray = [
    [150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850], // 15
    // y variables:
    [125, 150, 175, 200, 225, 250, 275, 300, 325, 350], // 10
    // size variables:
    [40, 80, 100, 120, 140], // 5
    // speed variables:
    [1, 2, 3, 4, 5, 6, 7, 8] // 8
  ]

  let coinArray = [
    // x variables:
    [625, 655, 680, 690, 720, 733, 750, 775, 800, 825, 850, 875, 900, 925], // 14
    // y variables:
    [300, 310, 320, 330, 340, 360, 370, 380, 390, 400, 410, 420, 430, 440] // 14
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
        lostLife.play();
        Game.player.x = 30;
        Game.player.y = 30;
        Game.livesRemaining--;
        if (Game.livesRemaining === 0) {
          Game.player.x = 10000;
          Game.player.y = 10000;
          setTimeout(youLose = () => {
            window.location.href = '../html/gameOver.html'
          }, 1900);
        }
      }
      if (Game.player.x + 30 >= x && Game.player.y <= y + size && Game.player.y + 30 >= y && Game.player.x + 30 <= x + size){
        lostLife.play();
        Game.player.x = 30;
        Game.player.y = 30;
        Game.livesRemaining--;
        if (Game.livesRemaining === 0) {
          Game.player.x = 10000;
          Game.player.y = 10000;
          setTimeout(youLose = () => {
            window.location.href = '../html/gameOver.html'
          }, 1900);
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
        lostLife.play();
        Game.player.x = 30;
        Game.player.y = 30;
        Game.livesRemaining--;
        if (Game.livesRemaining === 0) {
          Game.player.x = 10000;
          Game.player.y = 10000;
          setTimeout(youLose = () => {
            window.location.href = '../html/gameOver.html'
          }, 1900);
        }
      }
      if (Game.player.y + 30 >= y && Game.player.x <= x + size && Game.player.x + 30 >= x && Game.player.y + 30 <= y + size){
        lostLife.play();
        Game.player.x = 30;
        Game.player.y = 30;
        Game.livesRemaining--;
        if (Game.livesRemaining === 0) {
          Game.player.x = 10000;
          Game.player.y = 10000;
          setTimeout(youLose = () => {
            window.location.href = '../html/gameOver.html'
          }, 1900);
        }
      }
    }
    setInterval(movement, 10);
  }

  // ======= LEVEL 1: ========
  level1 = () => {


    Game.canvas.setAttribute('id', 'canvasGame1')
    Game.token1 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.levelName.innerHTML = 'Level 1';
    Game.seconds = 30;
    Game.timer.innerHTML = `Time Left: ${Game.seconds}`;

    Game.verticalEnemyMovement(enemyArray[0][Game.random(enemyArray[0])], enemyArray[1][Game.random(enemyArray[1])], enemyArray[2][Game.random(enemyArray[2])], enemyArray[3][Game.random(enemyArray[3])]);
    Game.verticalEnemyMovement(enemyArray[0][Game.random(enemyArray[0])], enemyArray[1][Game.random(enemyArray[1])], enemyArray[2][Game.random(enemyArray[2])], enemyArray[3][Game.random(enemyArray[3])]);

    // TOKEN 1
        levelUp1 = () => {
          if (Game.player.x <= Game.token1.x + 35 && Game.player.y <= Game.token1.y + 7.5 && Game.player.y + 30 >= Game.token1.y && Game.player.x >= Game.token1.x){
            coinGet.play();
            Game.score++
            Game.keysPressed = [];
            Game.tokensCollected++;
            Game.token1.x = 10000;
            Game.token1.y = 10000;
            if (Game.tokensCollected === 1) {
              Game.tokensCollected = 0;
              level2();
            }
          }
          if (Game.player.x + 30 >= Game.token1.x && Game.player.y <= Game.token1.y + 7.5 && Game.player.y + 30 >= Game.token1.y && Game.player.x <= Game.token1.x + 35){
            coinGet.play();
            Game.score++
            Game.keysPressed = [];
            Game.tokensCollected++;
            Game.token1.x = 10000;
            Game.token1.y = 10000;
            if (Game.tokensCollected === 1) {
              Game.tokensCollected = 0;
              level2();
            }
          }
        }

        setInterval(() => {
          levelUp1()
        }, 1);

  }

  if (Game.level1Play === true) {
    level1();
  }


  //======== LEVEL 2: =========

  level2 = () => {

    Game.canvas.setAttribute('id', 'canvasGame2')
    Game.token1 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.token2 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.levelName.innerHTML = 'Level 2';
    Game.player.x = 30;
    Game.player.y = 30;
    Game.seconds = 30;
    Game.timer.innerHTML = `Time Left: ${Game.seconds}`;


    Game.horizontalEnemyMovement(enemyArray[0][Game.random(enemyArray[0])], enemyArray[1][Game.random(enemyArray[1])], enemyArray[2][Game.random(enemyArray[2])], enemyArray[3][Game.random(enemyArray[3])]);
    Game.horizontalEnemyMovement(enemyArray[0][Game.random(enemyArray[0])], enemyArray[1][Game.random(enemyArray[1])], enemyArray[2][Game.random(enemyArray[2])], enemyArray[3][Game.random(enemyArray[3])]);

// TOKEN 1
    levelUp1 = () => {
      if (Game.player.x <= Game.token1.x + 35 && Game.player.y <= Game.token1.y + 7.5 && Game.player.y + 30 >= Game.token1.y && Game.player.x >= Game.token1.x){
        coinGet.play();
        Game.score++
        Game.keysPressed = [];
        Game.tokensCollected++;
        Game.token1.x = 10000;
        Game.token1.y = 10000;
        if (Game.tokensCollected === 2) {
          Game.tokensCollected = 0;
          level3();
        }
      }
      if (Game.player.x + 30 >= Game.token1.x && Game.player.y <= Game.token1.y + 7.5 && Game.player.y + 30 >= Game.token1.y && Game.player.x <= Game.token1.x + 35){
        coinGet.play();
        Game.score++
        Game.keysPressed = [];
        Game.tokensCollected++;
        Game.token1.x = 10000;
        Game.token1.y = 10000;
        if (Game.tokensCollected === 2) {
          Game.tokensCollected = 0;
          level3();
        }
      }
    }

  // TOKEN 2
    levelUp2 = () => {
      if (Game.player.x <= Game.token2.x + 35 && Game.player.y <= Game.token2.y + 7.5 && Game.player.y + 30 >= Game.token2.y && Game.player.x >= Game.token2.x){
        coinGet.play();
        Game.score++
        Game.keysPressed = [];
        Game.tokensCollected++;
        Game.token2.x = 10000;
        Game.token2.y = 10000;
        if (Game.tokensCollected === 2) {
          Game.tokensCollected = 0;
          level3();
        }
      }
      if (Game.player.x + 30 >= Game.token2.x && Game.player.y <= Game.token2.y + 7.5 && Game.player.y + 30 >= Game.token2.y && Game.player.x <= Game.token2.x + 35){
        coinGet.play();
        Game.score++
        Game.keysPressed = [];
        Game.tokensCollected++;
        Game.token2.x = 10000;
        Game.token2.y = 10000;
        if (Game.tokensCollected === 2) {
          Game.tokensCollected = 0;
          level3();
        }
      }
    }

    setInterval(() => {
      levelUp1()
    }, 1);
    setInterval(() => {
      levelUp2()
    }, 1);
  }

  // ======= LEVEL 3: =========

  level3 = () => {

    Game.canvas.setAttribute('id', 'canvasGame3')
    Game.token1 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.token2 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.levelName.innerHTML = 'Level 3';
    Game.player.x = 30;
    Game.player.y = 30;
    Game.seconds = 30;
    Game.timer.innerHTML = `Time Left: ${Game.seconds}`;

    Game.horizontalEnemyMovement(enemyArray[0][Game.random(enemyArray[0])], enemyArray[1][Game.random(enemyArray[1])], enemyArray[2][Game.random(enemyArray[2])], enemyArray[3][Game.random(enemyArray[3])]);
    Game.verticalEnemyMovement(enemyArray[0][Game.random(enemyArray[0])], enemyArray[1][Game.random(enemyArray[1])], enemyArray[2][Game.random(enemyArray[2])], enemyArray[3][Game.random(enemyArray[3])]);


    // TOKEN 1
    levelUp1 = () => {
      if (Game.player.x <= Game.token1.x + 35 && Game.player.y <= Game.token1.y + 7.5 && Game.player.y + 30 >= Game.token1.y && Game.player.x >= Game.token1.x){
        coinGet.play();
        Game.score++
        Game.keysPressed = [];
        Game.tokensCollected++;
        Game.token1.x = 10000;
        Game.token1.y = 10000;
        if (Game.tokensCollected === 2) {
          Game.tokensCollected = 0;
          level4();
        }
      }
      if (Game.player.x + 30 >= Game.token1.x && Game.player.y <= Game.token1.y + 7.5 && Game.player.y + 30 >= Game.token1.y && Game.player.x <= Game.token1.x + 35){
        coinGet.play();
        Game.score++
        Game.keysPressed = [];
        Game.tokensCollected++;
        Game.token1.x = 10000;
        Game.token1.y = 10000;
        if (Game.tokensCollected === 2) {
          Game.tokensCollected = 0;
          level4();
        }
      }
    }
    // TOKEN 2
      levelUp2 = () => {
        if (Game.player.x <= Game.token2.x + 35 && Game.player.y <= Game.token2.y + 7.5 && Game.player.y + 30 >= Game.token2.y && Game.player.x >= Game.token2.x){
          coinGet.play();
          Game.score++
          Game.keysPressed = [];
          Game.tokensCollected++;
          Game.token2.x = 10000;
          Game.token2.y = 10000;
          if (Game.tokensCollected === 2) {
            Game.tokensCollected = 0;
            level4();
          }
        }
        if (Game.player.x + 30 >= Game.token2.x && Game.player.y <= Game.token2.y + 7.5 && Game.player.y + 30 >= Game.token2.y && Game.player.x <= Game.token2.x + 35){
          coinGet.play();
          Game.score++
          Game.keysPressed = [];
          Game.tokensCollected++;
          Game.token2.x = 10000;
          Game.token2.y = 10000;
          if (Game.tokensCollected === 2) {
            Game.tokensCollected = 0;
            level4();
          }
        }
      }

    setInterval(() => {
      levelUp1()
    }, 1);
    setInterval(() => {
      levelUp2()
    }, 1);
  }

  level4 = () => {

    Game.canvas.setAttribute('id', 'canvasGame1')
    Game.token1 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.token2 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.token3 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.levelName.innerHTML = 'Level 4';
    Game.player.x = 30;
    Game.player.y = 30;
    Game.seconds = 30;
    Game.timer.innerHTML = `Time Left: ${Game.seconds}`;

    Game.horizontalEnemyMovement(enemyArray[0][Game.random(enemyArray[0])], enemyArray[1][Game.random(enemyArray[1])], enemyArray[2][Game.random(enemyArray[2])], enemyArray[3][Game.random(enemyArray[3])]);


    // TOKEN 1
    levelUp1 = () => {
      if (Game.player.x <= Game.token1.x + 35 && Game.player.y <= Game.token1.y + 7.5 && Game.player.y + 30 >= Game.token1.y && Game.player.x >= Game.token1.x){
        coinGet.play();
        Game.score++
        Game.keysPressed = [];
        Game.tokensCollected++;
        Game.token1.x = 10000;
        Game.token1.y = 10000;
        if (Game.tokensCollected === 3) {
          Game.tokensCollected = 0;
          level5();
        }
      }
      if (Game.player.x + 30 >= Game.token1.x && Game.player.y <= Game.token1.y + 7.5 && Game.player.y + 30 >= Game.token1.y && Game.player.x <= Game.token1.x + 35){
        coinGet.play();
        Game.score++
        Game.keysPressed = [];
        Game.tokensCollected++;
        Game.token1.x = 10000;
        Game.token1.y = 10000;
        if (Game.tokensCollected === 3) {
          Game.tokensCollected = 0;
          level5();
        }
      }
    }
    // TOKEN 2
      levelUp2 = () => {
        if (Game.player.x <= Game.token2.x + 35 && Game.player.y <= Game.token2.y + 7.5 && Game.player.y + 30 >= Game.token2.y && Game.player.x >= Game.token2.x){
          coinGet.play();
          Game.score++
          Game.keysPressed = [];
          Game.tokensCollected++;
          Game.token2.x = 10000;
          Game.token2.y = 10000;
          if (Game.tokensCollected === 3) {
            Game.tokensCollected = 0;
            level5();
          }
        }
        if (Game.player.x + 30 >= Game.token2.x && Game.player.y <= Game.token2.y + 7.5 && Game.player.y + 30 >= Game.token2.y && Game.player.x <= Game.token2.x + 35){
          coinGet.play();
          Game.score++
          Game.keysPressed = [];
          Game.tokensCollected++;
          Game.token2.x = 10000;
          Game.token2.y = 10000;
          if (Game.tokensCollected === 3) {
            Game.tokensCollected = 0;
            level5();
          }
        }
      }
      // TOKEN 3
        levelUp3 = () => {
          if (Game.player.x <= Game.token3.x + 35 && Game.player.y <= Game.token3.y + 7.5 && Game.player.y + 30 >= Game.token3.y && Game.player.x >= Game.token3.x){
            coinGet.play();
            Game.score++
            Game.keysPressed = [];
            Game.tokensCollected++;
            Game.token3.x = 10000;
            Game.token3.y = 10000;
            if (Game.tokensCollected === 3) {
              Game.tokensCollected = 0;
              level5();
            }
          }
          if (Game.player.x + 30 >= Game.token3.x && Game.player.y <= Game.token3.y + 7.5 && Game.player.y + 30 >= Game.token3.y && Game.player.x <= Game.token3.x + 35){
            coinGet.play();
            Game.score++
            Game.keysPressed = [];
            Game.tokensCollected++;
            Game.token3.x = 10000;
            Game.token3.y = 10000;
            if (Game.tokensCollected === 3) {
              Game.tokensCollected = 0;
              level5();
            }
          }
        }

    setInterval(() => {
      levelUp1()
    }, 1);
    setInterval(() => {
      levelUp2()
    }, 1);
    setInterval(() => {
      levelUp3()
    }, 1);
  }


  level5 = () => {

    Game.canvas.setAttribute('id', 'canvasGame2')
    Game.token1 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.token2 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.token3 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.levelName.innerHTML = 'Level 5';
    Game.player.x = 30;
    Game.player.y = 30;
    Game.seconds = 30;
    Game.timer.innerHTML = `Time Left: ${Game.seconds}`;

    Game.verticalEnemyMovement(enemyArray[0][Game.random(enemyArray[0])], enemyArray[1][Game.random(enemyArray[1])], enemyArray[2][Game.random(enemyArray[2])], enemyArray[3][Game.random(enemyArray[3])]);


    // TOKEN 1
    levelUp1 = () => {
      if (Game.player.x <= Game.token1.x + 35 && Game.player.y <= Game.token1.y + 7.5 && Game.player.y + 30 >= Game.token1.y && Game.player.x >= Game.token1.x){
        coinGet.play();
        Game.score++
        Game.keysPressed = [];
        Game.tokensCollected++;
        Game.token1.x = 10000;
        Game.token1.y = 10000;
        if (Game.tokensCollected === 3) {
          Game.tokensCollected = 0;
          level6();
        }
      }
      if (Game.player.x + 30 >= Game.token1.x && Game.player.y <= Game.token1.y + 7.5 && Game.player.y + 30 >= Game.token1.y && Game.player.x <= Game.token1.x + 35){
        coinGet.play();
        Game.score++
        Game.keysPressed = [];
        Game.tokensCollected++;
        Game.token1.x = 10000;
        Game.token1.y = 10000;
        if (Game.tokensCollected === 3) {
          Game.tokensCollected = 0;
          level6();
        }
      }
    }
    // TOKEN 2
      levelUp2 = () => {
        if (Game.player.x <= Game.token2.x + 35 && Game.player.y <= Game.token2.y + 7.5 && Game.player.y + 30 >= Game.token2.y && Game.player.x >= Game.token2.x){
          coinGet.play();
          Game.score++
          Game.keysPressed = [];
          Game.tokensCollected++;
          Game.token2.x = 10000;
          Game.token2.y = 10000;
          if (Game.tokensCollected === 3) {
            Game.tokensCollected = 0;
            level6();
          }
        }
        if (Game.player.x + 30 >= Game.token2.x && Game.player.y <= Game.token2.y + 7.5 && Game.player.y + 30 >= Game.token2.y && Game.player.x <= Game.token2.x + 35){
          coinGet.play();
          Game.score++
          Game.keysPressed = [];
          Game.tokensCollected++;
          Game.token2.x = 10000;
          Game.token2.y = 10000;
          if (Game.tokensCollected === 3) {
            Game.tokensCollected = 0;
            level6();
          }
        }
      }
      // TOKEN 3
        levelUp3 = () => {
          if (Game.player.x <= Game.token3.x + 35 && Game.player.y <= Game.token3.y + 7.5 && Game.player.y + 30 >= Game.token3.y && Game.player.x >= Game.token3.x){
            coinGet.play();
            Game.score++
            Game.keysPressed = [];
            Game.tokensCollected++;
            Game.token3.x = 10000;
            Game.token3.y = 10000;
            if (Game.tokensCollected === 3) {
              Game.tokensCollected = 0;
              level6();
            }
          }
          if (Game.player.x + 30 >= Game.token3.x && Game.player.y <= Game.token3.y + 7.5 && Game.player.y + 30 >= Game.token3.y && Game.player.x <= Game.token3.x + 35){
            coinGet.play();
            Game.score++
            Game.keysPressed = [];
            Game.tokensCollected++;
            Game.token3.x = 10000;
            Game.token3.y = 10000;
            if (Game.tokensCollected === 3) {
              Game.tokensCollected = 0;
              level6();
            }
          }
        }

    setInterval(() => {
      levelUp1()
    }, 1);
    setInterval(() => {
      levelUp2()
    }, 1);
    setInterval(() => {
      levelUp3()
    }, 1);
  }

  level6 = () => {

    Game.canvas.setAttribute('id', 'canvasGame3')
    Game.token1 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.token2 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.token3 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.levelName.innerHTML = 'Level 6';
    Game.player.x = 30;
    Game.player.y = 30;
    Game.seconds = 30;
    Game.timer.innerHTML = `Time Left: ${Game.seconds}`;

    Game.horizontalEnemyMovement(enemyArray[0][Game.random(enemyArray[0])], enemyArray[1][Game.random(enemyArray[1])], enemyArray[2][Game.random(enemyArray[2])], enemyArray[3][Game.random(enemyArray[3])]);

    // TOKEN 1
    levelUp1 = () => {
      if (Game.player.x <= Game.token1.x + 35 && Game.player.y <= Game.token1.y + 7.5 && Game.player.y + 30 >= Game.token1.y && Game.player.x >= Game.token1.x){
        coinGet.play();
        Game.score++
        Game.keysPressed = [];
        Game.tokensCollected++;
        Game.token1.x = 10000;
        Game.token1.y = 10000;
        if (Game.tokensCollected === 3) {
          Game.tokensCollected = 0;
          level7();
        }
      }
      if (Game.player.x + 30 >= Game.token1.x && Game.player.y <= Game.token1.y + 7.5 && Game.player.y + 30 >= Game.token1.y && Game.player.x <= Game.token1.x + 35){
        coinGet.play();
        Game.score++
        Game.keysPressed = [];
        Game.tokensCollected++;
        Game.token1.x = 10000;
        Game.token1.y = 10000;
        if (Game.tokensCollected === 3) {
          Game.tokensCollected = 0;
          level7();
        }
      }
    }
    // TOKEN 2
      levelUp2 = () => {
        if (Game.player.x <= Game.token2.x + 35 && Game.player.y <= Game.token2.y + 7.5 && Game.player.y + 30 >= Game.token2.y && Game.player.x >= Game.token2.x){
          coinGet.play();
          Game.score++
          Game.keysPressed = [];
          Game.tokensCollected++;
          Game.token2.x = 10000;
          Game.token2.y = 10000;
          if (Game.tokensCollected === 3) {
            Game.tokensCollected = 0;
            level7();
          }
        }
        if (Game.player.x + 30 >= Game.token2.x && Game.player.y <= Game.token2.y + 7.5 && Game.player.y + 30 >= Game.token2.y && Game.player.x <= Game.token2.x + 35){
          coinGet.play();
          Game.score++
          Game.keysPressed = [];
          Game.tokensCollected++;
          Game.token2.x = 10000;
          Game.token2.y = 10000;
          if (Game.tokensCollected === 3) {
            Game.tokensCollected = 0;
            level7();
          }
        }
      }
      // TOKEN 3
        levelUp3 = () => {
          if (Game.player.x <= Game.token3.x + 35 && Game.player.y <= Game.token3.y + 7.5 && Game.player.y + 30 >= Game.token3.y && Game.player.x >= Game.token3.x){
            coinGet.play();
            Game.score++
            Game.keysPressed = [];
            Game.tokensCollected++;
            Game.token3.x = 10000;
            Game.token3.y = 10000;
            if (Game.tokensCollected === 3) {
              Game.tokensCollected = 0;
              level7();
            }
          }
          if (Game.player.x + 30 >= Game.token3.x && Game.player.y <= Game.token3.y + 7.5 && Game.player.y + 30 >= Game.token3.y && Game.player.x <= Game.token3.x + 35){
            coinGet.play();
            Game.score++
            Game.keysPressed = [];
            Game.tokensCollected++;
            Game.token3.x = 10000;
            Game.token3.y = 10000;
            if (Game.tokensCollected === 3) {
              Game.tokensCollected = 0;
              level7();
            }
          }
        }

    setInterval(() => {
      levelUp1()
    }, 1);
    setInterval(() => {
      levelUp2()
    }, 1);
    setInterval(() => {
      levelUp3()
    }, 1);
  }

  level7 = () => {

    Game.canvas.setAttribute('id', 'canvasGame1')
    Game.token1 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.token2 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.token3 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.levelName.innerHTML = 'Level 7';
    Game.player.x = 30;
    Game.player.y = 30;
    Game.seconds = 30;
    Game.timer.innerHTML = `Time Left: ${Game.seconds}`;

    Game.verticalEnemyMovement(enemyArray[0][Game.random(enemyArray[0])], enemyArray[1][Game.random(enemyArray[1])], enemyArray[2][Game.random(enemyArray[2])], enemyArray[3][Game.random(enemyArray[3])]);


    // TOKEN 1
    levelUp1 = () => {
      if (Game.player.x <= Game.token1.x + 35 && Game.player.y <= Game.token1.y + 7.5 && Game.player.y + 30 >= Game.token1.y && Game.player.x >= Game.token1.x){
        coinGet.play();
        Game.score++
        Game.keysPressed = [];
        Game.tokensCollected++;
        Game.token1.x = 10000;
        Game.token1.y = 10000;
        if (Game.tokensCollected === 3) {
          Game.tokensCollected = 0;
          level8();
        }
      }
      if (Game.player.x + 30 >= Game.token1.x && Game.player.y <= Game.token1.y + 7.5 && Game.player.y + 30 >= Game.token1.y && Game.player.x <= Game.token1.x + 35){
        coinGet.play();
        Game.score++
        Game.keysPressed = [];
        Game.tokensCollected++;
        Game.token1.x = 10000;
        Game.token1.y = 10000;
        if (Game.tokensCollected === 3) {
          Game.tokensCollected = 0;
          level8();
        }
      }
    }
    // TOKEN 2
      levelUp2 = () => {
        if (Game.player.x <= Game.token2.x + 35 && Game.player.y <= Game.token2.y + 7.5 && Game.player.y + 30 >= Game.token2.y && Game.player.x >= Game.token2.x){
          coinGet.play();
          Game.score++
          Game.keysPressed = [];
          Game.tokensCollected++;
          Game.token2.x = 10000;
          Game.token2.y = 10000;
          if (Game.tokensCollected === 3) {
            Game.tokensCollected = 0;
            level8();
          }
        }
        if (Game.player.x + 30 >= Game.token2.x && Game.player.y <= Game.token2.y + 7.5 && Game.player.y + 30 >= Game.token2.y && Game.player.x <= Game.token2.x + 35){
          coinGet.play();
          Game.score++
          Game.keysPressed = [];
          Game.tokensCollected++;
          Game.token2.x = 10000;
          Game.token2.y = 10000;
          if (Game.tokensCollected === 3) {
            Game.tokensCollected = 0;
            level8();
          }
        }
      }
      // TOKEN 3
        levelUp3 = () => {
          if (Game.player.x <= Game.token3.x + 35 && Game.player.y <= Game.token3.y + 7.5 && Game.player.y + 30 >= Game.token3.y && Game.player.x >= Game.token3.x){
            coinGet.play();
            Game.score++
            Game.keysPressed = [];
            Game.tokensCollected++;
            Game.token3.x = 10000;
            Game.token3.y = 10000;
            if (Game.tokensCollected === 3) {
              Game.tokensCollected = 0;
              level8();
            }
          }
          if (Game.player.x + 30 >= Game.token3.x && Game.player.y <= Game.token3.y + 7.5 && Game.player.y + 30 >= Game.token3.y && Game.player.x <= Game.token3.x + 35){
            coinGet.play();
            Game.score++
            Game.keysPressed = [];
            Game.tokensCollected++;
            Game.token3.x = 10000;
            Game.token3.y = 10000;
            if (Game.tokensCollected === 3) {
              Game.tokensCollected = 0;
              level8();
            }
          }
        }

    setInterval(() => {
      levelUp1()
    }, 1);
    setInterval(() => {
      levelUp2()
    }, 1);
    setInterval(() => {
      levelUp3()
    }, 1);
  }

  level8 = () => {

    Game.canvas.setAttribute('id', 'canvasGame2')
    Game.token1 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.token2 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.token3 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.levelName.innerHTML = 'Level 8';
    Game.player.x = 30;
    Game.player.y = 30;
    Game.seconds = 30;
    Game.timer.innerHTML = `Time Left: ${Game.seconds}`;

    Game.horizontalEnemyMovement(enemyArray[0][Game.random(enemyArray[0])], enemyArray[1][Game.random(enemyArray[1])], enemyArray[2][Game.random(enemyArray[2])], enemyArray[3][Game.random(enemyArray[3])]);

    // TOKEN 1
    levelUp1 = () => {
      if (Game.player.x <= Game.token1.x + 35 && Game.player.y <= Game.token1.y + 7.5 && Game.player.y + 30 >= Game.token1.y && Game.player.x >= Game.token1.x){
        coinGet.play();
        Game.score++
        Game.keysPressed = [];
        Game.tokensCollected++;
        Game.token1.x = 10000;
        Game.token1.y = 10000;
        if (Game.tokensCollected === 3) {
          Game.tokensCollected = 0;
          level9();
        }
      }
      if (Game.player.x + 30 >= Game.token1.x && Game.player.y <= Game.token1.y + 7.5 && Game.player.y + 30 >= Game.token1.y && Game.player.x <= Game.token1.x + 35){
        coinGet.play();
        Game.score++
        Game.keysPressed = [];
        Game.tokensCollected++;
        Game.token1.x = 10000;
        Game.token1.y = 10000;
        if (Game.tokensCollected === 3) {
          Game.tokensCollected = 0;
          level9();
        }
      }
    }
    // TOKEN 2
      levelUp2 = () => {
        if (Game.player.x <= Game.token2.x + 35 && Game.player.y <= Game.token2.y + 7.5 && Game.player.y + 30 >= Game.token2.y && Game.player.x >= Game.token2.x){
          coinGet.play();
          Game.score++
          Game.keysPressed = [];
          Game.tokensCollected++;
          Game.token2.x = 10000;
          Game.token2.y = 10000;
          if (Game.tokensCollected === 3) {
            Game.tokensCollected = 0;
            level9();
          }
        }
        if (Game.player.x + 30 >= Game.token2.x && Game.player.y <= Game.token2.y + 7.5 && Game.player.y + 30 >= Game.token2.y && Game.player.x <= Game.token2.x + 35){
          coinGet.play();
          Game.score++
          Game.keysPressed = [];
          Game.tokensCollected++;
          Game.token2.x = 10000;
          Game.token2.y = 10000;
          if (Game.tokensCollected === 3) {
            Game.tokensCollected = 0;
            level9();
          }
        }
      }
      // TOKEN 3
        levelUp3 = () => {
          if (Game.player.x <= Game.token3.x + 35 && Game.player.y <= Game.token3.y + 7.5 && Game.player.y + 30 >= Game.token3.y && Game.player.x >= Game.token3.x){
            coinGet.play();
            Game.score++
            Game.keysPressed = [];
            Game.tokensCollected++;
            Game.token3.x = 10000;
            Game.token3.y = 10000;
            if (Game.tokensCollected === 3) {
              Game.tokensCollected = 0;
              level9();
            }
          }
          if (Game.player.x + 30 >= Game.token3.x && Game.player.y <= Game.token3.y + 7.5 && Game.player.y + 30 >= Game.token3.y && Game.player.x <= Game.token3.x + 35){
            coinGet.play();
            Game.score++
            Game.keysPressed = [];
            Game.tokensCollected++;
            Game.token3.x = 10000;
            Game.token3.y = 10000;
            if (Game.tokensCollected === 3) {
              Game.tokensCollected = 0;
              level9();
            }
          }
        }

    setInterval(() => {
      levelUp1()
    }, 1);
    setInterval(() => {
      levelUp2()
    }, 1);
    setInterval(() => {
      levelUp3()
    }, 1);
  }

  level9 = () => {

    Game.canvas.setAttribute('id', 'canvasGame3')
    Game.token1 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.token2 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.token3 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.levelName.innerHTML = 'Level 9';
    Game.player.x = 30;
    Game.player.y = 30;
    Game.seconds = 30;
    Game.timer.innerHTML = `Time Left: ${Game.seconds}`;

    Game.verticalEnemyMovement(enemyArray[0][Game.random(enemyArray[0])], enemyArray[1][Game.random(enemyArray[1])], enemyArray[2][Game.random(enemyArray[2])], enemyArray[3][Game.random(enemyArray[3])]);


    // TOKEN 1
    levelUp1 = () => {
      if (Game.player.x <= Game.token1.x + 35 && Game.player.y <= Game.token1.y + 7.5 && Game.player.y + 30 >= Game.token1.y && Game.player.x >= Game.token1.x){
        coinGet.play();
        Game.score++
        Game.keysPressed = [];
        Game.tokensCollected++;
        Game.token1.x = 10000;
        Game.token1.y = 10000;
        if (Game.tokensCollected === 3) {
          Game.tokensCollected = 0;
          level10();
        }
      }
      if (Game.player.x + 30 >= Game.token1.x && Game.player.y <= Game.token1.y + 7.5 && Game.player.y + 30 >= Game.token1.y && Game.player.x <= Game.token1.x + 35){
        coinGet.play();
        Game.score++
        Game.keysPressed = [];
        Game.tokensCollected++;
        Game.token1.x = 10000;
        Game.token1.y = 10000;
        if (Game.tokensCollected === 3) {
          Game.tokensCollected = 0;
          level10();
        }
      }
    }
    // TOKEN 2
      levelUp2 = () => {
        if (Game.player.x <= Game.token2.x + 35 && Game.player.y <= Game.token2.y + 7.5 && Game.player.y + 30 >= Game.token2.y && Game.player.x >= Game.token2.x){
          coinGet.play();
          Game.score++
          Game.keysPressed = [];
          Game.tokensCollected++;
          Game.token2.x = 10000;
          Game.token2.y = 10000;
          if (Game.tokensCollected === 3) {
            Game.tokensCollected = 0;
            level10();
          }
        }
        if (Game.player.x + 30 >= Game.token2.x && Game.player.y <= Game.token2.y + 7.5 && Game.player.y + 30 >= Game.token2.y && Game.player.x <= Game.token2.x + 35){
          coinGet.play();
          Game.score++
          Game.keysPressed = [];
          Game.tokensCollected++;
          Game.token2.x = 10000;
          Game.token2.y = 10000;
          if (Game.tokensCollected === 3) {
            Game.tokensCollected = 0;
            level10();
          }
        }
      }
      // TOKEN 3
        levelUp3 = () => {
          if (Game.player.x <= Game.token3.x + 35 && Game.player.y <= Game.token3.y + 7.5 && Game.player.y + 30 >= Game.token3.y && Game.player.x >= Game.token3.x){
            coinGet.play();
            Game.score++
            Game.keysPressed = [];
            Game.tokensCollected++;
            Game.token3.x = 10000;
            Game.token3.y = 10000;
            if (Game.tokensCollected === 3) {
              Game.tokensCollected = 0;
              level10();
            }
          }
          if (Game.player.x + 30 >= Game.token3.x && Game.player.y <= Game.token3.y + 7.5 && Game.player.y + 30 >= Game.token3.y && Game.player.x <= Game.token3.x + 35){
            coinGet.play();
            Game.score++
            Game.keysPressed = [];
            Game.tokensCollected++;
            Game.token3.x = 10000;
            Game.token3.y = 10000;
            if (Game.tokensCollected === 3) {
              Game.tokensCollected = 0;
              level10();
            }
          }
        }

    setInterval(() => {
      levelUp1()
    }, 1);
    setInterval(() => {
      levelUp2()
    }, 1);
    setInterval(() => {
      levelUp3()
    }, 1);
  }

  level10 = () => {

    Game.canvas.setAttribute('id', 'canvasGame1')
    Game.token1 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.token2 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.token3 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.levelName.innerHTML = 'Level 10';
    Game.player.x = 30;
    Game.player.y = 30;
    Game.seconds = 30;
    Game.timer.innerHTML = `Time Left: ${Game.seconds}`;

    Game.horizontalEnemyMovement(enemyArray[0][Game.random(enemyArray[0])], enemyArray[1][Game.random(enemyArray[1])], enemyArray[2][Game.random(enemyArray[2])], enemyArray[3][Game.random(enemyArray[3])]);

    // TOKEN 1
    levelUp1 = () => {
      if (Game.player.x <= Game.token1.x + 35 && Game.player.y <= Game.token1.y + 7.5 && Game.player.y + 30 >= Game.token1.y && Game.player.x >= Game.token1.x){
        coinGet.play();
        Game.score++
        Game.keysPressed = [];
        Game.tokensCollected++;
        Game.token1.x = 10000;
        Game.token1.y = 10000;
        if (Game.tokensCollected === 3) {
          Game.tokensCollected = 0;
          alert('You win!');
          window.location.href('../html/index.html');
        }
      }
      if (Game.player.x + 30 >= Game.token1.x && Game.player.y <= Game.token1.y + 7.5 && Game.player.y + 30 >= Game.token1.y && Game.player.x <= Game.token1.x + 35){
        coinGet.play();
        Game.score++
        Game.keysPressed = [];
        Game.tokensCollected++;
        Game.token1.x = 10000;
        Game.token1.y = 10000;
        if (Game.tokensCollected === 3) {
          Game.tokensCollected = 0;
          alert('You win!');
          window.location.href('../html/index.html');
        }
      }
    }
    // TOKEN 2
      levelUp2 = () => {
        if (Game.player.x <= Game.token2.x + 35 && Game.player.y <= Game.token2.y + 7.5 && Game.player.y + 30 >= Game.token2.y && Game.player.x >= Game.token2.x){
          coinGet.play();
          Game.score++
          Game.keysPressed = [];
          Game.tokensCollected++;
          Game.token2.x = 10000;
          Game.token2.y = 10000;
          if (Game.tokensCollected === 3) {
            Game.tokensCollected = 0;
            alert('You win!');
            window.location.href('../html/index.html');
          }
        }
        if (Game.player.x + 30 >= Game.token2.x && Game.player.y <= Game.token2.y + 7.5 && Game.player.y + 30 >= Game.token2.y && Game.player.x <= Game.token2.x + 35){
          coinGet.play();
          Game.score++
          Game.keysPressed = [];
          Game.tokensCollected++;
          Game.token2.x = 10000;
          Game.token2.y = 10000;
          if (Game.tokensCollected === 3) {
            Game.tokensCollected = 0;
            alert('You win!');
            window.location.href('../html/index.html');
          }
        }
      }
      // TOKEN 3
        levelUp3 = () => {
          if (Game.player.x <= Game.token3.x + 35 && Game.player.y <= Game.token3.y + 7.5 && Game.player.y + 30 >= Game.token3.y && Game.player.x >= Game.token3.x){
            coinGet.play();
            Game.score++
            Game.keysPressed = [];
            Game.tokensCollected++;
            Game.token3.x = 10000;
            Game.token3.y = 10000;
            if (Game.tokensCollected === 3) {
              Game.tokensCollected = 0;
              alert('You win!');
              window.location.href('../html/index.html');
            }
          }
          if (Game.player.x + 30 >= Game.token3.x && Game.player.y <= Game.token3.y + 7.5 && Game.player.y + 30 >= Game.token3.y && Game.player.x <= Game.token3.x + 35){
            coinGet.play();
            Game.score++
            Game.keysPressed = [];
            Game.tokensCollected++;
            Game.token3.x = 10000;
            Game.token3.y = 10000;
            if (Game.tokensCollected === 3) {
              Game.tokensCollected = 0;
              alert('You win!');
              window.location.href('../html/index.html');
            }
          }
        }

    setInterval(() => {
      levelUp1()
    }, 1);
    setInterval(() => {
      levelUp2()
    }, 1);
    setInterval(() => {
      levelUp3()
    }, 1);
  }

  setInterval(() => {
    countdown()
  }, 1000);

  setInterval(() => {
    lives()
  }, 1);

})
