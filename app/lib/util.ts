export function getDateDiff(dateInput: Date) {
  const start = new Date(dateInput);
  const today = new Date();

  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffInMs = start.getTime() - today.getTime();

  const daysTillStart = diffInMs / (1000 * 60 * 60 * 24);
  return daysTillStart;
}
