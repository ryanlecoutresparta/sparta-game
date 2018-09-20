document.addEventListener('DOMContentLoaded', () => {

const Score = new Object();

Score.current = localStorage.getItem('currentScore');

if (Score.current == 1) {
  Score.text = document.getElementsByClassName('coinOrCoins')[0];
  Score.text.innerHTML = 'coin!';
  Score.currentScore = document.getElementsByClassName('scoreIGot')[0];
  Score.currentScore.innerHTML = `${Score.current}`;
}
else {
  Score.currentScore = document.getElementsByClassName('scoreIGot')[0];
  Score.currentScore.innerHTML = `${Score.current}`;
}

localStorage.removeItem('currentScore');

})
