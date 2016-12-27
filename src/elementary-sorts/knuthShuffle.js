const knuthShuffle = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    /*
     * Generate a random number between 0 and i.
     * IMPORTANT: do not generate a random number between 0 and length, because
     * this would generate N^N possibilities, whereas a shuffle only has N!
     * permutations. Randomizing from 0 to length would result in a biased
     * shuffling algorithm.
     */
    let rnd = Math.floor((Math.random() * (i + 1)));

    // Swap the element in position i with the element in position rnd
    [arr[i], arr[rnd]] = [arr[rnd], arr[i]];
  }

  return arr;
};

console.log(knuthShuffle([1, 2, 3, 4, 5, 6, 7, 8]));
