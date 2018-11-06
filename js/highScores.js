document.addEventListener('DOMContentLoaded', () => {

  const topScores = new Object();

  topScores.current1 = localStorage.getItem('Score1');
  topScores.currentScore1 = document.getElementsByClassName('topScore')[0];
  topScores.currentScore1.innerHTML = `${topScores.current1}`;


  topScores.current2 = localStorage.getItem('Score2');
  topScores.currentScore2 = document.getElementsByClassName('secondScore')[0];
  topScores.currentScore2.innerHTML = `${topScores.current2}`;


  topScores.current3 = localStorage.getItem('Score3');
  topScores.currentScore3 = document.getElementsByClassName('thirdScore')[0];
  topScores.currentScore3.innerHTML = `${topScores.current3}`;


  topScores.current4 = localStorage.getItem('Score4');
  topScores.currentScore4 = document.getElementsByClassName('fourthScore')[0];
  topScores.currentScore4.innerHTML = `${topScores.current4}`;


  topScores.current5 = localStorage.getItem('Score5');
  topScores.currentScore5 = document.getElementsByClassName('fifthScore')[0];
  topScores.currentScore5.innerHTML = `${topScores.current5}`;

  topScores.reset = document.getElementsByClassName('resetScores')[0];

  topScores.reset.addEventListener("click", function(){
    localStorage.clear();
    alert("Scores have been cleared!");
    window.location.href = '../index.html'
  });

})
