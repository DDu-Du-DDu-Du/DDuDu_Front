const validateEndTime = (endTime: string, startTime: string): boolean => {
  const [startHour, startMin] = startTime.split(":").map(Number);
  const [endHour, endMin] = endTime.split(":").map(Number);

  const startAt = startHour * 60 + startMin;
  const endAt = endHour * 60 + endMin;

  return startAt <= endAt;
};

export default validateEndTime;
