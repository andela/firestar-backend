import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import {
  unauthorizedToken, authorizedToken, unauthorised,
  invalidRoleId, invalidResourceId, validInput, validInput2, invalidResourceId2
} from '../__mocks__/testVariables';

chai.use(chaiHttp);

const { assert } = chai;

describe('Set Role Permissions', () => {
  it('Should return an error for unauthorized persons', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/roles/${unauthorised.roleId}/permissions`)
      .set('x-auth-access', unauthorizedToken)
      .send(unauthorised);

    assert.equal(
      res.status,
      401,
      'It should return a response status of 401'
    );
    assert.equal(res.body.status, 'error', 'Should equal error');
  });

  it('Should return an error for invalid or missing roleId input', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/roles/${invalidRoleId.roleId}/permissions`)
      .set('x-auth-access', authorizedToken)
      .send(invalidRoleId);

    assert.equal(
      res.status,
      400,
      'It should return a response status of 400'
    );
    assert.equal(res.body.status, 'error', 'Should equal error');
  });

  it('Should return an error for invalid or missing resourceId input', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/roles/${invalidResourceId.roleId}/permissions`)
      .set('x-auth-access', authorizedToken)
      .send(invalidResourceId);

    assert.equal(
      res.status,
      400,
      'It should return a response status of 400'
    );
    assert.equal(res.body.status, 'error', 'Should equal error');
  });
  it('Should return an error for resource that does not exist', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/roles/${invalidResourceId2.roleId}/permissions`)
      .set('x-auth-access', authorizedToken)
      .send(invalidResourceId2);
    assert.equal(
      res.status,
      404,
      'It should return a response status of 400'
    );
    assert.equal(res.body.success, false, 'Should equal error');
  });

  it('Should return an error for invalid resource Id', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/roles/${invalidResourceId.roleId}/permissions`)
      .set('x-auth-access', authorizedToken)
      .send(invalidResourceId);

    assert.equal(
      res.status,
      400,
      'It should return a response status of 400'
    );
    assert.equal(res.body.status, 'error', 'Should equal error');
  });

  it('Should Create the permission of a given Role', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/roles/${validInput.roleId}/permissions`)
      .set('x-auth-access', authorizedToken)
      .send(validInput);
    assert.equal(
      res.status,
      201,
      'It should return a response status of 200'
    );
    assert.equal(res.body.status, 'success', 'Should equal success');
  });

  it('Should Set the permission of a given Role', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/roles/${validInput.roleId}/permissions`)
      .set('x-auth-access', authorizedToken)
      .send(validInput2);
    assert.equal(
      res.status,
      200,
      'It should return a response status of 200'
    );
    assert.equal(res.body.status, 'success', 'Should equal success');
  });
});
