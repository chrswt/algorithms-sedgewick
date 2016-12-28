/*
 * Adapted from Algorithms, 4th Edition by Robert Sedgewick
 *
 * POINT DATA TYPE
 *
 * Create an immutable data type `Point` that represents a point in the plane
 * by implementing the following API:
 *
 * class Point {
 *   constructor(x, y)  // constructs the point (x, y)
 *   draw()             // draws this point
 *   drawTo(Point)      // draws the line segment between this and that point
 *   toString()         // string representation
 *   compareTo(Point)   // compares points by y-coords, tie-break with x-coords
 *   slopeTo(Point)     // the slope between this point and that point
 *   slopeOrder()       // compare 2 points by slopes they make with this point
 * }
 *
 * http://coursera.cs.princeton.edu/algs4/assignments/collinear.html
 */

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    const canvas = document.getElementById('graph');
    const ctx = canvas.getContext('2d');
    const radius = 1;
    // Scaled to fit 0 - 33,000 into 800px by 800px canvas
    const centerX = this.x / 41.25;
    const centerY = this.y / 41.25;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.linewidth = 0.2;
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }
}

const p = new Point(1000, 1000);
p.draw();
const q = new Point(1100, 1100);
q.draw();