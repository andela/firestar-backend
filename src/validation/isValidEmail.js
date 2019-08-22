const isValidEmail = (email) => {
  const re = /^\S+@\S+[\.][0-9a-z]+$/;
  return re.test(email);
};

export default isValidEmail;
