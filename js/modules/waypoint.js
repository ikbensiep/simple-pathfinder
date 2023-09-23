export default class Waypoint {
  constructor(game, origin) {
    this.game = game;
    this.isTarget = false;

    // origin is set in game#init, so 
    // might as well initialize to 0,0?
    this.origin = {
      x: origin.x || (Math.random() * this.game.width), 
      y: origin.y || (Math.random() * this.game.height)
    };
    
    // draw style for waypoint //
    this.collisionRadius = 10;
    this.strokeStyle = 'orange';
    this.fillStyle = 'white';

  }

  update () {}

  draw (context) {

    context.lineWidth = 2;
    context.strokeStyle = this.strokeStyle;
    this.fillStyle = 'white'
    if(this.isTarget) { 
      context.strokeStyle = 'red';
      this.fillStyle = 'red';
    } 
    for (let i=1; i<Math.floor(this.collisionRadius / 5); i++) {
      context.setLineDash([]);
      context.beginPath();
      context.arc(this.origin.x, this.origin.y, this.collisionRadius - i * 5, 0,Math.PI * 2);
      context.save();
        context.globalAlpha = 0.75;
        context.fillStyle = this.fillStyle;
        context.fill();
      context.restore();
      context.stroke();
    }
  }
}