/**
 * Adapted from Peter Norvig's lis.py interpreter
 * found at norgiv.com/lispy.html
 */

/**
 * @param chars: string
 * @return string[]
 */
export function tokenize(chars) {
  return chars.replace(/\(/g, ' ( ')
              .replace(/\)/g, ' ) ')
              .split(' ')
              .filter( v => v !== '');
}


export function parse(program) {
  return readFromTokens(tokenize(program));
}

export function readFromTokens(tokens) {
  if (tokens.length === 0)
    throw new SyntaxError('Unexpected EOF');
  
  var token = tokens.shift();
  if (token === undefined) 
  return ''; //This is to appease the type-checker.. better way?
  else if (token === '('){
    var L = [];
    while (tokens[0] !== ')') 
      L.push(readFromTokens(tokens));
    tokens.shift(); //kicks out ')'
    return L;
  }
  else if (token === ')')
    throw new SyntaxError('Unexpected )');
  else
    return atom(token) 
}

export function atom(token) {
  var num = Number(token);
  if (!isNaN(num))
    return num;
  else
    return token;
}

let Env = {
  names: {
    
  },
  procedures: {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  '>': (a, b) => a > b,
  '<': (a, b) => a < b,
  '>=': (a, b) => a >= b,
  '<=': (a, b) => a <= b,
  '=': (a, b) => a === b,
  }
}

function slip (programInput) {

}



export default slip;