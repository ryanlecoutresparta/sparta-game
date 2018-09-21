## My Sparta Game: Squares

##### Description: I have created a game where the user controls a square that they must move (using the arrow keys) to collect coins to progress through levels whilst avoiding the red squares. The user has 3 lives and 30 seconds per level - if either of these run out, it's game over.
**Creator: Ryan Lecoutre**

**Technology Used - Atom, HTML, CSS, JavaScript, Google Chrome.**

## Challenges:

1. Creating smooth movement of the user-controlled square through allowing diagonal movement.

2. Adding collision detection between the user-controlled square and the red squares, and between the user and the coins.

3. Creating multiple levels that all function correctly, with the current lives remaining carrying over between them.

## Takeaways:

1. Improved my JavaScript knowledge greatly.

2. Improved at researching and creating solutions to problems that I faced.

3. Gained an understanding of the HTML5 canvas element.

## Link to GitHub Pages:

https://ryanlecoutresparta.github.io/sparta-game/

## Code Blocks:

How I solved the collision detection:

```JavaScript
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
```

How I created diagonal and smooth movement (through allowing keys pressed to be logged into an array):

```JavaScript
document.addEventListener('keydown', (event) => {
  Game.keysPressed = (Game.keysPressed || []);
  Game.keysPressed[event.keyCode] = true;
});

document.addEventListener('keyup', (event) => {
  Game.keysPressed[event.keyCode] = false;
});
```

## Instructions on How to Download:

1. Copy the SHH to clipboard from my repository
2. Go into your desired folder on your terminal
3. Type 'git clone' and then paste the SSH
4. Hit enter
5. Enter the folder and open the index.html page
