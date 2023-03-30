const InchesToFeet = (height: number) => {
  const feet = Math.floor(height / 12);
  const inches = height - feet * 12;

  return `${feet}' ${inches}"`;
};

export default InchesToFeet;
