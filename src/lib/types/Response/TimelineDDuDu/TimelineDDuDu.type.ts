export interface TimelineItemResponse {
  id: number;
  name: string;
  status: "UNCOMPLETED" | "COMPLETE";
  beginAt: string;
  endAt: string;
  goalId: number;
}

export interface TimelineResponse {
  beginAt: string;
  ddudus: TimelineItemResponse[];
}

export interface TimelineListResponse {
  timeline: TimelineResponse[];
}
