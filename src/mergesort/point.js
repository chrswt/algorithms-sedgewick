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
    this.scale = 41.25;
  }

  /*
   * Helper functions that scale x and y (ranging from 0 to 33,000) to fit onto
   * an 800px by 800px canvas. modifyY inverts y to reflect the convention of
   * graphing the y-axis starting from 0 on the bottom left.
   */
  modifyY(y) {
    return 800 - (y / this.scale);
  }

  modifyX(x) {
    return x / this.scale;
  }

  draw() {
    if (typeof(document) !== 'undefined') {
      const canvas = document.getElementById('graph');
      const ctx = canvas.getContext('2d');
      const radius = 1;

      const centerX = this.modifyX(this.x);
      const centerY = this.modifyY(this.y);

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.linewidth = 0.2;
      ctx.strokeStyle = 'black';
      ctx.stroke();
    }
  }

  drawTo(point) {
    if (typeof(document) !== 'undefined') {
      const canvas = document.getElementById('graph');
      const ctx    = canvas.getContext('2d');

      const centerX = this.modifyX(this.x);
      const centerY = this.modifyY(this.y);
      const destX   = this.modifyX(point.x);
      const destY   = this.modifyY(point.y);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(destX, destY);
      ctx.stroke();
    }
  }

  toString() {
    return [this.x, this.y];
  }

  compareTo(point) {
    // Compares points by their y-coords, breaking ties by their x-coords
    return this.y < point.y ? -1 :
      this.y > point.y ? 1 :
      this.x < point.x ? -1 :
      this.x > point.x ? 1 : 0;
  }

  slopeTo(point) {
    // Returns the slope of the invoking point and the argument point
    if (this.x === point.x) {
      // Treat the slope of a degenerate line segment as negative infinity
      if (this.y === point.y) { return Number.NEGATIVE_INFINITY; }

      // Treat the slope of a vertical line segment as positive infinity
      return Number.POSITIVE_INFINITY;
    }

    // Treat horizontal line segments as having a slope of positive zero
    if (this.y === point.y) { return 0; }

    return ((point.y - this.y) / (point.x - this.x));
  }

  slopeOrder(pointA, pointB) {
    /* Returns -1 if pointA < pointB, 1 if pointA > pointB, and 0 if they are
     * equal. pointA is greater than pointB if the slope made to pointA by
     * the invoking point is greater than the slope made to pointB by the
     * invoking point.
     */
    const slopeA = this.slopeTo(pointA);
    const slopeB = this.slopeTo(pointB);

    return slopeA < slopeB ? -1 :
      slopeA > slopeB ? 1 : 0;
  }
}

if (typeof(document) === 'undefined') {
  module.exports = {
    Point: Point,
  };
}
