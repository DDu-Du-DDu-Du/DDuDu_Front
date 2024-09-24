const convertCurrentDate = (type: "next" | "prev", currentYear: number, currentMonth: number) => {
  let year = currentYear;
  let month = currentMonth;

  if (type === "next") {
    year = currentMonth + 1 > 12 ? currentYear + 1 : currentYear;
    month = currentMonth + 1 > 12 ? 1 : currentMonth + 1;
  } else if (type === "prev") {
    year = currentMonth - 1 < 1 ? currentYear - 1 : currentYear;
    month = currentMonth - 1 < 1 ? 12 : currentMonth - 1;
  }

  return { year, month };
};

export default convertCurrentDate;
