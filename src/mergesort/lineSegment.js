/*
 * Adapted from Algorithms, 4th Edition by Robert Sedgewick
 *
 * LINE SEGMENT DATA TYPE
 *
 * Create a line segment data type represented by the following API:
 *
 * class LineSegment {
 *   constructor(p, y)  // constructs the line between points p and q
 *   draw()             // draws this line segment
 *   toString()         // string representation
 * }
 *
 * http://coursera.cs.princeton.edu/algs4/assignments/collinear.html
 */

if (typeof(document) === 'undefined') { Point = require('./Point').Point; }

class LineSegment {
  constructor(p, q) {
    this.p = p;
    this.q = q;
  }

  draw() {
    // Draws the line segment between p and q
    this.p.drawTo(this.q);
  }

  toString() {
    // Return a string representation of this line segment
    return `${this.p.toString()} -> ${this.q.toString()}`;
  }
}

if (typeof(document) === 'undefined') {
  if (!module.parent) {
    let p = new Point(100, 100);
    let q = new Point(300, 300);
    let k = new LineSegment(p, q);
    console.log(k.toString());
  }

  module.exports = {
    LineSegment: LineSegment,
  };
}
