/*
 * DIJKSTRA'S TWO-STACK ALGORITHM FOR EXPRESSION EVALUIATION
 *
 * Takes in a string that represents an arithmetic evaluation, and returns the
 * result of that arithmetic evaluation, following the rules of precedence.
 */

const Stack = require('./Stack');

const evaluate = (str) => {
  const operands = new Stack.Stack();
  const operators = new Stack.Stack();


  str.split(' ').forEach((char) => {
    if (char === ' ' || char === '(') {
      null; // Ignore whitespace and left (opening) parentheses
    } else if (char === '+' || char === '-' || char === '*'
        || char === '/' || char === 'sqrt') {
      operators.push(char); // Push all other operators into the operators stack
    } else if (!isNaN(char)) {
      operands.push(Number(char)); // Push all operands into the operands stack
    } else if (char === ')') {
      /* After encountering a closing parenthesis, pop an operator and the
       * requisite number of operands, and push into the operand stack the
       * result of that computation.
       */
      let operator = operators.pop();
      let value = operands.pop();

      if (operator === '+') {
        value += operands.pop();
      } else if (operator === '-') {
        value = operands.pop() - value;
      } else if (operator === '*') {
        value *= operands.pop();
      } else if (operator === '/') {
        value = operands.pop() / value;
      } else if (operator === 'sqrt') {
        value = Math.sqrt(value);
      }

      operands.push(value);
    }
  });

  return operands.pop();
};

console.log(evaluate('( 1 + ( ( 2 + 3 ) * ( 4 * 5 ) ) )')); // 101
console.log(evaluate('( ( 1 + sqrt ( 5.0 ) ) / 2.0 )')); // 1.618
