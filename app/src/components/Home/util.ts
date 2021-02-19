import { parse, differenceInDays, format, getDay, parseISO } from "date-fns";

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

export function getFormattedDateString(date: string) {
  return format(parseISO(date), "yyyy-MM-dd");
}

export function getLocalizedDay(date: string) {
  const parsedDateTime = parse(date, "yyyy-MM-dd", new Date());
  const dayInNumber = getDay(parsedDateTime);

  switch (dayInNumber) {
    case 0:
      return "일";
    case 1:
      return "월";
    case 2:
      return "화";
    case 3:
      return "수";
    case 4:
      return "목";
    case 5:
      return "금";
    case 6:
      return "토";
  }
}
