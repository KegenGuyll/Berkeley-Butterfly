function roundNumber(number: number, decimal_digit: number) {
  const powerOften = 10 ** decimal_digit;
  const result = Math.round(number * powerOften) / powerOften;
  return result;
}

export default roundNumber;
