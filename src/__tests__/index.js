import { equal } from 'assert';
import arrayTest from '../utils/index';

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      equal(arrayTest([1, 2, 3], 4), -1);
    });
  });
});
