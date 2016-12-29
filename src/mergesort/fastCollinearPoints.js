/*
 * Adapted from Algorithms, 4th Edition by Robert Sedgewick
 *
 * FAST COLLINEAR POINTS
 *
 * It is possible to solve the problem much faster than the brute-force
 * solution. Given a point p, the following method determines whether p
 * participates in a set of 4 or more collinear points.
 *   - Think of p as the origin
 *   - For each other point q, determine the slope it makes with p
 *   - Sort the points according to the slopes they make with p
 *   - Check if any 3 (or more) adjacent points in the sorted order have equal
 *     slopes with respect to p. If so, these points, together with p, are
 *     collinear.
 *
 * Applying this method for each of the n points in turn yields an efficient
 * algorithm to the problem. The algorithm solves the problem because points
 * that have equal slopes with respect to p are collinear, and sorting brings
 * such points together. The algorithm is fast because the bottleneck operation
 * is sorting.
 *
 * Write a program FastCollinearPoints that implements this algorithm:
 *
 * class FastCollinearPoints {
 *   fast(points)         // finds all the line segments containing 4+ points
 *   numberOfSegments()   // number of line segments
 *   printLineSegments()  // prints all the line segments
 * }
 *
 * The method segments() should include each maximal line segment containing 4
 * (or more) points exactly once. For example, if 5 points appear on a line
 * segment in the order p->q->r->s->t, then do not include the subsegments p->s
 * or q->t.
 *
 * Performance requirements: the growth of the running time of your program
 * should be n^2 log n in the worst case and it should use space proportional
 * to n plus the number of line segments returned. FastCollinearPoints should
 * work properly even if the input has 5 or more collinear points.
 *
 * http://coursera.cs.princeton.edu/algs4/assignments/collinear.html
 */

let fs;

if (typeof(document) === 'undefined') {
  Point = require('./Point').Point;
  LineSegment = require('./LineSegment').LineSegment;
  fs = require('fs');
  mergesort = require('./mergesort').mergesort;
}

class FastCollinearPoints {
  constructor(data) {
    this.points       = [];
    this.lineSegments = [];
    this.number       = 0;

    // Clean the data to allow reading of x and y coordinates
    data.split('\n').forEach((line, lineNum) => {
      if (lineNum !== 0 && line !== '') {
        let points = line.split(' ');
        points     = points.filter((data) => {
          return data !== '';
        });

        // Create a new point instance for each line of data
        let newPoint = new Point(Number(points[0]), Number(points[1]));
        this.points.push(newPoint);
        newPoint.draw();
      }
    });
  }

  fast() {
    let points = this.points;

    for (let i = 0; i < points.length; i++) {
      let p = points[i];
      let slopes = [];
      let slopesRef = {};
      let lineSeg = [];

      for (let j = i+1; j < points.length; j++) {
        let q = points[j];

        // Find all the slopes that other points make with p
        let slope = p.slopeTo(q);
        slopes.push(slope);
        if (slopesRef[slope] === undefined) {
          slopesRef[slope] = [q];
        } else {
          slopesRef[slope].push(q);
        }
      }

      // Sort the slopes
      slopes = mergesort(slopes);

      /*
       * Check if any 3 (or more) adjacent points have equal slopes with
       * respect to p, which implies that the points and p are collinear.
       */
      let collinearSlopes = [];

      if (slopes !== undefined) {
        for (let k = 2; k < slopes.length; k++) {
          if (slopes[k] === slopes[k-1] && slopes[k] === slopes[k-2]
            && (slopes[k] !== slopes[k+1] || slopes[k+1] === undefined)) {
            collinearSlopes.push(slopes[k]);
          }
        }
      }

      // Check the points lying on collinear slope
      if (collinearSlopes.length > 0) {
        collinearSlopes.forEach((slope) => {
          let collinearPoints = slopesRef[slope];
          let maxDistance = 0;
          let candidateSeg = null;
          console.log(collinearPoints);

          // Find the largest euclidean distance between the points
          for (let a = 0; a < collinearPoints.length - 1; a++) {
            for (let b = 0; b < collinearPoints.length; b++) {
              let distance = collinearPoints[a].distance(collinearPoints[b]);
              if (distance > maxDistance) {
                maxDistance = distance;
                candidateSeg = [collinearPoints[a], collinearPoints[b]];
              }
            }
          }

          lineSeg.push(candidateSeg);
        });
      }

      if (lineSeg.length > 0) {
        lineSeg.forEach((seg) => {
          let newLine = new LineSegment(seg[0], seg[1]);
          let exists = false;

          // Check for duplicate segment
          this.lineSegments.forEach((segment) => {
            if ((newLine.p.x === segment.p.x && newLine.p.y === segment.p.y
              && newLine.q.x === segment.q.x && newLine.q.y === segment.q.y)
              || (newLine.p.x === segment.q.x && newLine.p.y === segment.q.y
              && newLine.q.x === segment.p.x && newLine.q.y === segment.p.y)) {
              //console.log(newLine);
              exists = true;
            }
          });

          if (!exists) {
            this.lineSegments.push(newLine);
            newLine.draw();
            this.number++;
          }
        });
      }
    }
  }

  numberOfSegments() {
    return this.number;
  }

  printLineSegments() {
    this.lineSegments.forEach((line) => {
      console.log(line.toString());
    });
  }
}

if (typeof(document) === 'undefined' && !module.parent) {
  const data = fs.readFileSync('../../input/mergesort/input9.txt', 'utf-8');
  const fcp = new FastCollinearPoints(data);
  fcp.fast();
  fcp.printLineSegments();
  console.log(fcp.numberOfSegments());
}
