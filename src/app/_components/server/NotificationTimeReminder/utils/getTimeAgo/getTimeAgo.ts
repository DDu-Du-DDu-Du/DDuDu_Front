import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale("ko");
dayjs.extend(relativeTime);

const getTimeAgo = (inputDate: string) => {
  const currentDate = dayjs();
  const targetDate = dayjs(inputDate);

  if (dayjs(inputDate).isAfter(currentDate)) {
    throw new Error("전달된 시간이 현재 시간보다 미래일 수 없습니다.");
  }

  if (targetDate.isSame(currentDate, "day")) {
    return `오늘 ${targetDate.format("A h:mm")}`;
  } else if (targetDate.isSame(currentDate.subtract(1, "day"), "day")) {
    return `어제 ${targetDate.format("A h:mm")}`;
  }

  return `${targetDate.from(currentDate).replace(/\s+/g, "")} ${targetDate.format("A h:mm")}`;
};

export default getTimeAgo;
