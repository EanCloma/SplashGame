import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from './enemies.js';

window.addEventListener('load', function(){
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

class Game {
constructor(width, height){
this.width = width;
this.height = height;
this.groundMargin = 80;
this.speed = 3;
this.background = new Background(this);
this.player = new Player(this);
this.input = new InputHandler();
this.enemies = [];
this.enemiesTimer = 0;
this.enemyInterval = 1000;

}
update(deltaTime) {
    this.background.update();
    this.player.update(this.input.keys, deltaTime);
    //handle enemies
    if(this.enemiesTimer > this.enemyInterval){
        this.addEnemy();
        this.enemiesTimer = 0;
    } else{
        this.enemiesTimer += deltaTime;
    }
    this.enemies.forEach(enemy => {
        enemy.update(deltaTime);
        if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
    });
}
draw(context) {
    this.background.draw(context);
    this.player.draw(context);
    this.enemies.forEach(enemy => {
        enemy.draw(context);        
    });
}
addEnemy(){
    if(this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
     else if(this.speed > 0) this.enemies.push(new ClimbingEnemy(this));

     this.enemies.push(new FlyingEnemy(this));
     console.log(this.enemies);
}

}
    
    const game = new Game(canvas.width, canvas.height);
    console.log(game);
    let lastTime = 0;
    
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
 lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});