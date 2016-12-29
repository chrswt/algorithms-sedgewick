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

    for (let i = 0; i < points.length - 3; i++) {
      for (let j = i + 1; j < points.length - 2; j++) {
        for (let k = j + 1; k < points.length - 1; k++) {
          for (let l = k + 1; l < points.length; l++) {
            if (points[i].slopeTo(points[j]) === points[i].slopeTo(points[k])
              && points[i].slopeTo(points[k]) === points[i].slopeTo(points[l])) {
              /*
               * The three slopes between p and q, p and r, p and s are all
               * equal, therefore p, q, r, and s are collinear. Create a line
               * segment between p and r.
               */
              console.log(i, j, k, l);
              let newLine = new LineSegment(points[i], points[l]);
              this.lineSegments.push(newLine);
              newLine.draw();
              this.number++;
            }
          }
        }
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
  const data = fs.readFileSync('../../input/mergesort/rs1423.txt', 'utf-8');
  const bcp = new BruteCollinearPoints(data);
  bcp.brute();
  bcp.printLineSegments();
}
