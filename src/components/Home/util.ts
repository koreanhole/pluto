import { parse, differenceInDays, format } from "date-fns";

export function getDescriptiveDateDifference(date: string) {
  const parsedDateTime = parse(date, "yyyy-MM-dd", new Date());
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

export function getFormattedDateString(date: Date) {
  return format(date, "yyyy-MM-dd");
}
