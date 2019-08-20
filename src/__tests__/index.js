import { equal } from 'assert';
import dotenv from 'dotenv';

dotenv.config();
process.env.NODE_ENV = 'test';

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
