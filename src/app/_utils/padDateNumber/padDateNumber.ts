const padDateNumber = (dateNumber: number) => {
  if (dateNumber >= 10) {
    return dateNumber;
  }
  return `0${dateNumber}`;
};

export default padDateNumber;
