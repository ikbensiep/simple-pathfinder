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

    // spawn player at mouse click location
    this.canvas.addEventListener('mousedown', (e) => {
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
      this.mouse.pressed = true;
      this.player.origin.x = this.mouse.x
      this.player.origin.y = this.mouse.y
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
        this.player.origin.x = this.mouse.x
        this.player.origin.y = this.mouse.y
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
    // first draw track segments
    this.waypoints.forEach((point, index) => {
      this.drawPath(index);
    })
    
    // then draw track waypoints on top
    this.waypoints.forEach((point, index) => {
      point.draw(context);
    })

    // then update & draw player on top of that
    this.player.update();
    this.player.draw(context);
    window.scrollTo(this.player.origin.x - window.innerWidth / 2, this.player.origin.y - window.innerHeight / 2);
  }

  init () {
    // for(let i=0; i < this.numberOfWaypoints; i++) {
    //   this.waypoints.push(new Waypoint(this));
    // }

    // this.createRandomWaypoints();
    this.createPathWaypoints();
    console.log(this.waypoints);
  }

  drawPath (segmentIndex) {
    
    this.context.beginPath();
    
    this.context.lineWidth = 30;
    this.context.strokeStyle = 'black';
    this.context.setLineDash([]);

    this.context.moveTo(this.waypoints[segmentIndex].origin.x, this.waypoints[segmentIndex].origin.y);
    if(segmentIndex < this.waypoints.length - 1) {
      this.context.lineTo(this.waypoints[segmentIndex + 1].origin.x, this.waypoints[segmentIndex + 1].origin.y)
      if(segmentIndex < this.waypoints.length - 2) {
        this.context.lineTo(this.waypoints[segmentIndex + 2].origin.x, this.waypoints[segmentIndex + 2].origin.y)
      }
    } else {
      this.context.lineTo(this.waypoints[0].origin.x, this.waypoints[0].origin.y)
    }
    this.context.stroke();
    
  }

  createRandomWaypoints () {
    // create waypoints using 
    // circle packing brute force algo
    let attempts = 100;
    while (attempts > 0 && this.waypoints.length < this.numberOfWaypoints) {
      let testWaypoint = new Waypoint(this, {});
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

  createPathWaypoints () {
    const svg = document.querySelector('object');
    let path = svg.contentDocument.querySelector('#trackpath-monza');
    const points = Math.floor(path.getTotalLength());
    

    let stepSize = 30;
    

    for(let i=0; i<Math.floor(points / stepSize); i++) {
      console.log('x:' + Math.floor(path.getPointAtLength(i * stepSize).x, 'y:' + Math.floor(path.getPointAtLength(i * stepSize).y)));

      let pathWaypoint = new Waypoint(this, {
        x: path.getPointAtLength(i * stepSize).x,
        y: path.getPointAtLength(i * stepSize).y
      })
      this.waypoints.push(pathWaypoint);
      
    }
    
    console.log(this.waypoints);
    this.player.waypoints = [...this.waypoints];
  }

}