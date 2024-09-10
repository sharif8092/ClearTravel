export const validatePassword = (password) => {
  const regex = /^.{4}$/ ;

  return regex.test(password);
};