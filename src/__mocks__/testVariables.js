export const unauthorizedToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZUlkIjoyLCJpYXQiOjE1NjY5NTA1NDd9.d9kzTics9W4V0KBmP3IDJffGJFA1c9K96mlkoaKNS1w';
export const authorizedToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkIjoxLCJpYXQiOjE1NjY5NTA0NzN9.54JWrEXHF3fdVG3_vZuXRfNEhoiql4ZwzNaiuBdBhmU';
export const unauthorised = {
  roleId: 2,
  resourceId: 1,
  edit: true,
  read: false
};
export const invalidRoleId = {
  roleId: null,
  resourceId: 1,
  edit: true,
  read: false
};
export const invalidResourceId = {
  roleId: 3,
  resourceId: null,
  edit: true,
  read: false
};
export const invalidResourceId2 = {
  roleId: 3,
  resourceId: 10,
  add: true
};
export const validInput = {
  roleId: 2,
  resourceId: 4,
  edit: true,
  read: false
};
export const validInput2 = {
  roleId: 2,
  resourceId: 4,
  edit: false,
};

export const validInfoRole = {
  roleId: 4,
  email: 'abc123@gmail.com'
};
export const unauthorisedRoleUser = {
  roleId: 1,
  email: 'abc123@gmail.com'
};
export const invalidInfoRole1 = {
  roleId: 2,
  email: ''
};
export const invalidInfoRole2 = {
  roleId: null,
  email: 'abc123@gmail.com'
};
export const invalidInfoRole3 = {
  roleId: 2,
  email: 'samsung123@gmail.com'
};
