export default class Player {
  constructor(game) {
    this.game = game;
    this.origin = {
      x:this.game.width * 0.5,
      y:this.game.height * 0.5
    };

    this.speed = {x: 0, y: 0, modifier: 5};
    this.target = {x: 0, y: 0};
    
    this.currentWaypoint = 0;
    this.waypoints = [];

    /* draw style for player */
    this.collisionRadius = 30;
    this.strokeStyle = 'white';
    this.fillStyle = 'white';
  }

  draw (context) {
    
    context.lineWidth = 3;
    context.strokeStyle = this.strokeStyle;
    context.beginPath();
    context.arc(this.origin.x,this.origin.y,this.collisionRadius,0,Math.PI * 2);
    context.save();
      context.globalAlpha = 0.25;
      context.fillStyle = this.fillStyle;
      context.fill();
    context.restore();
    context.stroke();

    context.beginPath();
    context.moveTo(this.origin.x, this.origin.y);
    context.lineTo(this.origin.x + this.target.x, this.origin.y + this.target.y);
    context.stroke();
  }

  update () {
    if (this.currentWaypoint >= this.waypoints.length - 1) return; 

    this.target = {
      x: this.waypoints[this.currentWaypoint].origin.x - this.origin.x,
      y: this.waypoints[this.currentWaypoint].origin.y - this.origin.y,
    }
    
    // this.target = {
    //   x:this.game.mouse.x - this.origin.x,
    //   y:this.game.mouse.y - this.origin.y
    // };

    
    // note: Math.hypot requires y first, x second
    const distance = Math.hypot(this.target.y, this.target.x)
    
    if (distance > this.speed.modifier) {
      // update player speed
      this.speed.x = (this.target.x) / distance || 0;
      this.speed.y = (this.target.y) / distance || 0;
      this.game.waypoints[this.currentWaypoint].isTarget = true;
    } else {
      // stop
      // this.speed.x = 0;
      // this.speed.y = 0;
      this.game.waypoints[this.currentWaypoint].isTarget = false;
      this.currentWaypoint++;
    }

    // update player location
    this.origin.x += this.speed.x * this.speed.modifier;
    this.origin.y += this.speed.y * this.speed.modifier;
    
  }
}
