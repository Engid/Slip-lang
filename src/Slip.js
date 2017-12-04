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
    return ''; 
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

export function stdEnv() {
  //Add Math constants

  let Env = {
    names: {

    },
    procedures: {
      //Math 
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,

      //Logic
      '>': (a, b) => a > b,
      '<': (a, b) => a < b,
      '>=': (a, b) => a >= b,
      '<=': (a, b) => a <= b,
      '=': (a, b) => a === b,
    }
  }
  return Env;
}

var global_env = stdEnv();

/**
 * 
 * @param {number | string | array} exp 
 * @param {object} env 
 */
export function slipEval(exp, env=global_env) {
  //console.log(first)
  //console.log(rest)

  //First two tests handle if exp is a Symbol
  //A symbol is either a number or a name:value binding
  //TODO: implement strings as Symbols. 
  //TODO: allow names to be functions to handle:
  //  (def f (func-returning-function))
  if(env.names[exp]) {
    return env.names[exp]
  }
  else if(typeof exp === 'number') {
    return exp
  }

  //SPECIAL FORMS
  else if (exp[0] === 'if'){
    var [_, test, conseq, alt] = exp;
    var newExp = slipEval(test, env) ? conseq : alt;
    return slipEval(newExp, env);  
  }
  else if (exp[0] === 'define'){
    var [_, symbol, valExp] = exp
    return env.names[symbol] = slipEval(valExp, env);
  }

  //Handles procedure calls
  //So far names cannot hold functions and there
  //isn't a way to define new functions. 
  else if(typeof env.procedures[exp[0]] === 'function'){
    var first, rest;
    [first, ...rest] = exp;
    
    var proc = env.procedures[first];
    
    return proc.apply(null, rest.map((v) => {
        //console.log(v)
        return slipEval(v, env)
      }));
  } 
  else if(!env.names[exp] || !env.procedures[exp]) {
    throw new SyntaxError(exp + ' not defined')
    return;
  }
  
  

    

}

function slip (programInput) {

}



export default slip;