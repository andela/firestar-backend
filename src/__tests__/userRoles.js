import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import { unauthorizedToken, authorizedToken } from '../__mocks__/testVariables';

chai.use(chaiHttp);

const { assert } = chai;

describe('Users', () => {
  describe('Set User Role', () => {
    let validInfo, unauthorisedUser, invalidInfo1, invalidInfo2, invalidInfo3;
    beforeEach(() => {
      validInfo = {
        roleId: 4,
        email: 'abc123@gmail.com'
      };
      unauthorisedUser = {
        roleId: 1,
        email: 'abc123@gmail.com'
      };
      invalidInfo1 = {
        roleId: 2,
        email: ''
      };
      invalidInfo2 = {
        roleId: null,
        email: 'abc123@gmail.com'
      };
      invalidInfo3 = {
        roleId: 2,
        email: 'samsung123@gmail.com'
      };
    });
    it('Should return an error for unauthorised users', async () => {
      const res = await chai
        .request(server)
        .patch('/api/v1/roles/user/role')
        .set('x-access-auth', unauthorizedToken)
        .send(unauthorisedUser);

      assert.equal(res.status, 401, 'Should return 401 for unauthorized users');
      assert.equal(res.body.status, 'error', 'Should equal error');
    });

    it('Should return an error for missing role field', async () => {
      const res = await chai
        .request(server)
        .patch('/api/v1/roles/user/role')
        .set('x-access-auth', authorizedToken)
        .send(invalidInfo2);

      assert.equal(
        res.status,
        400,
        'Should return 401 for invalid Role Id input'
      );
      assert.equal(res.body.status, 'error', 'Should equal error');
    });

    it('Should return an error for missing email field', async () => {
      const res = await chai
        .request(server)
        .patch('/api/v1/roles/user/role')
        .set('x-access-auth', authorizedToken)
        .send(invalidInfo1);

      assert.equal(
        res.status,
        400,
        'Should return 400 for invalid email input'
      );
      assert.equal(res.body.status, 'error', 'Should equal error');
    });

    it('Should return an error if email doesnt exist in database', async () => {
      const res = await chai
        .request(server)
        .patch('/api/v1/roles/user/role')
        .set('x-access-auth', authorizedToken)
        .send(invalidInfo3);

      assert.equal(res.status, 404, 'Should return 401 for unauthorized users');
      assert.equal(res.body.status, 'error', 'Should equal error');
    });

    it("Should update user's roleId", async () => {
      const res = await chai
        .request(server)
        .patch('/api/v1/roles/user/role')
        .set('x-access-auth', authorizedToken)
        .send(validInfo);

      assert.equal(
        res.status,
        200,
        'Should return 200 status for successfully operation'
      );
      assert.equal(res.body.status, 'success', 'Should equal success');
      assert.equal(
        res.body.data.roleId,
        validInfo.roleId,
        'Should return the updated role ID'
      );
      assert.equal(
        res.body.data.email,
        validInfo.email,
        'The user with the given email should be updated and returned'
      );
    });
  });
});
