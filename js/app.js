// Enemies our player must avoid
class Enemy {
    constructor(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random()*200);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        //this updates the enemy position every dt
        this.x = this.x + (this.speed * dt);

        //if enemy goes off screen, get him back to the beginning
        if (this.x > 501) {
            this.x = -30;
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }

    update() { 
        //if the player is on water,, get a life and a win, and update the board, bring him back home
        if (this.y === -15) {
            game.getLife();
            game.getWin();
            setTimeout(function(){
                player.x = 202;
                player.y = 400;

            }, 500)
            
        }
        //if the player is on the same space as a enemy, bring him back home
        if (this.y === 68 || this.y === 151 || this.y ===  234) {
            let playerX = this.x;
            let playerY = this.y;
            allEnemies.forEach(function(enemy){
                if (enemy.x-40 < playerX && playerX < enemy.x+80 && playerY === enemy.y+8) {
                    console.log(`collision because the player position is ${playerX} and the enemy is at ${enemy.x}`);
                    player.x = 202;
                    player.y = 400 
                }
            })
            
        }

    }

    handleInput(key) {
        switch (key) {
            case "left":
                //if the left key is pressed, move left one column, but not off screen
                this.x - 101 >= 0 ? this.x = this.x - 101 : undefined;
                break;
            
            case "right":
                this.x + 101 <= 500 ? this.x = this.x + 101 : undefined;
                break;
            
            case "up":
                this.y - 83 >= -83 ? this.y = this.y - 83 : undefined;
                break;
            
            case "down":
                this.y + 83 <= 400 ? this.y = this.y + 83: undefined;
                break;
        }
    }
} 

class Game {
    constructor(lives) {
        this.lives = lives;
        this.wins = 0;
    }

    getWin() {
        this.wins +=1;
        document.getElementById('success').innerText = this.wins;
    }

    getLife() {
        this.lives +=1;
        document.getElementById('lives').innerText = this.lives;
    }

    loseLife() {
        this.lives -=1;
    }

    gameover() {
        if (this.lives === 0) {
            document.getElementById('game-over').classList.add('show');
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

let enemy1 = new Enemy(-25, 60);
let enemy2 = new Enemy(-25, 143);
let enemy3 = new Enemy(-25, 226);

let allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);

// Place the player object in a variable called player
// Start a player in the middle of the bottom row
let player = new Player(202, 400);

//start a new game
let game = new Game(3);

document.getElementById('lives').innerText = game.lives;
document.getElementById('success').innerText = game.wins;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
