import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.locale("ko");
dayjs.tz.setDefault("Asia/Seoul");

const getRelativeTime = (utcDateString: string) => {
  if (!dayjs(utcDateString).isValid()) {
    throw new Error("유효하지 않은 날짜 형식입니다.");
  }

  const currentTime = dayjs().tz();
  const followRequestTime = dayjs.tz(utcDateString);

  if (followRequestTime.isAfter(currentTime)) {
    throw new Error("과거 날짜만 입력할 수 있습니다.");
  }

  const diffInSeconds = currentTime.diff(followRequestTime, "second");
  const diffInMinutes = currentTime.diff(followRequestTime, "minute");
  const diffInHours = currentTime.diff(followRequestTime, "hour");
  const diffInDays = currentTime.diff(followRequestTime, "day");
  const diffInMonths = currentTime.diff(followRequestTime, "month");
  const diffInYears = currentTime.diff(followRequestTime, "year");

  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 전`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else if (diffInDays < 30) {
    return `${diffInDays}일 전`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths}개월 전`;
  } else {
    return `${diffInYears}년 전`;
  }
};

export default getRelativeTime;
