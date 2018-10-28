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
    if (Game.extraLifeEnabled) {
      Game.extraLife.update();
    }
    if (Game.token2Enabled === true) {
      Game.token2.update();
    }
    if (Game.token3Enabled === true) {
      Game.token3.update();
    }
  };

  clear = () => {
    Game.c.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
  };

  Game.update = setInterval(Game.updateGame, 10);
  Game.keysPressed = [];
  Game.player = new Component(30, 30, "cyan", 10, 10);
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
  Game.extraLifeEnabled = true;

  let enemyArray = [
    [150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850],
    [125, 150, 175, 200, 225, 250, 275, 300, 325, 350],
    [40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100, 125]
  ]

  let diagonalEnemyArray = [
    [500, 550, 600, 650, 700, 750, 800, 850],
    [250, 275, 300, 325, 350],
    [40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100, 125]
  ]

  let coinArray = [
    [600, 625, 650, 675, 700, 725, 750, 775, 800, 825, 850, 875, 900, 925],
    [250, 275, 300, 325, 350, 360, 370, 380, 390, 400, 410, 420, 430, 440, 450, 460, 470, 480]
  ]

  tokenHit = () => {
    Game.score++
    Game.tokensCollected++;
  }

  levelReset = () => {
    Game.player.x = 10;
    Game.player.y = 10;
    Game.seconds = 30;
    Game.timer.innerHTML = `Time Left: ${Game.seconds}`;
  }

  removeToken1 = () => {
    coinGet1.play();
    Game.token1.x = 20000;
    Game.token1.y = 20000;
  }

  removeToken2 = () => {
    coinGet2.play();
    Game.token2.x = 20000;
    Game.token2.y = 20000;
  }

  removeToken3 = () => {
    coinGet3.play();
    Game.token3.x = 20000;
    Game.token3.y = 20000;
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
      lostLife1.play();
      Game.player.x = 10000;
      Game.player.y = 10000;
      gameOver();
      Game.seconds = 0;
      Game.timer.innerHTML = `Time Left: ${Game.seconds}`;
    } else {
    Game.seconds--;
    Game.timer.innerHTML = `Time Left: ${Game.seconds}`;
    }
  }

  lives = () => {
    Game.lifeCounter.innerHTML = `Lives Left: ${Game.livesRemaining}`;
  }

  squaresSounds = (src) => {
    let audio = document.createElement('audio');
    audio.src = src;
    return audio;
  }

  let lostLife1 = squaresSounds('../sound/172334__knova__grenade-knova.wav');
  let lostLife2 = squaresSounds('../sound/172334__knova__grenade-knova.wav');
  let lostLife3 = squaresSounds('../sound/172334__knova__grenade-knova.wav');
  let coinGet1 = squaresSounds('../sound/242857__plasterbrain__coin-get.ogg');
  let coinGet2 = squaresSounds('../sound/242857__plasterbrain__coin-get.ogg');
  let coinGet3 = squaresSounds('../sound/242857__plasterbrain__coin-get.ogg');
  let gotLife = squaresSounds('../sound/66136__aji__ding30603-spedup.wav');

  Game.random = (array) => {
    let arr = (array.length) - 1;
    let rand = Math.floor(Number(Math.random()*arr));
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

  let arrayOfEnemies = [];

  newLevel = (coinNumber, level) => {

    Game.extraLifeEnabled = false;

    if ((level) % 3 === 0) {
      Game.extraLifeEnabled = true;
      Game.extraLife = new Component(35, 35, "lime", 950, 50);
    }

    lifeUp = () => {
      if ((level) % 3 === 0) {
        if (Game.player.x <= Game.extraLife.x + 35 && Game.player.y <= Game.extraLife.y + 35 && Game.player.y + 30 >= Game.extraLife.y && Game.player.x >= Game.extraLife.x){
          gotLife.play();
          Game.extraLife.x = 15000;
          Game.extraLife.y = 15000;
          Game.livesRemaining++;
        }

        if (Game.player.x + 30 >= Game.extraLife.x && Game.player.y <= Game.extraLife.y + 35 && Game.player.y + 30 >= Game.extraLife.y && Game.player.x <= Game.extraLife.x + 35){
          gotLife.play();
          Game.extraLife.x = 15000;
          Game.extraLife.y = 15000;
          Game.livesRemaining++;
        }
      }
    }

    Game.canvas = document.getElementById('canvasGame1');
    Game.c = Game.canvas.getContext('2d');

    Game.levelName.innerHTML = `Level ${level}`;
    levelReset();

    if (coinNumber === 1) {
      gameTokens1();
    } else if (coinNumber === 2) {
      gameTokens2();
    } else if (coinNumber === 3) {
      gameTokens3();
    }

    function Enemy (x, y, size, dy, dx) {

      this.x = x;
      this.y = y;
      this.size = size;
      this.dy = dy;
      this.dx = dx;

      this.draw = () => {
        Game.c.beginPath();
        Game.c.fillStyle = "#ff0000";
        Game.c.fillRect(this.x, this.y, this.size, this.size);
        Game.c.fill();
        Game.c.closePath();
      };

      this.movement = () => {
        if (this.y+this.dy < 0) {
          this.dy = -this.dy;
        } else if (this.y+this.dy > 500 - this.size) {
          this.dy = -this.dy;
        }
        this.y = this.y + this.dy;

        if (this.x+this.dx < 0) {
          this.dx = -this.dx;
        } else if (this.x+this.dx > 1000 - this.size) {
          this.dx = -this.dx;
        }
        this.x = this.x + this.dx;

        if (Game.player.x <= this.x + this.size && Game.player.y <= this.y + this.size && Game.player.y + 30 >= this.y && Game.player.x >= this.x){
          if (Game.livesRemaining % 3 === 0) {
            lostLife1.play();
          } else if (Game.livesRemaining % 3 === 1) {
            lostLife2.play();
          } else if (Game.livesRemaining % 3 === 2) {
            lostLife3.play();
          }
          Game.player.x = 10;
          Game.player.y = 10;
          Game.livesRemaining--;
          if (Game.livesRemaining === 0) {
            Game.player.x = 10000;
            Game.player.y = 10000;
            setTimeout(youLose = () => {
              gameOver();
            }, 1000);
          }
        }
        if (Game.player.x + 30 >= this.x && Game.player.y <= this.y + this.size && Game.player.y + 30 >= this.y && Game.player.x + 30 <= this.x + this.size){
          if (Game.livesRemaining % 3 === 0) {
            lostLife1.play();
          } else if (Game.livesRemaining % 3 === 1) {
            lostLife2.play();
          } else if (Game.livesRemaining % 3 === 2) {
            lostLife3.play();
          }
          Game.player.x = 10;
          Game.player.y = 10;
          Game.livesRemaining--;
          if (Game.livesRemaining === 0) {
            Game.player.x = 10000;
            Game.player.y = 10000;
            setTimeout(youLose = () => {
              gameOver();
            }, 1000);
          }
        }
        this.draw();
      }
    }

    function diagonalEnemy (x, y, size, dy, dx) {

      this.x = x;
      this.y = y;
      this.size = size;
      this.dy = dy;
      this.dx = dx;

      this.draw = () => {
        Game.c.beginPath();
        Game.c.fillStyle = "#ff0000";
        Game.c.fillRect(this.x, this.y, this.size, this.size);
        Game.c.fill();
        Game.c.closePath();
      };

      this.movement = () => {
        if (this.y+this.dy < 0) {
          this.dy = -this.dy;
        } else if (this.y+this.dy > 500 - this.size) {
          this.dy = -this.dy;
        }
        this.y = this.y + this.dy;

        if (this.x+this.dx < 0) {
          this.dx = -this.dx;
        } else if (this.x+this.dx > 1000 - this.size) {
          this.dx = -this.dx;
        } else if (this.x+this.dx < 60 && this.y+this.dy < 60) {
          this.dx = -this.dx;
          this.dy = -this.dy;
        }
        this.x = this.x + this.dx;

        if (Game.player.x <= this.x + this.size && Game.player.y <= this.y + this.size && Game.player.y + 30 >= this.y && Game.player.x >= this.x){
          if (Game.livesRemaining % 3 === 0) {
            lostLife1.play();
          } else if (Game.livesRemaining % 3 === 1) {
            lostLife2.play();
          } else if (Game.livesRemaining % 3 === 2) {
            lostLife3.play();
          }
          Game.player.x = 10;
          Game.player.y = 10;
          Game.livesRemaining--;
          if (Game.livesRemaining === 0) {
            Game.player.x = 10000;
            Game.player.y = 10000;
            setTimeout(youLose = () => {
              gameOver();
            }, 1000);
          }
        }
        if (Game.player.x + 30 >= this.x && Game.player.y <= this.y + this.size && Game.player.y + 30 >= this.y && Game.player.x + 30 <= this.x + this.size){
          if (Game.livesRemaining % 3 === 0) {
            lostLife1.play();
          } else if (Game.livesRemaining % 3 === 1) {
            lostLife2.play();
          } else if (Game.livesRemaining % 3 === 2) {
            lostLife3.play();
          }
          Game.player.x = 10;
          Game.player.y = 10;
          Game.livesRemaining--;
          if (Game.livesRemaining === 0) {
            Game.player.x = 10000;
            Game.player.y = 10000;
            setTimeout(youLose = () => {
              gameOver();
            }, 1000);
          }
        }
        this.draw();
      }
    }

    if (level < 6) {
      if (Game.enemyVertical === true) {
        let x = enemyArray[0][Game.random(enemyArray[0])];
        let y = enemyArray[1][Game.random(enemyArray[1])];
        let size = enemyArray[2][Game.random(enemyArray[2])];
        let dy = 1;
        let dx = 0;
        arrayOfEnemies.push(new Enemy(x, y, size, dy, dx));
        Game.enemyVertical = false;
      } else {
        let x = enemyArray[0][Game.random(enemyArray[0])];
        let y = enemyArray[1][Game.random(enemyArray[1])];
        let size = enemyArray[2][Game.random(enemyArray[2])];
        let dy = 0;
        let dx = 1;
        arrayOfEnemies.push(new Enemy(x, y, size, dy, dx));
        Game.enemyVertical = true;
      }
    } else if (level % 2 === 0) {
      let x = diagonalEnemyArray[0][Game.random(diagonalEnemyArray[0])];
      let y = diagonalEnemyArray[1][Game.random(diagonalEnemyArray[1])];
      let size = diagonalEnemyArray[2][Game.random(diagonalEnemyArray[2])];
      let dy = 0.5;
      let dx = 0.5;
      arrayOfEnemies.push(new diagonalEnemy(x, y, size, dy, dx));
    }

    addToEnemyArray = (array) => {
      for (let i = 0; i < arrayOfEnemies.length; i++) {
        arrayOfEnemies[i].movement();
      }
    }

    animate = () => {
      requestAnimationFrame(animate);
      addToEnemyArray(arrayOfEnemies);
    }

    animate();

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
    setInterval(() => {
      lifeUp()
    }, 1);
  }

  newLevel(1, 1);

  gameOver = () => {
    localStorage.setItem('currentScore', Game.score);
    if (Game.score > localStorage.getItem('Score1') || localStorage.getItem('Score1') == null) {
      localStorage.setItem('Score5', localStorage.getItem('Score4', Game.score));
      localStorage.setItem('Score4', localStorage.getItem('Score3', Game.score));
      localStorage.setItem('Score3', localStorage.getItem('Score2', Game.score));
      localStorage.setItem('Score2', localStorage.getItem('Score1', Game.score));
      localStorage.setItem('Score1', Game.score);
    }
    else if (Game.score > localStorage.getItem('Score2') || localStorage.getItem('Score2') == null) {
      localStorage.setItem('Score5', localStorage.getItem('Score4', Game.score));
      localStorage.setItem('Score4', localStorage.getItem('Score3', Game.score));
      localStorage.setItem('Score3', localStorage.getItem('Score2', Game.score));
      localStorage.setItem('Score2', Game.score);
    }
    else if (Game.score > localStorage.getItem('Score3') || localStorage.getItem('Score3') == null) {
      localStorage.setItem('Score5', localStorage.getItem('Score4', Game.score));
      localStorage.setItem('Score4', localStorage.getItem('Score3', Game.score));
      localStorage.setItem('Score3', Game.score);
    }
    else if (Game.score > localStorage.getItem('Score4') || localStorage.getItem('Score4') == null) {
      localStorage.setItem('Score5', localStorage.getItem('Score4', Game.score));
      localStorage.setItem('Score4', Game.score);
    }
    else if (Game.score > localStorage.getItem('Score5') || localStorage.getItem('Score5') == null) {
      localStorage.setItem('Score5', Game.score);
    }

    setTimeout(youLose = () => {
      window.location.href = '../html/gameOver.html'
    }, 1000);
  }

  setInterval(() => {
    countdown()
  }, 1000);

  setInterval(() => {
    lives()
  }, 1);
})
