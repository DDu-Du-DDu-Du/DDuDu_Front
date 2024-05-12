/**
 * 두 날짜 범위를 문자열로 형식화하는 함수
 * @param startDate - 시작 날짜 (string 타입)
 * @param endDate - 종료 날짜 (string 타입)
 * @returns 날짜 범위를 나타내는 문자열
 * @throws Error - endDate가 startDate보다 빠른 경우 에러 발생
 */
const formatDateRange = (startDate: string, endDate: string): string => {
  // 전달 받은 string 데이터를 ISO 형식의 날짜 문자열로 변환
  const isoStartDate = new Date(startDate).toISOString().split("T")[0];
  const isoEndDate = new Date(endDate).toISOString().split("T")[0];

  if (new Date(isoEndDate) < new Date(isoStartDate)) {
    throw new Error("종료 날짜는 시작 날짜보다 이전일 수 없습니다.");
  }

  if (isoStartDate === isoEndDate) {
    return isoStartDate.replace(/-/g, ".");
  } else {
    return `${isoStartDate.replace(/-/g, ".")} ~ ${isoEndDate.replace(/-/g, ".")}`;
  }
};

export default formatDateRange;
