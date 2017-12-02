import {tokenize, parse, atom} from './Slip';
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