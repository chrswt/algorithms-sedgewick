/*
 * Adapted from Algorithms, 4th Edition by Robert Sedgewick
 *
 * BRUTE FORCE COLLINEAR POINTS
 *
 * Write a program BruteCollinearPoints that examines 4 points at a time and
 * checks whether they all lie on the same line segment, returning all such
 * line segments. To check whether 4 points p, q, r, and s are collinear, check
 * whether the three slopes between p and q, between p and r, and between p and
 * s are all equal.
 *
 * class BruteCollinearPoints {
 *   brute(points)        // finds all line segments containing 4 points
 *   numberOfSegments()   // number of line segments
 *   printLineSegments()  // prints all the line segments
 * }
 *
 * The method segments() should include each line segment containing 4 points
 * exactly once. IF 4 points appear on a line segment in the order p->q->r->s,
 * then you should include either the line segment p->s or s->p (but not both)
 * and you should not include subsegments such as p->r or q->r. For simplicity,
 * there will be no input to BruteCollinearPoints that has 5 or more collinear
 * points.
 *
 * Performance requirements: The order of growth of the running time of your
 * program should be n^4 in the worst case and should use space proportional to
 * n plus the number of line segments returned.
 *
 * http://coursera.cs.princeton.edu/algs4/assignments/collinear.html
 */

let fs;

if (typeof(document) === 'undefined') {
  Point = require('./Point').Point;
  LineSegment = require('./LineSegment').LineSegment;
  fs = require('fs');
}

class BruteCollinearPoints {
  constructor(data) {
    this.points = [];
    this.lineSegments = [];
    this.number = 0;

    // Clean the data to allow reading of x and y coordinates
    data.split('\n').forEach((line, lineNum) => {
      if (lineNum !== 0 && line !== '') {
        let points = line.split(' ');
        points = points.filter((data) => {
          return data !== '';
        });

        // Create a new point instance for each line of data
        let newPoint = new Point(Number(points[0]), Number(points[1]));
        this.points.push(newPoint);
        newPoint.draw();
      }
    });
  }

  brute() {
    let points = this.points;
    let edgePoints = [];

    for (let i = 0; i < points.length - 2; i++) {
      let p = points[i];

      for (let j = i + 1; j < points.length - 1; j++) {
        // Check all possible slopes between point p and all other points
        let q = points[j];
        let slope = p.slopeTo(q);
        let candidates = [p, q];

        for (let k = 0; k < points.length; k++) {
          // Ignore points that reference p and q
          if (k === i || k === j) { continue; }
          let r = points[k];

          if (p.slopeTo(r) === slope) {
            // Find all points that lie on the same slope relative to p
            candidates.push(r);
          }
        }

        if (candidates.length >= 4) {
          // Check if line segment contains at least 4 points
          let maxDistance = 0;
          let maxPoints;

          for (let a = 0; a < candidates.length - 1; a++) {
            for (let b = a + 1; b < candidates.length; b++) {
              if (candidates[a].distance(candidates[b]) > maxDistance) {
                // Find the furthest 2 points that comprise this line segment
                maxDistance = candidates[a].distance(candidates[b]);
                maxPoints = [
                  [candidates[a].x, candidates[a].y],
                  [candidates[b].x, candidates[b].y]
                ];
              }
            }
          }

          let exists = false;
          for (let c = 0; c < edgePoints.length; c++) {
            // Check if line segment has already been recorded
            let x1 = edgePoints[c][0][0];
            let y1 = edgePoints[c][0][1];
            let x2 = edgePoints[c][1][0];
            let y2 = edgePoints[c][1][1];

            if ((x1 === maxPoints[0][0] && y1 === maxPoints[0][1]
              && x2 === maxPoints[1][0] && y2 === maxPoints[1][1])
              || (x1 === maxPoints[1][0] && y1 === maxPoints[1][1])
              && x2 === maxPoints[0][0] && y2 === maxPoints[0][1]) {
              // This line segment has already been recorded
              exists = true;
            }
          }
          if (!exists) {
            // Record new line segment
            edgePoints.push([
              [maxPoints[0][0], maxPoints[0][1]],
              [maxPoints[1][0], maxPoints[1][1]]
            ]);
          }
        }
      }
    }

    edgePoints.forEach((point) => {
      let p = new Point(point[0][0], point[0][1]);
      let q = new Point(point[1][0], point[1][1]);
      let newLine = new LineSegment(p, q);
      this.lineSegments.push(newLine);
      newLine.draw();
      this.number++;
    });
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
  const data = fs.readFileSync('../../input/mergesort/input8.txt', 'utf-8');
  const bcp = new BruteCollinearPoints(data);
  bcp.brute();
  bcp.printLineSegments();
}
