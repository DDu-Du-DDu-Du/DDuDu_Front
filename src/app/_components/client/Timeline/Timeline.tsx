"use client";

import { useMemo } from "react";

import { MainTimeTableType } from "@/app/_types/response/feed/feed";
import { getDayOfWeek } from "@/app/_utils";

import { LineBox, TimelineItem } from "./components";

interface TimelineProps {
  timeline: MainTimeTableType[];
  selectedDDuDuDate: string;
}

const Timeline = ({ timeline, selectedDDuDuDate }: TimelineProps) => {
  const selectedDay = useMemo(() => {
    const day = selectedDDuDuDate.split("-").at(-1);
    return day;
  }, [selectedDDuDuDate]);

  const timeToMinutes = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    return hour * 60 + minute;
  };

  const sortedTimeline =
    timeline &&
    timeline.slice().sort((timeA, timeB) => {
      return timeToMinutes(timeA.beginAt) - timeToMinutes(timeB.beginAt);
    });

  return (
    <article className="w-full pb-[3rem] px-[2.4rem] ">
      <span className="block text-center text-size11 pt-[1.5rem] pb-[2rem]">
        {Number(selectedDay)}일 {getDayOfWeek(selectedDDuDuDate)}요일
      </span>
      {timeline.length > 0 ? (
        <ul className="relative flex w-full min-w-[20rem] flex-col gap-[4rem]">
          <LineBox />

          {sortedTimeline.map(({ beginAt, ddudus }, index) => (
            <TimelineItem
              key={`${beginAt}${index}`}
              baseTime={beginAt}
              dduduList={ddudus}
              selectedDDuDuDate={selectedDDuDuDate}
            />
          ))}
        </ul>
      ) : (
        <div className="text-center text-size13 text-example_gray_800">
          시간 설정된 투두 리스트가 존재하지 않습니다.
        </div>
      )}
    </article>
  );
};

export default Timeline;
