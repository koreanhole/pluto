import { parseISO, differenceInDays } from "date-fns";

export function getDescriptiveDateDifference(date: string) {
  const parsedDateTime = parseISO(date);
  const dateDifference = differenceInDays(new Date(), parsedDateTime);

  if (dateDifference < 1) {
    return "오늘";
  } else if (dateDifference < 2) {
    return "어제";
  } else if (dateDifference < 3) {
    return "그저께";
  } else {
    return `${dateDifference}일전`;
  }
}
