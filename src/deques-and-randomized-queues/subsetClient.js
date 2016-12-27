/*
 * Adapted from Algorithms, 4th Edition by Robert Sedgewick
 *
 * SUBSET CLIENT
 * Write a client that takes a command-line integer k; reads in a sequence of N
 * strings, and prints out exactly k of them, uniformly at random. Each item
 * from the sequence can be printed out at most once. You may assume that
 * 0 <= k <= n, where n is the number of strings in the input.
 *
 * The running time of Subset must be linear with respect to the size of the
 * input. You may use only a constant amount of memory plus either one of Deque
 * or RandomizedQueue object of maximum size of at most n, where n is the
 * number of strings in the standard input.
 *
 * http://coursera.cs.princeton.edu/algs4/assignments/queues.html
 */

const RandomizedQueue = require('./RandomizedQueue');

const subsetClient = (str, k) => {
  let rq = new RandomizedQueue.RandomizedQueue();

  str.split(' ').forEach((subStr) => {
    rq.enqueue(subStr);
  });

  for (let i = 0; i < k; i++) {
    console.log(rq.dequeue());
  }
};

subsetClient('A B C D E F G H I', 3);
subsetClient('AA BB BB BB BB BB CC CC', 8);
