import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import {
  unauthorizedToken, authorizedToken, validInfoRole, unauthorisedRoleUser, invalidInfoRole1,
  invalidInfoRole2, invalidInfoRole3
} from '../__mocks__/testVariables';

chai.use(chaiHttp);

const { assert } = chai;

describe('Users', () => {
  describe('Set User Role', () => {
    it('Should return an error for unauthorised users', async () => {
      const res = await chai
        .request(server)
        .patch('/api/v1/users/abc123@gmail.com/role')
        .set('x-auth-access', unauthorizedToken)
        .send(unauthorisedRoleUser);

      assert.equal(res.status, 401, 'Should return 401 for unauthorized users');
      assert.equal(res.body.status, 'error', 'Should equal error');
    });

    it('Should return an error for missing role field', async () => {
      const res = await chai
        .request(server)
        .patch('/api/v1/users/abc123@gmail.com/role')
        .set('x-auth-access', authorizedToken)
        .send(invalidInfoRole2);

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
        .patch('/api/v1/users/abc123@gmail.com/role')
        .set('x-auth-access', authorizedToken)
        .send(invalidInfoRole1);

      assert.equal(
        res.status,
        400,
        'Should return 400 for invalid email input'
      );
      assert.equal(res.body.status, 'error', 'Should equal error');
    });

    it("Should return an error if email doesn't exist in database", async () => {
      const res = await chai
        .request(server)
        .patch('/api/v1/users/nonexistingemail@gmail.com/role')
        .set('x-auth-access', authorizedToken)
        .send(invalidInfoRole3);

      assert.equal(res.status, 404, 'Should return 401 for unauthorized users');
      assert.equal(res.body.success, false, 'Should equal error');
    });

    it("Should update user's roleId", async () => {
      const res = await chai
        .request(server)
        .patch('/api/v1/users/abc123@gmail.com/role')
        .set('x-auth-access', authorizedToken)
        .send(validInfoRole);

      assert.equal(
        res.status,
        200,
        'Should return 200 status for successfully operation'
      );
      assert.equal(res.body.status, 'success', 'Should equal success');
      assert.equal(
        res.body.data.roleId,
        validInfoRole.roleId,
        'Should return the updated role ID'
      );
      assert.equal(
        res.body.data.email,
        validInfoRole.email,
        'The user with the given email should be updated and returned'
      );
    });
  });
});
