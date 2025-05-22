export const isValidNumber = (value) => {
  const numRegex = /^\d*$/;
  return numRegex.test(value);
};
