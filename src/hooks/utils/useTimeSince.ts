import React, { useEffect } from "react";

interface TimeSinceFormatOptions {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
}

type ReturnTypes = string | number;

const useTimeSince = (
  date: Date | string,
  asString?: boolean,
  format?: TimeSinceFormatOptions
): ReturnTypes => {
  const formatedDate = date instanceof Date ? date : new Date(date);
  const formatedReturnType = asString ? "string" : "number";
  const formated = format
    ? format
    : ({
        year: "y",
        month: "m",
        day: "d",
        hour: "h",
        minute: "m",
        second: "s",
      } as TimeSinceFormatOptions);

  const [timeSince, setTimeSince] = React.useState(
    timeDifference(formatedDate, formated, formatedReturnType)
  );

  useEffect(() => {
    setTimeSince(timeDifference(formatedDate, formated, formatedReturnType));
  }, [date, format]);

  return timeSince;
};

function timeDifference<T extends ReturnTypes>(
  date: Date,
  format: TimeSinceFormatOptions,
  returnType: T
): ReturnTypes {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = new Date().getTime() - date.getTime();

  if (returnType === "string") {
    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + format.second;
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + format.minute;
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + format.hour;
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + format.day;
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + format.month;
    } else {
      return Math.round(elapsed / msPerYear) + format.year;
    }
  } else {
    return Math.round(elapsed / 1000);
  }
}

export default useTimeSince;
