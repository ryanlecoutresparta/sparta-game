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
    // window.requestAnimationFrame(Game.updateGame);
    if (Game.token2Enabled === true) {
      Game.token2.update();
    }
    if (Game.token3Enabled === true) {
      Game.token3.update();
    }
  };
  // window.requestAnimationFrame(Game.updateGame);

  clear = () => {
    Game.c.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
  };

  Game.canvas = document.getElementById('canvasGame1');
  Game.c = Game.canvas.getContext('2d');

  Game.update = setInterval(Game.updateGame, 10);

  Game.keysPressed = [];
  Game.player = new Component(30, 30, "cyan", 30, 30);
  Game.levelName = document.getElementsByClassName('levelName')[0];
  Game.timer = document.getElementsByClassName('timer')[0];
  Game.seconds = 30;
  Game.livesRemaining = 3;
  Game.score = 0;
  Game.level1Play = true;
  Game.tokensCollected = 0;
  Game.token2Enabled = true;
  Game.token3Enabled = true;
  Game.timer.innerHTML = `Time Left: ${Game.seconds}`;
  Game.lifeCounter = document.getElementsByClassName('lifeCounter')[0];
  Game.enemyVertical = true;

  let enemyArray = [
    [150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850], // 15
    // y variables:
    [125, 150, 175, 200, 225, 250, 275, 300, 325, 350], // 10
    // size variables:
    [40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100, 125], // 12
    // speed variables:
    [1, 2, 3, 4, 5, 6] // 6
  ]

  let coinArray = [
    // x variables:
    [625, 655, 680, 690, 720, 733, 750, 775, 800, 825, 850, 875, 900, 925], // 14
    // y variables:
    [300, 310, 320, 330, 340, 360, 370, 380, 390, 400, 410, 420, 430, 440] // 14
  ]

  tokenHit = () => {
    coinGet.play();
    Game.score++
    Game.tokensCollected++;
  }

  levelReset = () => {
    Game.player.x = 30;
    Game.player.y = 30;
    Game.seconds = 30;
    Game.timer.innerHTML = `Time Left: ${Game.seconds}`;
  }

  removeToken1 = () => {
    Game.token1.x = 10000;
    Game.token1.y = 10000;
  }

  removeToken2 = () => {
    Game.token2.x = 10000;
    Game.token2.y = 10000;
  }

  removeToken3 = () => {
    Game.token3.x = 10000;
    Game.token3.y = 10000;
  }

  nextLevel = () => {
    Game.keysPressed = [];
    Game.tokensCollected = 0;
  }

  gameTokens1 = () => {
    Game.token1 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
  }

  gameTokens2 = () => {
    Game.token1 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.token2 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
  }

  gameTokens3 = () => {
    Game.token1 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.token2 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    Game.token3 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
  }

  countdown = () => {
    if (Game.seconds === 0) {
      window.location.href = '../html/gameOver.html';
    }
    Game.seconds--;
    Game.timer.innerHTML = `Time Left: ${Game.seconds}`;
  }

  lives = () => {
    Game.lifeCounter.innerHTML = `Lives Left: ${Game.livesRemaining}`;
  }

  squaresSounds = (src) => {
    let audio = document.createElement('audio');
    audio.src = src;
    return audio;
  }

  let lostLife = squaresSounds('../sound/172334__knova__grenade-knova.wav');
  let coinGet = squaresSounds('../sound/242857__plasterbrain__coin-get.ogg');

  Game.random = (array) => {
    let arr = (array.length) - 1;
    let rand = Math.floor(Math.random()*arr);
    return rand;
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
      // window.requestAnimationFrame(movement);

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
          }, 1000);
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
          }, 1000);
        }
      }
    }
    setInterval(movement, 10);
    // window.requestAnimationFrame(movement);
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
      // window.requestAnimationFrame(movement);

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
          }, 1000);
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
          }, 1000);
        }
      }
    }
    setInterval(movement, 10);
    // window.requestAnimationFrame(movement)
  }

  let GameTokenArray = [];

  newLevel = (coinNumber, level) => {

    Game.levelName.innerHTML = `Level ${level}`;
    Game.player.x = 30;
    Game.player.y = 30;
    Game.seconds = 30;
    Game.timer.innerHTML = `Time Left: ${Game.seconds}`;
    Game.canvas.setAttribute('id', 'canvasGame1')

    for (i=1; i<=coinNumber; i++) {
      GameTokenArray.push(`Game.token${i}`);
    }

    if (coinNumber === 1) {
      Game.token1 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);

    } else if (coinNumber === 2) {
      Game.token1 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
      Game.token2 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);

    } else if (coinNumber === 3) {
      Game.token1 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
      Game.token2 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
      Game.token3 = new Component(35, 7.5, "gold", coinArray[0][Game.random(coinArray[0])], coinArray[1][Game.random(coinArray[1])]);
    }

    if (Game.enemyVertical === true) {
      Game.verticalEnemyMovement(enemyArray[0][Game.random(enemyArray[0])], enemyArray[1][Game.random(enemyArray[1])], enemyArray[2][Game.random(enemyArray[2])], enemyArray[3][Game.random(enemyArray[3])]);
      Game.enemyVertical = false;
    } else {
      Game.horizontalEnemyMovement(enemyArray[0][Game.random(enemyArray[0])], enemyArray[1][Game.random(enemyArray[1])], enemyArray[2][Game.random(enemyArray[2])], enemyArray[3][Game.random(enemyArray[3])]);
      Game.enemyVertical = true;
    }

    levelUp = () => {

        if (coinNumber === 1) {

          Game.token2Enabled = false;
          Game.token3Enabled = false;

          if (Game.player.x <= Game.token1.x + 35 && Game.player.y <= Game.token1.y + 7.5 && Game.player.y + 30 >= Game.token1.y && Game.player.x >= Game.token1.x){
            tokenHit();
            removeToken1();
            if (Game.tokensCollected === 1) {
              nextLevel();
              level++;
              if (coinNumber < 3) {
                coinNumber++;
                newLevel(coinNumber, level);
              } else if (coinNumber === 3) {
                coinNumber = 3;
                newLevel(coinNumber, level);
              }
            }
          }

          if (Game.player.x + 30 >= Game.token1.x && Game.player.y <= Game.token1.y + 7.5 && Game.player.y + 30 >= Game.token1.y && Game.player.x <= Game.token1.x + 35){
            tokenHit();
            removeToken1();
            if (Game.tokensCollected === 1) {
              nextLevel();
              level++;
              if (coinNumber < 3) {
                coinNumber++;
                newLevel(coinNumber, level);
              } else if (coinNumber === 3) {
                coinNumber = 3;
                newLevel(coinNumber, level);
              }
            }
          }
        }

        else if (coinNumber === 2) {

          Game.token2Enabled = true;

          if (Game.player.x <= Game.token1.x + 35 && Game.player.y <= Game.token1.y + 7.5 && Game.player.y + 30 >= Game.token1.y && Game.player.x >= Game.token1.x){
            tokenHit();
            removeToken1();
            if (Game.tokensCollected === 2) {
              nextLevel();
              level++;
              if (coinNumber < 3) {
                coinNumber++;
                newLevel(coinNumber, level);
              } else if (coinNumber === 3) {
                coinNumber = 3;
                newLevel(coinNumber, level);
              }
            }
          }

          if (Game.player.x + 30 >= Game.token1.x && Game.player.y <= Game.token1.y + 7.5 && Game.player.y + 30 >= Game.token1.y && Game.player.x <= Game.token1.x + 35){
            tokenHit();
            removeToken1();
            if (Game.tokensCollected === 2) {
              nextLevel();
              level++;
              if (coinNumber < 3) {
                coinNumber++;
                newLevel(coinNumber, level);
              } else if (coinNumber === 3) {
                coinNumber = 3;
                newLevel(coinNumber, level);
              }
            }
          }

          if (Game.player.x <= Game.token2.x + 35 && Game.player.y <= Game.token2.y + 7.5 && Game.player.y + 30 >= Game.token2.y && Game.player.x >= Game.token2.x){
            tokenHit();
            removeToken2();
            if (Game.tokensCollected === 2) {
              nextLevel();
              level++;
              if (coinNumber < 3) {
                coinNumber++;
                newLevel(coinNumber, level);
              } else if (coinNumber === 3) {
                coinNumber = 3;
                newLevel(coinNumber, level);
              }
            }
          }

          if (Game.player.x + 30 >= Game.token2.x && Game.player.y <= Game.token2.y + 7.5 && Game.player.y + 30 >= Game.token2.y && Game.player.x <= Game.token2.x + 35){
            tokenHit();
            removeToken2();
            if (Game.tokensCollected === 2) {
              nextLevel();
              level++;
              if (coinNumber < 3) {
                coinNumber++;
                newLevel(coinNumber, level);
              } else if (coinNumber === 3) {
                coinNumber = 3;
                newLevel(coinNumber, level);
              }
            }
          }
        }

        else if (coinNumber === 3) {

          Game.token3Enabled = true;

          if (Game.player.x <= Game.token1.x + 35 && Game.player.y <= Game.token1.y + 7.5 && Game.player.y + 30 >= Game.token1.y && Game.player.x >= Game.token1.x){
            tokenHit();
            removeToken1();
            if (Game.tokensCollected === 3) {
              nextLevel();
              level++;
              if (coinNumber < 3) {
                coinNumber++;
                newLevel(coinNumber, level);
              } else if (coinNumber === 3) {
                coinNumber = 3;
                newLevel(coinNumber, level);
              }
            }
          }

          if (Game.player.x + 30 >= Game.token1.x && Game.player.y <= Game.token1.y + 7.5 && Game.player.y + 30 >= Game.token1.y && Game.player.x <= Game.token1.x + 35){
            tokenHit();
            removeToken1();
            if (Game.tokensCollected === 3) {
              nextLevel();
              level++;
              if (coinNumber < 3) {
                coinNumber++;
                newLevel(coinNumber, level);
              } else if (coinNumber === 3) {
                coinNumber = 3;
                newLevel(coinNumber, level);
              }
            }
          }

          if (Game.player.x <= Game.token2.x + 35 && Game.player.y <= Game.token2.y + 7.5 && Game.player.y + 30 >= Game.token2.y && Game.player.x >= Game.token2.x){
            tokenHit();
            removeToken2();
            if (Game.tokensCollected === 3) {
              nextLevel();
              level++;
              if (coinNumber < 3) {
                coinNumber++;
                newLevel(coinNumber, level);
              } else if (coinNumber === 3) {
                coinNumber = 3;
                newLevel(coinNumber, level);
              }
            }
          }

          if (Game.player.x + 30 >= Game.token2.x && Game.player.y <= Game.token2.y + 7.5 && Game.player.y + 30 >= Game.token2.y && Game.player.x <= Game.token2.x + 35){
            tokenHit();
            removeToken2();
            if (Game.tokensCollected === 3) {
              nextLevel();
              level++;
              if (coinNumber < 3) {
                coinNumber++;
                newLevel(coinNumber, level);
              } else if (coinNumber === 3) {
                coinNumber = 3;
                newLevel(coinNumber, level);
              }
            }
          }

          if (Game.player.x <= Game.token2.x + 35 && Game.player.y <= Game.token2.y + 7.5 && Game.player.y + 30 >= Game.token2.y && Game.player.x >= Game.token2.x){
            tokenHit();
            removeToken3();
            if (Game.tokensCollected === 3) {
              nextLevel();
              level++;
              if (coinNumber < 3) {
                coinNumber++;
                newLevel(coinNumber, level);
              } else if (coinNumber === 3) {
                coinNumber = 3;
                newLevel(coinNumber, level);
              }
            }
          }

          if (Game.player.x + 30 >= Game.token3.x && Game.player.y <= Game.token3.y + 7.5 && Game.player.y + 30 >= Game.token3.y && Game.player.x <= Game.token3.x + 35){
            tokenHit();
            removeToken3();
            if (Game.tokensCollected === 3) {
              nextLevel();
              level++;
              if (coinNumber < 3) {
                coinNumber++;
                newLevel(coinNumber, level);
              } else if (coinNumber === 3) {
                coinNumber = 3;
                newLevel(coinNumber, level);
              }
            }
          }
        }
      }

    setInterval(() => {
      levelUp()
    }, 1);
  }

  newLevel(1, 1);

  setInterval(() => {
    countdown()
  }, 1000);

  setInterval(() => {
    lives()
  }, 1);
})
