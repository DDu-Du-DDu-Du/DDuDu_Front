export interface TimelineDDuDuItemType {
  id: string | number;
  name: string;
  status: "COMPLETED" | "UNCOMPLETED";
  beginAt: string;
  endAt: string;
  goalId: number | string;
}

export interface TimelineItemType {
  time: string;
  ddudus: TimelineDDuDuItemType[];
}

export interface TimelineListType {
  timeline: TimelineItemType[];
}
