import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import { unauthorizedToken, authorizedToken } from '../__mocks__/testVariables';


chai.use(chaiHttp);

const { assert } = chai;

describe('Set Role Permissions', () => {
  let unauthorised, invalidRoleId, invalidResourceId, validInput, validInput2;
  beforeEach(() => {
    unauthorised = {
      roleId: 2,
      resourceId: 1,
      edit: true,
      read: false
    };
    invalidRoleId = {
      roleId: null,
      resourceId: 1,
      edit: true,
      read: false
    };
    invalidResourceId = {
      roleId: 3,
      resourceId: null,
      edit: true,
      read: false
    };
    validInput = {
      roleId: 2,
      resourceId: 4,
      edit: true,
      read: false
    };
    validInput2 = {
      roleId: 2,
      resourceId: 4,
      edit: false,
    };
  });
  it('Should return an error for unauthorized persons', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/roles/${unauthorised.roleId}/permissions`)
      .set('x-access-auth', unauthorizedToken)
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
      .set('x-access-auth', authorizedToken)
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
      .set('x-access-auth', authorizedToken)
      .send(invalidResourceId);

    assert.equal(
      res.status,
      400,
      'It should return a response status of 400'
    );
    assert.equal(res.body.status, 'error', 'Should equal error');
  });
  it('Should return an error  resource that does not exist', async () => {
    const req = {
      roleId: 3,
      resourceId: 25,
      add: true
    };
    const res = await chai
      .request(server)
      .patch(`/api/v1/roles/${req.roleId}/permissions`)
      .set('x-access-auth', authorizedToken)
      .send(req);

    assert.equal(
      res.status,
      404,
      'It should return a response status of 400'
    );
    assert.equal(res.body.status, 'error', 'Should equal error');
  });

  it('Should return an error for invalid resource Id', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/roles/${invalidResourceId.roleId}/permissions`)
      .set('x-access-auth', authorizedToken)
      .send(invalidResourceId);

    assert.equal(
      res.status,
      400,
      'It should return a response status of 400'
    );
    assert.equal(res.body.status, 'error', 'Should equal error');
  });

  it('Should create the permission of a given Role', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/roles/${validInput.roleId}/permissions`)
      .set('x-access-auth', authorizedToken)
      .send(validInput);
    assert.equal(
      res.status,
      200,
      'It should return a response status of 200'
    );
    assert.equal(res.body.status, 'success', 'Should equal success');
  });

  it('Should create the permission of a given Role', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/roles/${validInput.roleId}/permissions`)
      .set('x-access-auth', authorizedToken)
      .send(validInput2);
    assert.equal(
      res.status,
      200,
      'It should return a response status of 200'
    );
    assert.equal(res.body.status, 'success', 'Should equal success');
  });
});
