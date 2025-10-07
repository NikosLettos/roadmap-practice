import { Game } from './game/Game.js';


const canvas = document.getElementById('app');
const game = new Game(canvas);


// HUD acciones
document.getElementById('reset').addEventListener('click', () => game.reset());


let last = performance.now();
function loop(now) {
const dt = Math.min(0.033, (now - last) / 1000); // delta time cap ~30ms
last = now;
game.update(dt);
game.render();
requestAnimationFrame(loop);
}
requestAnimationFrame(loop);