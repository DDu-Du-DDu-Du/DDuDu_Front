interface DAILY_DDUDU_MOCK_DATA_TYPE {
  [key: string]: { total: number; done: number; rest: number };
}

export const DAILY_DDUDU_MOCK_DATA: DAILY_DDUDU_MOCK_DATA_TYPE = {
  "2024-05-01": { total: 120, done: 4, rest: 116 },
  "2024-05-03": { total: 20, done: 7, rest: 13 },
  "2024-05-04": { total: 20, done: 10, rest: 10 },
  "2024-05-09": { total: 20, done: 12, rest: 8 },
  "2024-05-12": { total: 20, done: 14, rest: 6 },
  "2024-05-21": { total: 20, done: 15, rest: 5 },
  "2024-05-25": { total: 20, done: 20, rest: 0 },
};
