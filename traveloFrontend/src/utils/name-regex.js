export const validateName = (name) => {
  const regex = /^[a-zA-Z0-9]{3,15}$/ ;    //Username can only contain alphanumeric characters (letters and numbers).
                                           // Username should be between 3 and 15 characters long.
  return regex.test(name);
};


