export const isEmpty = (value) => {
  return value.trim().length === 0;
};

export const isNotBetween = (value, minLength, maxLength) => {
  return value.trim().length < minLength || value.trim().length > maxLength;
};

export const isUnderLimit = (limit, value) => {
  return value.trim().length < limit;
};

export const isValidEmail = (value) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(value)
};
