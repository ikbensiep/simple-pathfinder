import Game from './modules/game.js';

window.addEventListener('load', () => {
  const canvas = document.getElementById('game-canvas')
  const ctx = canvas.getContext('2d');
  const canvasRekt = canvas.getBoundingClientRect()
  canvas.width = canvasRekt.width;
  canvas.height = canvasRekt.height;
  
  const game = new Game(canvas);
  
  const animate = () => {
    ctx.clearRect(0, 0, game.width, game.height)
    game.render(ctx);
    requestAnimationFrame(animate);
  }
  
  game.init();
  console.log(game);
  
  animate(0);
});