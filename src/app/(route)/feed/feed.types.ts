export type MainGoalType = {
  id: number;
  name: string;
  color: string;
};

export type MainDDuDusType = {
  id: number;
  name: string;
  status: "COMPLETE" | "UNCOMPLETED";
};

export interface MainGoalItemType {
  goal: MainGoalType;
  ddudus: MainDDuDusType[];
}
