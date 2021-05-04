import { parseISO, differenceInDays, format } from "date-fns";

export function getDescriptiveDateDifference(date: string): string {
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

export function isoDateToKorean(date: string): string {
  const parsedDateTime = parseISO(date);

  return format(parsedDateTime, "yyyy년 M월dd일");
}
