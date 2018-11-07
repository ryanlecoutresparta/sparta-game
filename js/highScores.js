document.addEventListener('DOMContentLoaded', () => {

  const topScores = new Object();

  topScores.current1 = localStorage.getItem('Score1');
  if (topScores.current1 != 'null') {
    topScores.currentScore1 = document.getElementsByClassName('topScore')[0];
    topScores.currentScore1.innerHTML = `${topScores.current1}`;
    if (topScores.current1 == 1){
      topScores.scoreSuffix = document.getElementsByClassName('scoreSuffix1')[0];
      topScores.scoreSuffix.innerHTML = 'coin';
    }
  } else {
    topScores.scoreSuffix = document.getElementsByClassName('scoreSuffix1')[0];
    topScores.scoreSuffix.innerHTML = 'None';
  }

  topScores.current2 = localStorage.getItem('Score2');
  if (topScores.current2 != 'null') {
    topScores.currentScore2 = document.getElementsByClassName('secondScore')[0];
    topScores.currentScore2.innerHTML = `${topScores.current2}`;
    if (topScores.current2 == 1){
      topScores.scoreSuffix = document.getElementsByClassName('scoreSuffix2')[0];
      topScores.scoreSuffix.innerHTML = 'coin';
    }
  } else {
    topScores.scoreSuffix = document.getElementsByClassName('scoreSuffix2')[0];
    topScores.scoreSuffix.innerHTML = 'None';
  }

  topScores.current3 = localStorage.getItem('Score3');
  if (topScores.current3 != 'null') {
    topScores.currentScore3 = document.getElementsByClassName('thirdScore')[0];
    topScores.currentScore3.innerHTML = `${topScores.current3}`;
    if (topScores.current3 == 1){
      topScores.scoreSuffix = document.getElementsByClassName('scoreSuffix3')[0];
      topScores.scoreSuffix.innerHTML = 'coin';
    }
  } else {
    topScores.scoreSuffix = document.getElementsByClassName('scoreSuffix3')[0];
    topScores.scoreSuffix.innerHTML = 'None';
  }

  topScores.current4 = localStorage.getItem('Score4');
  if (topScores.current4 != 'null') {
    topScores.currentScore4 = document.getElementsByClassName('fourthScore')[0];
    topScores.currentScore4.innerHTML = `${topScores.current4}`;
    if (topScores.current4 == 1){
      topScores.scoreSuffix = document.getElementsByClassName('scoreSuffix4')[0];
      topScores.scoreSuffix.innerHTML = 'coin';
    }
  } else {
    topScores.scoreSuffix = document.getElementsByClassName('scoreSuffix4')[0];
    topScores.scoreSuffix.innerHTML = 'None';
  }

  topScores.current5 = localStorage.getItem('Score5');
  if (topScores.current5 != 'null') {
    topScores.currentScore5 = document.getElementsByClassName('fifthScore')[0];
    topScores.currentScore5.innerHTML = `${topScores.current5}`;
    if (topScores.current5 == 1){
      topScores.scoreSuffix = document.getElementsByClassName('scoreSuffix5')[0];
      topScores.scoreSuffix.innerHTML = 'coin';
    }
  } else {
    topScores.scoreSuffix = document.getElementsByClassName('scoreSuffix5')[0];
    topScores.scoreSuffix.innerHTML = 'None';
  }

  topScores.reset = document.getElementsByClassName('resetScores')[0];

  topScores.reset.addEventListener("click", function(){
    let answer = prompt('Are you sure??? (Type "y" to confirm...)')
    if (answer === 'y') {
      localStorage.clear();
      window.location.href = '../index.html'
    }
  });

})
