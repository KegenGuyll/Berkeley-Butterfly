import states from "@/data/stateFips.json";

const fipsToState = (fips: string | number): string => {
  return (states as any)[fips];
};

export default fipsToState;
