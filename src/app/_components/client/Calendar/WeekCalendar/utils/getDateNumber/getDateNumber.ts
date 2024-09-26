const getDateNumber = (dateString: string) => {
  const day = dateString.split("-").at(-1);

  if (!day) {
    throw new Error("dateString 값이 정상적이지 않습니다.");
  }

  return Number(day);
};

export default getDateNumber;
