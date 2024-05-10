export interface TimeLineDDuDuItemType {
  id: string | number;
  name: string;
  status: "COMPLETED" | "UNCOMPLETED";
  beginAt: string;
  endAt: string;
  goalId: number | string;
}

export interface TimeLineItemType {
  time: string;
  ddudus: TimeLineDDuDuItemType[];
}

export interface TimeLineListType {
  timeline: TimeLineItemType[];
}
