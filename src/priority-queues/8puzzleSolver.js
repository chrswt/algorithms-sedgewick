/*
 * 8 Puzzle Solver that uses the A* algorithm
 */

const fs = require('fs');
const Board = require('./8puzzle').Board;

class MinPriorityQueue {
  constructor() {
    this.heap = []; // binary heap that stores the keys
    this.n    = 0;  // number of items in the priority queue
  }

  // Insert a key into the priority queue
  insert(key) {
    /* Add the key to the end of the heap and increment n, then swim up the
     * heap to fix any violations that have arisen.
     */
    this.heap[++this.n] = key;
    this.swim(this.n);
  }

  // Return the smallest key from the priority queue
  min() {
    return this.heap[1];
  }

  // Return and remove the smallest key from the priority queue
  delMin() {
    /*
     * Save reference to the min key.
     * Swap the min key with the last key in the heap.
     * Decrement n so that the key does not swim back up the heap.
     * Sink down the heap to fix any violations that have arisen.
     * Delete the min key to prevent loitering, and return its reference.
     */
    let min = this.heap[1];

    [this.heap[1], this.heap[this.n]] = [this.heap[this.n], this.heap[1]];
    this.n--;
    this.sink(1);
    this.heap[this.n+1] = null;

    return min;
  }

  // Return the number of items in the priority queue
  size() {
    return this.n;
  }

  // Maintains the heap order by sinking down the heap and fixing violations
  sink(k) {
    while (2*k <= this.n) {
      /*
       * While the comparison node (k) still has children (2k or 2k+1), check
       * the parent against both its children. If greater than either, swap
       * it with the larger of its children. Continue sinking down the heap
       * until a parent is smaller than its two children.
       */
      let parent = this.heap[k].priority;
      let child1 = this.heap[2*k].priority;
      let child2 = this.heap[2*k + 1].priority;

      if (parent > child1 || parent > child2) {
        /*
         * If the parent node is smaller than either of its child nodes, swap
         * with the larger of its two children.
         */
        if (child1 <= child2 || child2 === undefined) {
          [this.heap[k], this.heap[2*k]] = [this.heap[2*k], this.heap[k]];
          k = 2*k;
        } else {
          [this.heap[k], this.heap[2*k+1]] = [this.heap[2*k+1], this.heap[k]];
          k = 2*k + 1;
        }
      } else {
        // Return because the parent node is smaller than its two children
        return;
      }
    }
  }

  // Maintains the heap order by swimming up the heap and fixing violations
  swim(k) {
    while (k > 1 && this.heap[Math.floor(k/2)] > this.heap[k]) {
      /*
       * While not at root node, swap k (parent) with k/2 (child) if
       * parent > child. Continue swimming upwards until the invariant holds.
       */
      [this.heap[k], this.heap[Math.floor(k/2)]]
        = [this.heap[Math.floor(k/2)], this.heap[k]];
      k = Math.floor(k / 2);
    }
  }
}

// Search node that represents each decision node on a game tree
class SearchNode {
  constructor(Board, numMoves, previous) {
    this.board = Board;
    this.moves = numMoves;
    this.previous = previous;
    this.priority = this.board.hamming() + this.moves;
  }
}

class Solver {
  constructor(Board) {
    this.board = Board;
    this.solvable = null;
  }

  // Is the initial board solvable?
  isSolvable() {

  }

  // Minimum number of moves to solve the initial board, -1 if unsolvable
  moves() {
    if (!this.isSolvable()) return -1;


  }

  // Sequence of boards in a shortest solution, null if unsolvable
  solution() {

  }

  solve() {
    let board = this.board;
    let twin = board.twin();
    let moves = 0;

    while (!(board.isGoal() || twin.isGoal())) {
      // Keep solving
      board.hammingDistance = board.hamming();
      // board.moves = ;
      board.priority = board.hammingDistance + board.moves;


      twin.hammingDistance = twin.hamming();
    }

    // It is solvable only if the board and not a twin is solvable
    if (board.isGoal()) this.solvable = true;
    else if (twin.isGoal()) this.solvable = false;
  }
}