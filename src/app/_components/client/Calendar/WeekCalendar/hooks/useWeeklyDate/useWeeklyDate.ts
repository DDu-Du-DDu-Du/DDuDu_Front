import { MonthlyWeeklyDDuDuType } from "@/app/_types/response/feed/feed";
import { padDateNumber } from "@/app/_utils";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface UseWeeklyDateProps {
  weeklyDDuDus: MonthlyWeeklyDDuDuType[];
}

const useWeeklyDate = ({ weeklyDDuDus }: UseWeeklyDateProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleDateClick = (seletedDate: string) => {
    let queryString = searchParams.toString();
    const deleteParamIndex = searchParams.toString().indexOf("&date=");

    if (deleteParamIndex > -1) {
      queryString = searchParams.toString().slice(0, deleteParamIndex);
    }

    const currentURL = `${pathname}?${queryString}`;

    router.replace(`${currentURL}&date=${seletedDate}`);
  };

  const handleNextWeek = () => {
    const selectedWeekLastDay = weeklyDDuDus.at(-1)?.date;

    if (!selectedWeekLastDay) {
      return;
    }

    const [year, month, day] = selectedWeekLastDay.split("-").map(Number);

    const lastDay = new Date(year, month, 0).getDate();

    let queryString = searchParams.toString();
    const deleteParamIndex = searchParams.toString().indexOf("&date=");

    if (deleteParamIndex > -1) {
      queryString = searchParams.toString().slice(0, deleteParamIndex);
    }

    const currentURL = `${pathname}?${queryString}`;

    if (day + 1 > lastDay) {
      if (month === 12) {
        router.replace(`${currentURL}&date=${year + 1}-01-01`);
      } else {
        router.replace(`${currentURL}&date=${year}-${padDateNumber(month + 1)}-01`);
      }
    } else {
      router.replace(
        `${currentURL}&date=${year}-${padDateNumber(month)}-${padDateNumber(day + 1)}`,
      );
    }
  };

  const handlePreviousWeek = () => {
    const selectedWeekLastDay = weeklyDDuDus[0]?.date;

    if (!selectedWeekLastDay) {
      return;
    }

    const [year, month, day] = selectedWeekLastDay.split("-").map(Number);

    let queryString = searchParams.toString();
    const deleteParamIndex = searchParams.toString().indexOf("&date=");

    if (deleteParamIndex > -1) {
      queryString = searchParams.toString().slice(0, deleteParamIndex);
    }

    let prevMonthLastDay = 31;
    if (month - 1 > 0) {
      prevMonthLastDay = new Date(year, month - 1, 0).getDate();
    }
    const currentURL = `${pathname}?${queryString}`;

    if (day - 1 < 1) {
      if (month === 1) {
        router.replace(`${currentURL}&date=${year - 1}-12-${prevMonthLastDay}`);
      } else {
        router.replace(
          `${currentURL}&date=${year}-${padDateNumber(month - 1)}-${prevMonthLastDay}`,
        );
      }
    } else {
      router.replace(
        `${currentURL}&date=${year}-${padDateNumber(month)}-${padDateNumber(day - 1)}`,
      );
    }
  };

  return { handleDateClick, handlePreviousWeek, handleNextWeek };
};

export default useWeeklyDate;
