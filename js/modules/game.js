import Player from './player.js';
import Waypoint from './waypoint.js';

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.context = this.canvas.getContext('2d')

    this.numberOfWaypoints = 10;
    this.waypoints = [];

    this.player = new Player(this);
    this.mouse = { 
      x: this.width * .5,
      y: this.height * .5,
      pressed: false
    }


    this.canvas.addEventListener('mousedown', (e) => {
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
      this.mouse.pressed = true;
    })
    
    this.canvas.addEventListener('mouseup', (e) => {
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
      this.mouse.pressed = false;
    })

    this.canvas.addEventListener('mousemove', (e) => {
      if(this.mouse.pressed) {
        this.mouse.x = e.offsetX;
        this.mouse.y = e.offsetY;
      }
    });
    
    window.addEventListener('resize', (e) => {
      const rekt = this.canvas.getBoundingClientRect();
      // update game dimensions when window resizes
      this.width = rekt.width;
      this.height = rekt.height;
      this.canvas.width = rekt.width
      this.canvas.height = rekt.height;
      
      // re-center player
      this.player.origin.x = this.canvas.width / 2;
      this.player.origin.y = this.canvas.height / 2;

      this.player.draw(this.context)
    })
  }

  render (context) {
    this.player.draw(context);
    this.player.update();

    this.waypoints.forEach(point => {
      point.draw(context)
    })
  }

  init () {
    // for(let i=0; i < this.numberOfWaypoints; i++) {
    //   this.waypoints.push(new Waypoint(this));
    // }

    // circle packing brute force algo
    let attempts = 100;
    while (attempts > 0 && this.waypoints.length < this.numberOfWaypoints) {
      let testWaypoint = new Waypoint(this);
      let overlap = false;
      this.waypoints.forEach(waypoint => {
        const dx = testWaypoint.origin.x - waypoint.origin.x;
        const dy = testWaypoint.origin.y - waypoint.origin.y;
        const distance = Math.hypot(dy, dx)
        const sumOfRadii = testWaypoint.collisionRadius + waypoint.collisionRadius;
        if(distance < sumOfRadii) {
          overlap = true;
        }
      });
      if(!overlap) {
        this.waypoints.push(testWaypoint);
      }
      attempts--;
      this.player.waypoints = [...this.waypoints];
    }

  }

}