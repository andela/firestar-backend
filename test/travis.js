import chai from 'chai';
import sayHello from '../src/travis_test';

const { assert } = chai;
describe('Travis ', () => {
  it('Should be equal', () => {
    assert.equal(sayHello(200), 200, 'The values should be equal');
  });
});
