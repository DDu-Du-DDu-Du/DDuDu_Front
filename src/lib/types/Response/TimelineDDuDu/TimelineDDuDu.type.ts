export interface TimelineItemResponse {
  id: string | number;
  name: string;
  status: "COMPLETED" | "UNCOMPLETED";
  beginAt: string;
  endAt: string;
  goalId: number | string;
}

export interface TimelineResponse {
  time: string;
  ddudus: TimelineItemResponse[];
}

export interface TimelineListResponse {
  timeline: TimelineResponse[];
}
