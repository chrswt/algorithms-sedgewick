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
    this.priority = this.board.manhattan() + this.moves;
  }
}

class Solver {
  constructor(Board) {
    this.board = Board;
    this.boardTwin = Board.twin();
    this.minPQ = new MinPriorityQueue();
    this.minPQtwin = new MinPriorityQueue();
    this.solved = false;
    this.solvable = null;
    this.finalSearchNode = null;

    // Instantiate an initial search node and add it to the priority queue
    let initial = new SearchNode(this.board, 0, null);
    this.minPQ.insert(initial);

    // Do the same for a twin board to check if the board is solvable
    let initialTwin = new SearchNode(this.boardTwin, 0, null);
    this.minPQtwin.insert(initialTwin);

    // Attempt to solve the board and its twin in lockstep
    while (!this.solved && this.isSolvable() !== false) {
      this.solve();
      this.solveTwin();
    }
  }

  // Is the initial board solvable?
  isSolvable() {
    return this.solvable;
  }

  // Minimum number of moves to solve the initial board, -1 if unsolvable
  moves() {
    if (!this.isSolvable()) return -1;
    else return this.finalSearchNode.moves;
  }

  // Sequence of boards in a shortest solution, null if unsolvable
  solution() {
    if (!this.isSolvable()) return null;

    let sol = this.finalSearchNode;
    let path = [sol];

    // Traverse backwards through the known solution and store it
    while (sol.previous !== null) {
      path.push(sol.previous);
      sol = sol.previous;
    }

    // Traverse backwards through the path and print out the solution
    console.log(`Minimum number of moves = ${this.finalSearchNode.moves}`);
    for (let i = path.length - 1; i >= 0; i--) {
      console.log();
      console.log(`Move #${path[i].moves}`);
      path[i].board.string();
    }
  }

  solve() {
    // Remove the lowest priority search node from the priority queue
    let current = this.minPQ.delMin();

    // Check if the removed search node is the goal board, if so, return
    if (current.board.isGoal()) {
      this.solved = true;
      this.solvable = true;
      this.finalSearchNode = current;
    } else {
      // Otherwise generate all the neighboring nodes and insert them into PQ
      let neighboards = current.board.neighbors();

      neighboards.forEach((board) => {
        // Check if newly generated board is the same as the previous board
        if (current.previous === null || !current.previous.board.equals(board)) {
          let newSearchNode = new SearchNode(board, current.moves+1, current);
          this.minPQ.insert(newSearchNode);
        }
      });
    }
  }

  solveTwin() {
    // Remove the lowest priority search node from the priority queue
    let current = this.minPQtwin.delMin();

    // Check if the removed search node is the goal board, if so, return
    if (current.board.isGoal()) {
      this.solvable = false;
    } else {
      // Otherwise generate all the neighboring nodes and insert them into PQ
      let neighboards = current.board.neighbors();

      neighboards.forEach((board) => {
        // Check if newly generated board is the same as the previous board
        if (current.previous === null || !current.previous.board.equals(board)) {
          let newSearchNode = new SearchNode(board, current.moves+1, current);
          this.minPQtwin.insert(newSearchNode);
        }
      });
    }
  }
}

let b = new Board();
b.init('../../input/8puzzle/puzzle18.txt');
let s = new Solver(b);
console.log(s.solution());
