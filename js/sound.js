const Game = new Object();

Game.gameOverAudio1 = document.getElementById('iFrameAudio');
Game.gameOverAudio2 = document.getElementById('playAudio');

let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    if(!isChrome){
      Game.gameOverAudio1.remove()
    }
    else {
      Game.gameOverAudio2.remove()
    }
