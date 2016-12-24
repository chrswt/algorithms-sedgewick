# Algorithms, 4th edition
A collection of notes and solutions created for Algorithms, 4th ed. by Robert Sedgewick and Kevin Wayne

## Running the Code
The output for all code can be run with the newest version of node (tested on `v6.9.3`), which supports ES2015 syntax.
For older versions, transpilation using a `Babel` watcher or using `babel-node` is required. To run the code, simply 
execute `node [filename]` in the `/src` directory.

## Using the Notes
The notes were written for personal benefit and reference and were intended neither as a substitute for the book nor a comprehensive reference. They are included here for completeness and can be accessed through the `/notes` directory or via the Table of Contents.

## Table of Contents
1. Case Study: Union Find
  - [Chapter Notes](https://github.com/chrswt/algorithms-sedgewick/blob/master/notes/1.5-union-find.md)
    - dynamic connectivity, quick-find, quick-union, weighted quick-union, path compression
  - [Quick Find](https://github.com/chrswt/algorithms-sedgewick/blob/master/src/union-find/quickFind.js)
  - [Quick Union](https://github.com/chrswt/algorithms-sedgewick/blob/master/src/union-find/quickUnion.js)
  - [Weighted Quick Union with Path Compression](https://github.com/chrswt/algorithms-sedgewick/blob/master/src/union-find/weightedQuickUnion.js) *
  - [Percolation](https://github.com/chrswt/algorithms-sedgewick/blob/master/notes/1.5-percolation.md) *
  - [Percolation Stats](https://github.com/chrswt/algorithms-sedgewick/blob/master/notes/1.5-percolationStats.md)
  - [Successor With Delete](https://github.com/chrswt/algorithms-sedgewick/blob/master/src/interview-problems/successorWithDelete.js)
2. Analysis of Algorithms
  - [Chapter Notes](https://github.com/chrswt/algorithms-sedgewick/blob/master/notes/1.4-analysis-of-algorithms.md)
    - mathematical models, tilde notation, two sum, three sum
  - [Binary Search](https://github.com/chrswt/algorithms-sedgewick/blob/master/src/analysis-of-algorithms/binarySearch.js)
  - [Two Sum](https://github.com/chrswt/algorithms-sedgewick/blob/master/src/analysis-of-algorithms/twoSum.js)
  - [Three Sum](https://github.com/chrswt/algorithms-sedgewick/blob/master/src/analysis-of-algorithms/threeSum.js)
  - [Bitonic Array Search]:./src/interview-problems/binaryArraySearch.js
