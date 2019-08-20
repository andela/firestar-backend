const isValidEmail = email => {
  let re = /^\S+@\S+[\.][0-9a-z]+$/;
  return re.test(email);
};

export default isValidEmail;
