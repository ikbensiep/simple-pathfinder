export default class Waypoint {
  constructor(game) {
    this.game = game;
    this.isTarget = false;

    // origin is set in game#init, so 
    // might as well initialize to 0,0?
    this.origin = {
      x: (Math.random() * this.game.width), 
      y: (Math.random() * this.game.height)
    };
    
    // draw style for waypoint //
    this.collisionRadius = 40;
    this.strokeStyle = 'orange';
    this.fillStyle = 'white';

  }

  update () {}

  draw (context) {

    context.lineWidth = 5;
    context.strokeStyle = this.strokeStyle;
    if(this.isTarget) context.strokeStyle = 'red';
    for (let i=1; i<4; i++) {
      context.beginPath();
      context.arc(this.origin.x,this.origin.y,this.collisionRadius - i * 10,0,Math.PI * 2);
      context.save();
        context.globalAlpha = 0.75;
        context.fillStyle = this.fillStyle;
        context.fill();
      context.restore();
      context.stroke();
    }
  }
}