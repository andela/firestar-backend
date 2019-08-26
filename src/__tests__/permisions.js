import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);

const { assert } = chai;

describe('Set Role Permissions', () => {
  let unauthorised, invalidRoleId, invalidResourceId, validInput;
  beforeEach(() => {
    unauthorised = {
      id: 3,
      roleId: 4,
      resourceId: 1,
      edit: true,
      read: false
    };
    invalidRoleId = {
      id: 1,
      roleId: null,
      resourceId: 1,
      edit: true,
      read: false
    };
    invalidResourceId = {
      id: 1,
      roleId: 3,
      resourceId: null,
      edit: true,
      read: false
    };
    validInput = {
      id: 1,
      roleId: 2,
      resourceId: 1,
      edit: true,
      read: false
    };
  });
  it('Should return an error for unauthorized persons', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/roles/${unauthorised.roleId}/permissions`)
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
      .send(invalidResourceId);

    assert.equal(
      res.status,
      400,
      'It should return a response status of 400'
    );
    assert.equal(res.body.status, 'error', 'Should equal error');
  });

  it('Should call next if role inherits permission from parent role', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/roles/${invalidResourceId.roleId}/permissions`)
      .send(invalidResourceId);

    assert.equal(
      res.status,
      400,
      'It should return a response status of 400'
    );
    assert.equal(res.body.status, 'error', 'Should equal error');
  });

  it('Should set the permission of a given Role', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/roles/${validInput.roleId}/permissions`)
      .send(validInput);

    assert.equal(
      res.status,
      200,
      'It should return a response status of 200'
    );
    assert.equal(res.body.status, 'success', 'Should equal success');
  });
});
