export const shortenNumber = (num: number) => {
  if (num > 1e19) {
    throw new RangeError("Input expected to be < 1e19");
  }

  if (num < -1e19) {
    throw new RangeError("Input expected to be > -1e19");
  }

  if (Math.abs(num) < 1000) {
    return num;
  }

  let shortNumber: string;
  let size, exponent;
  const sign = num < 0 ? "-" : "";
  const suffixes = {
    K: 6,
    M: 9,
    B: 12,
    T: 16,
  };

  num = Math.abs(num);
  size = Math.floor(num).toString().length;

  exponent = size % 3 === 0 ? size - 3 : size - (size % 3);
  shortNumber = (
    Math.round(10 * (num / Math.pow(10, exponent))) / 10
  ).toString();

  for (const suffix in suffixes) {
    if (exponent < suffixes[suffix]) {
      shortNumber += suffix;
      break;
    }
  }

  return sign + shortNumber;
};
