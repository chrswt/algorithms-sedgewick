/*
 * Adapted from Algorithms, 4th Edition by Robert Sedgewick
 *
 * RANDOMIZED QUEUE
 * A randomized queue is similar to a stack or queue, except that the item
 * removed is chosen uniformly at random from items in the data structure.
 * Create a generic data type RandomizedQueue that implements the following
 * API:
 *
 * class RandomizedQueue {
 *   constructor()        // constructs an empty randomized queue
 *   isEmpty() bool       // is the queue empty?
 *   size() int           // return the number of items
 *   enqueue(item)        // add an item
 *   dequeue() Item       // remove and return a random item
 *   sample() Item        // return (but do not remove) a random item
 *   iterator()           // iterates through the items in random order
 * }
 *
 * The order of the two or more iterators to the same randomized queue must be
 * mutually independent; each iterator must maintain its own random order. Do
 * not allow the client to add a null item or to sample or dequeue an item from
 * an empty queue. All operations must be in constant amortized time.
 *
 * http://coursera.cs.princeton.edu/algs4/assignments/queues.html
 */

