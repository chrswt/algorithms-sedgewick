/*
 * Adapted from Algorithms, 4th Edition by Robert Sedgewick
 *
 * 8 PUZZLE
 * Write a program to solve the 8-puzzle problem (and its natural
 * generalizations) using the A* search algorithm.
 *
 * The problem: The 8-puzzle problem is played on a 3-by-3 grid with 8 square
 * blocks labeled 1 through 8 and a blank square. Your goal is to rearrange the
 * blocks so that they are in order, using as few moves as possible. You are
 * permitted to slide blocks horizontally or vertically into the blank square.
 *
 * The following solution illustrates a general artificial intelligence
 * methodology known as the A* search algorithm. We define a search node of the
 * game to b a board, the number of moves made to reach the board, and the
 * previous search node. First, insert the initial search node (the initial
 * board, 0 moves, and a null previous search node) into a priority queue.
 * Then, delete from the priority queue the search node with the minimum
 * priority, and insert onto the priority queue all neighboring search nodes
 * (those that can be reached in one move from the de-queued search node).
 * Repeat this procedure until the search node de-queued corresponds to a goal
 * board. The success of this approach hinges on the choice of *priority
 * function* for a search node. We consider two priority functions:
 *
 * 1) Hamming priority function. The number of blocks in the wrong position,
 * plus the number of moves made so far to get to the search node. Intuitively,
 * a search node with a small number of blocks in the wrong position is close
 * to the goal, and we prefer a search node that has been reached using a small
 * number of moves.
 *
 * 2) Manhattan priority function. The sum of the Manhattan distances (sum of
 * the vertical and horizontal distance) from the blocks to their goal
 * positions, plus the number of moves made so far to get to the search node.
 *
 * For example, the Hamming and Manhattan priorities of the initial search node
 * below are 5 and 10, respectively.
 *
 * 8  1  3    1  2  3    1  2  3  4  5  6  7  8    1  2  3  4  5  6  7  8
 * 4     2    4  5  6    ----------------------    ----------------------
 * 7  6  5    7  8       1  1  0  0  1  1  0  1    1  2  0  0  2  2  0  3
 *
 * initial     goal          Hamming = 5 + 0         Manhattan = 10 + 0
 *
 * We make a key observation: To solve the puzzle from a given search node on
 * the priority queue, the total number of moves we need to make (including
 * those already made) is at least its priority, using either the Hamming or
 * Manhattan priority function. (For Hamming priority, this is true because
 * each block that is out of place must move at least once to reach its goal
 * position. For Manhattan priority, this is true because each block must move
 * its Manhattan distance from its goal position. Note that we do not count the
 * blank square when computing the Hamming or Manhattan priorities.)
 * Consequently, when the goal board is de-queued, we have discovered not only
 * a sequence of moves from the initial board to the goal board, but one that
 * makes the fewest number of moves.
 *
 * A critical optimization. Best-first search has one annoying feature: search
 * nodes corresponding to the same board are enqueued on the priority queue
 * many times. To reduce unnecessary exploration of useless search nodes, when
 * considering the neighbors of a search node, don't enqueue a neighbor if its
 * board is the same as the board of the previous search node.
 *
 * Game tree. One way to view the computation is as a game tree, where each
 * search node is a node in the game tree and the children of a node correspond
 * to its neighboring search nodes. The root of the game tree is the initial
 * search node; the internal nodes have already been processed; the leaf nodes
 * are maintained in a priority queue; at each step, the A* algorithm removes
 * the node with the smallest priority from the priority queue and processes it
 * (by adding its children to both the game tree and the priority queue).
 *
 * Detecting unsolvable puzzles. Not all initial boards can lead to the goal
 * board by a sequence of legal moves. To detect such situations, use the fact
 * that boards are divided into two equivalence classes with respect to
 * reachability:
 * (i) those that lead to the goal board, and
 * (ii) those that lead to the goal board if we modify the initial board by
 *      swapping any pairs of blocks (the blank square is not a block).
 * To apply the fact, run the A* algorithm on *two* puzzle instances -- one
 * with the initial board and one with the initial board modified by swapping a
 * pair of blocks -- in lockstep (alternating back and forth between exploring
 * search nodes in each of the two game trees). Exactly one of the two will
 * lead to the goal board.
 *
 * Board and Solver data types. Organize your program by creating an immutable
 * data type Board with the following API:
 *
 * class Board {
 *   constructor(blocks)      construct a board from an n-by-n array of blocks
 *                            (where blocks[i][j] = block in row i, col j)
 *       int  dimension()     returns the board dimension n
 *       int  hamming()       number of blocks out of place
 *       int  manhattan()     sum of Manhattan distances between blocks & goal
 *   boolean  isGoal()        true/false is the board the goal board
 *     Board  twin()          a board that is obtained by exchanging any pair
 *                            of blocks
 *   boolean  equals(y)       does this board equal y?
 *     Board  neighbors()     all neighboring boards
 *    String  toString()      string representation of this board
 * }
 *
 * Corner cases. You may assume that the constructor received an n-by-n array
 * containing n^2 integers between 0 and n^2 - 1, where 0 represents the blank
 * square.
 *
 * Performance requirements. Your implementation should support all Board
 * methods in time proportional to n^2 (or better) in the worst case.
 *
 * Also, create an immutable data type Solver with the following API:
 *
 * class Solver {
 *            constructor(Board)     find a solution to the initial board
 *   boolean  isSolvable()           is the initial board solvable?
 *       int  moves()                min number of moves to solve initial board
 *                                     (return -1 if unsolvable)
 *     Board  solution()             sequence of boards in a shortest solution
 *                                     (null if unsolvable)
 * }
 *
 * To implement the A* algorithm, you must use a MinPQ.
 *
 * http://coursera.cs.princeton.edu/algs4/assignments/8puzzle.html
 */