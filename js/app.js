// Enemies our player must avoid
class Enemy {
    constructor(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() + 1 ) * 200);
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

        //if enemy goes off screen, get him back to the beginning and increase spped
        if (this.x > 501) {
            this.x = -50;
            //just making sure the enemies don't get too fast, but randomise or oncrease their speed every run
           this.speed < (Math.random() + 1) * 400 ? this.speed += 50 : this.speed = Math.floor((Math.random() + 1 ) * 200);
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
        this.won = false;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update() { 
        //if the player is on water, get a life and a win, and update the board, bring him back home
        if (this.y === -15) { 
            this.won = true;
            this.y = -14; //move the player slightly so this conditional is not true again 
            setTimeout(() => this.reset(), 500); 
            game.winround();        
        }

        //if the player is on the same space as a enemy, bring him back home
        if (this.y === 68 || this.y === 151 || this.y ===  234) {
            let thisPlayer = this;
            allEnemies.forEach(function(enemy){
                if (enemy.x-40 < thisPlayer.x && thisPlayer.x < enemy.x+80 && thisPlayer.y === enemy.y+8) {
                    thisPlayer.reset();
                    game.loseLife();
                    game.over();
                }
            }) 
        }
        //if the player is on the same space as a gem, get a gem and place another gem 
        if (this.x === gem.x && this.y === gem.y) {
            game.updateGems();
            gem = new Gem();
        }

    }

    reset() { 
        this.x = 202;
        this.y = 400
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
    constructor() {
        this.lives = 3;
        this.wins = 0;
        this.gems = 0;
    }

    winround(){
        if (player.won === true) {
            this.getWin();
            this.getLife();
            this.won = false;
        }
     }

    getWin() {
        this.wins += 1;
        document.getElementById('success').innerText = this.wins;
        document.getElementById('final-stars').innerText = this.wins;
    }

    getLife() {
        this.lives += 1;
        document.getElementById('lives').innerText = this.lives;
    }

    loseLife() {
        if (this.lives > 0) {
            console.log(this);
            console.log(this.lives)
            this.lives -= 1;
            document.getElementById('lives').innerText = this.lives;
        }       
    }

    updateGems() {
        if (this.gems === 5) {
            this.getLife();
            this.gems = 0;
        } else {
            this.gems += 1;
        };
        document.getElementById('gems').innerText = this.gems;

    }

    over() {
        if (this.lives === 0) {
            console.log("lala");
            document.getElementById('game-over').classList.remove('hide');
            //TO DO - how can i remove controls from the player while the modal is up?
        }
    }

    resetBoard() {
        document.getElementById('lives').innerText = this.lives;
        document.getElementById('success').innerText = this.wins;
        document.getElementById('gems').innerText = this.gems;
        document.getElementById('game-over').classList.add('hide');
    }
}

class Gem {
    constructor(x, y) {
        this.x = [0, 101, 202, 303, 404][Math.floor(Math.random() * 5)];
        this.y = [68, 151, 234][Math.floor(Math.random() * 3)];
        this.sprite = ['images/Gem\ Blue.png', 'images/Gem\ Orange.png', 'images/Gem\ Green.png'][Math.floor(Math.random() * 3)];
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        //ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let enemy1 = new Enemy(-50, 60);
let enemy2 = new Enemy(-50, 143);
let enemy3 = new Enemy(-50, 226);

let allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);

// Place the player object in a variable called player
// Start a player in the middle of the bottom row
let player = new Player(202, 400);

//create a gem at a random place
let gem = new Gem();

//start a new game
let game = new Game();
game.resetBoard();


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

document.getElementById('replay').addEventListener('click', function(){
    game = new Game();
    game.resetBoard();
    
});
document.getElementById('play').addEventListener('click', function(){
    document.getElementById('game-start').classList.add('hide');
    
});