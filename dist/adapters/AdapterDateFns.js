// src/adapters/AdapterDateFns.ts
import {
  addDays,
  addMonths,
  startOfMonth,
  isSameMonth,
  isValid,
  endOfMonth,
  format,
  startOfWeek,
  endOfWeek,
  isBefore,
  isAfter,
  isSameDay,
  isWeekend,
  eachDayOfInterval,
  differenceInCalendarMonths
} from "date-fns";
import enUS from "date-fns/locale/en-US";
var AdapterDateFns = (props) => {
  const defaultFormats = {
    weekday: "E",
    month: "MMMM, yyyy",
    monthDay: "MM-d",
    day: "d"
  };
  const locale = props.locale || enUS;
  const weekStartsOn = props.weekStartsOn || locale.options?.weekStartsOn;
  return {
    defaultFormats,
    today: /* @__PURE__ */ new Date(),
    isValid: (value) => isValid(value),
    addMonths: (value, amount) => addMonths(value, amount),
    addDays: (value, amount) => addDays(value, amount),
    startOfMonth: (value) => startOfMonth(value),
    endOfMonth: (value) => endOfMonth(value),
    startOfWeek: (value) => startOfWeek(value, { locale, weekStartsOn }),
    endOfWeek: (value) => endOfWeek(value, { locale, weekStartsOn }),
    daysInRange: (start, end) => eachDayOfInterval({ start, end }),
    removeOutMonthDays: (days, date) => days.map((d) => isSameMonth(date, d) ? d : null),
    weekdays: (formatString = defaultFormats.weekday) => {
      const start = startOfWeek(/* @__PURE__ */ new Date(), {
        locale,
        weekStartsOn
      });
      return Array.from(
        { length: 7 },
        (_, i) => format(addDays(start, i), formatString, { locale, weekStartsOn })
      );
    },
    format: (value, formatKey, formatString) => format(value, formatString || defaultFormats[formatKey], {
      locale,
      weekStartsOn
    }),
    isBefore: (value, comparing) => isBefore(value, comparing),
    isAfter: (value, comparing) => isAfter(value, comparing),
    isSameDay: (value, comparing) => isSameDay(value, comparing),
    isToday: (value) => isSameDay(value, /* @__PURE__ */ new Date()),
    isWeekend: (value) => isWeekend(value),
    differenceInMonths: (value, comparing) => differenceInCalendarMonths(value, comparing)
  };
};
export {
  AdapterDateFns
};
