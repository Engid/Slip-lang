import {tokenize, parse, atom, stdEnv, slipEval} from './Slip';
//import Tokenizer from './tokenizer';

it("tokenizes", () => {
  expect(tokenize("(+ 1 2)"))
    .toEqual([ '(', '+', '1', '2', ')']);
  expect(tokenize('(+ (- 1 2) 3)'))
    .toEqual(['(', '+', '(', '-', '1', '2', ')', '3', ')', ]);
})


it('atomizes', () => {
  expect(atom('3'))
  .toEqual(3)
  expect(atom('*'))
    .toEqual('*')
});

it('parses', () => {
  expect(parse("(begin (define r 10) (* pi (* r r)))"))
    .toEqual(['begin', ['define', 'r', 10], ['*', 'pi', ['*', 'r', 'r']]]);
})

it('calls', () => {
  var env = stdEnv();
  //console.log(env)
  expect(env.procedures['*'](1,2)).toEqual(2);
})

it('evals', () => {
  var env = stdEnv()


  expect(slipEval(['*', 2, 2], env)).toEqual(4)

  /**
   * extra args are silently ignored. Fix??
   */
  expect(slipEval(['+', 1, 2, 3]), env)
    .toEqual(3)


  expect(slipEval(parse("(+ (- 1 2) 3)")))
    .toEqual(2);

  expect(slipEval(parse("(if (> 2 1) (- 2 1) (+ 2 1))")))
    .toEqual(1);

  expect(slipEval(parse("(define two (+ (- 1 2) 3))")))
    .toEqual(2);
  
  /**
   * calling an undefined name throws SyntaxError
   
  function wat() {slipEval(['wat', 1, 2])}
  expect(wat)
    .toThrow('wat not defined');
  */
})