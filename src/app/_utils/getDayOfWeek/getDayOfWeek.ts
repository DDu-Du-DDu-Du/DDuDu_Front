const getDayOfWeek = (dateString: string) => {
  const daysInKorean = ["일", "월", "화", "수", "목", "금", "토"];
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("유효하지 않은 날짜 형식입니다.");
  }

  const dayOfWeek = date.getDay();
  return daysInKorean[dayOfWeek];
};

export default getDayOfWeek;
