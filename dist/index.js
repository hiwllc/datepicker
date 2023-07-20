// src/calendar.tsx
import { useMultiStyleConfig, Flex } from "@chakra-ui/react";

// src/context.tsx
import { createContext, useContext } from "react";
var CalendarContext = createContext(null);
var useCalendarContext = () => {
  const calendarContext = useContext(CalendarContext);
  if (calendarContext === null) {
    throw new Error("Something went wrong");
  }
  return calendarContext;
};

// src/useCalendar.ts
import { useMemo, useState } from "react";
function useCalendar({
  start,
  months = 1,
  blockFuture,
  allowOutsideDays,
  adapter
}) {
  const initialState = blockFuture ? adapter.addMonths(start, -1) : start;
  const [date, setDate] = useState(initialState);
  const actions = useMemo(
    function actionsFn() {
      const nextMonth = () => setDate((prevSet) => adapter.addMonths(prevSet, 1));
      const prevMonth = () => setDate((prevSet) => adapter.addMonths(prevSet, -1));
      const resetDate = () => setDate(initialState);
      const dates = Array.from({ length: months }, (_, i) => {
        const month = adapter.addMonths(date, i);
        const startDateOfMonth = adapter.startOfMonth(month);
        const endDateOfMonth = adapter.endOfMonth(month);
        const startWeek = adapter.startOfWeek(startDateOfMonth);
        const endWeek = adapter.endOfWeek(endDateOfMonth);
        const days = adapter.daysInRange(startWeek, endWeek);
        return {
          startDateOfMonth,
          endDateOfMonth,
          startWeek,
          endWeek,
          days: allowOutsideDays ? days : adapter.removeOutMonthDays(days, month)
        };
      });
      return {
        nextMonth,
        prevMonth,
        resetDate,
        dates
      };
    },
    [allowOutsideDays, date, initialState, months]
  );
  return {
    startDate: date,
    ...actions
  };
}

// src/types.ts
var Target = /* @__PURE__ */ ((Target2) => {
  Target2["START"] = "start";
  Target2["END"] = "end";
  return Target2;
})(Target || {});

// src/adapters/index.tsx
import { createContext as createContext2, useContext as useContext2 } from "react";
import { jsx } from "react/jsx-runtime";
var CalendarAdapterContext = createContext2(null);
var CalendarAdapterProvider = (props) => {
  const { adapter, children } = props;
  const contextValue = {
    adapter
  };
  return /* @__PURE__ */ jsx(CalendarAdapterContext.Provider, { value: contextValue, children });
};
var useAdapter = (props) => {
  const adapterContext = useContext2(CalendarAdapterContext);
  if (adapterContext === null) {
    throw new Error(
      "It looks like you forgot to wrap your component in CalendarAdapterProvider."
    );
  }
  if (!adapterContext.adapter) {
    throw new Error(
      "It looks like you forgot to pass a `adapter` to your CalendarAdapterProvider."
    );
  }
  return adapterContext.adapter({
    locale: props.locale,
    weekStartsOn: props.weekStartsOn
  });
};

// src/calendar.tsx
import { useEffect, useRef } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function isSingleMode(props) {
  return !!props.singleDateSelection;
}
function Calendar(props) {
  const styles = useMultiStyleConfig("Calendar", {});
  const adapter = useAdapter({
    locale: props.locale,
    weekStartsOn: props.weekStartsOn
  });
  const { resetDate, ...values } = useCalendar({
    allowOutsideDays: props.allowOutsideDays,
    blockFuture: false,
    start: (isSingleMode(props) ? props.value : props.value?.start) || adapter.today,
    months: props.months,
    adapter
  });
  const target = useRef("start" /* START */);
  useEffect(() => {
    const date = isSingleMode(props) ? props.value : props.value?.start;
    if (date && adapter.isValid(date)) {
      resetDate();
    }
  }, [props.value]);
  const selectDateHandler = (date) => {
    if (props.customSelectHandler) {
      return props.customSelectHandler(date, {
        currentValue: props.value,
        // @ts-expect-error not sure how to pass proper type here
        onSelectDate: props.onSelectDate,
        adapter,
        target: target.current,
        changeTarget: (t) => target.current = t
      });
    }
    if (isSingleMode(props)) {
      return props.onSelectDate(date);
    }
    if (props.weekDateSelection) {
      return props.onSelectDate({
        start: adapter.startOfWeek(date),
        end: adapter.endOfWeek(date)
      });
    }
    if (!props.allowSelectSameDay && (props.value?.start && adapter.isSameDay(date, props.value.start) || props.value?.end && adapter.isSameDay(date, props.value.end))) {
      return;
    }
    if (props.value?.start && adapter.isBefore(date, props.value.start)) {
      return props.onSelectDate({ ...props.value, start: date });
    }
    if (props.value?.end && adapter.isAfter(date, props.value.end)) {
      return props.onSelectDate({ start: props.value.start, end: date });
    }
    if (target.current === "end" /* END */) {
      target.current = "start" /* START */;
      return props.onSelectDate({ start: props.value.start, end: date });
    }
    target.current = "end" /* END */;
    return props.onSelectDate({ ...props.value, start: date });
  };
  return /* @__PURE__ */ jsx2(
    CalendarContext.Provider,
    {
      value: {
        ...values,
        onSelectDates: selectDateHandler,
        startSelectedDate: isSingleMode(props) ? props.value : props.value?.start,
        endSelectedDate: isSingleMode(props) ? props.value : props.value?.end,
        disableDates: props.disableDates,
        disableFutureDates: props.disableFutureDates,
        disablePastDates: props.disablePastDates,
        disableWeekends: props.disableWeekends,
        locale: props.locale,
        weekdayFormat: props.weekdayFormat,
        weekStartsOn: props.weekStartsOn,
        highlightToday: props.highlightToday,
        adapter
      },
      children: /* @__PURE__ */ jsx2(Flex, { sx: styles.calendar, children: props.children })
    }
  );
}

// src/control.tsx
import { Flex as Flex2, useMultiStyleConfig as useMultiStyleConfig2 } from "@chakra-ui/react";
import { jsx as jsx3 } from "react/jsx-runtime";
function CalendarControls({ children }) {
  const styles = useMultiStyleConfig2(
    "CalendarControl",
    {}
  );
  return /* @__PURE__ */ jsx3(Flex2, { sx: styles.controls, children });
}

// src/control-next-button.tsx
import { Button, useMultiStyleConfig as useMultiStyleConfig3 } from "@chakra-ui/react";
import { jsx as jsx4 } from "react/jsx-runtime";
function CalendarNextButton({
  as
}) {
  const styles = useMultiStyleConfig3(
    "CalendarControl",
    {}
  );
  const context = useCalendarContext();
  if (as) {
    return as({ onClick: context.nextMonth });
  }
  return /* @__PURE__ */ jsx4(Button, { onClick: context.nextMonth, sx: styles.button, children: "\u2192" });
}

// src/control-prev-button.tsx
import { Button as Button2, useMultiStyleConfig as useMultiStyleConfig4 } from "@chakra-ui/react";
import { jsx as jsx5 } from "react/jsx-runtime";
function CalendarPrevButton({
  as
}) {
  const styles = useMultiStyleConfig4(
    "CalendarControl",
    {}
  );
  const context = useCalendarContext();
  if (as) {
    return as({ onClick: context.prevMonth });
  }
  return /* @__PURE__ */ jsx5(Button2, { onClick: context.prevMonth, sx: styles.button, children: "\u2190" });
}

// src/day.tsx
import { Button as Button3, useStyleConfig } from "@chakra-ui/react";

// src/month.tsx
import { Box, useMultiStyleConfig as useMultiStyleConfig5 } from "@chakra-ui/react";
import { createContext as createContext3 } from "react";
import { jsx as jsx6 } from "react/jsx-runtime";
var MonthContext = createContext3({
  month: 0
});
function CalendarMonth({ children, month = 0 }) {
  const styles = useMultiStyleConfig5("CalendarMonth", {});
  return /* @__PURE__ */ jsx6(MonthContext.Provider, { value: { month }, children: /* @__PURE__ */ jsx6(Box, { sx: styles.month, children }) });
}

// src/useCalendarDay.ts
import { createContext as createContext4, useContext as useContext3 } from "react";
var DayContext = createContext4({
  day: null
});
function useCalendarDay() {
  const context = useCalendarContext();
  const dayContext = useContext3(DayContext);
  const monthContext = useContext3(MonthContext);
  let variant;
  if (context.highlightToday && context.adapter.isToday(dayContext.day)) {
    variant = "today";
  }
  const isSelected = context.startSelectedDate && context.adapter.isSameDay(dayContext.day, context.startSelectedDate) || context.endSelectedDate && context.adapter.isSameDay(dayContext.day, context.endSelectedDate);
  if (isSelected) {
    variant = "selected";
  }
  if ((context.adapter.isBefore(
    dayContext.day,
    context.dates[Number(monthContext.month)].startDateOfMonth
  ) || context.adapter.isAfter(
    dayContext.day,
    context.dates[Number(monthContext.month)].endDateOfMonth
  )) && !isSelected) {
    variant = "outside";
  }
  const interval = context.startSelectedDate && context.endSelectedDate && context.adapter.daysInRange(
    context.startSelectedDate,
    context.endSelectedDate
  );
  const isInRange = interval ? interval.some(
    (date) => context.adapter.isSameDay(dayContext.day, date) && !isSelected
  ) : false;
  if (isInRange && !isSelected) {
    variant = "range";
  }
  const isDisabled = context.disablePastDates && context.adapter.isBefore(
    dayContext.day,
    typeof context.disablePastDates !== "boolean" ? context.disablePastDates : context.adapter.addDays(context.adapter.today, -1)
  ) || context.disableFutureDates && context.adapter.isAfter(
    dayContext.day,
    typeof context.disableFutureDates !== "boolean" ? context.disableFutureDates : context.adapter.today
  ) || context.disableWeekends && context.adapter.isWeekend(dayContext.day) || context.disableDates && context.disableDates.some(
    (date) => context.adapter.isSameDay(dayContext.day, date)
  );
  return {
    day: dayContext.day,
    variant,
    isSelected,
    interval,
    isInRange,
    isDisabled,
    onSelectDates: context.onSelectDates
  };
}

// src/day.tsx
import { jsx as jsx7 } from "react/jsx-runtime";
function CalendarDay({
  children,
  ...props
}) {
  const context = useCalendarContext();
  const { day, interval, variant, isDisabled, onSelectDates } = useCalendarDay();
  const styles = useStyleConfig("CalendarDay", { variant, interval });
  return /* @__PURE__ */ jsx7(
    Button3,
    {
      "aria-current": variant === "selected" ? "date" : false,
      "aria-label": context.adapter.format(day, "monthDay"),
      onClick: () => onSelectDates(day),
      isDisabled,
      sx: { ...styles, ...props },
      ...props,
      children: children || context.adapter.format(day, "day")
    }
  );
}

// src/month-days.tsx
import { Grid, useMultiStyleConfig as useMultiStyleConfig6 } from "@chakra-ui/react";
import { useContext as useContext4 } from "react";
import { jsx as jsx8 } from "react/jsx-runtime";
function CalendarDays({
  children
}) {
  const styles = useMultiStyleConfig6("CalendarMonth", {});
  const context = useCalendarContext();
  const monthContext = useContext4(MonthContext);
  return /* @__PURE__ */ jsx8(Grid, { sx: styles.days, children: context.dates[Number(monthContext.month)].days.map((day, index) => {
    if (!day) {
      return /* @__PURE__ */ jsx8("span", {}, `not-a-day-${index}`);
    }
    return /* @__PURE__ */ jsx8(
      DayContext.Provider,
      {
        value: { day },
        children: children ? children : /* @__PURE__ */ jsx8(CalendarDay, { children })
      },
      context.adapter.format(day, "monthDay")
    );
  }) });
}

// src/month-name.tsx
import * as React from "react";
import { Heading, useMultiStyleConfig as useMultiStyleConfig7 } from "@chakra-ui/react";
import { jsx as jsx9 } from "react/jsx-runtime";
function CalendarMonthName({
  format
}) {
  const styles = useMultiStyleConfig7("CalendarMonth", {});
  const context = useCalendarContext();
  const monthContext = React.useContext(MonthContext);
  const currentMonth = context.dates[Number(monthContext.month)].startDateOfMonth;
  return /* @__PURE__ */ jsx9(Heading, { sx: styles.name, children: context.adapter.format(currentMonth, "month", format) });
}

// src/month-week.tsx
import { Grid as Grid2, Text, useMultiStyleConfig as useMultiStyleConfig8 } from "@chakra-ui/react";
import { jsx as jsx10 } from "react/jsx-runtime";
function CalendarWeek() {
  const styles = useMultiStyleConfig8("CalendarMonth", {});
  const context = useCalendarContext();
  const weekdays = context.adapter.weekdays(context.weekdayFormat);
  return /* @__PURE__ */ jsx10(Grid2, { sx: styles.week, children: weekdays.map((weekday, i) => /* @__PURE__ */ jsx10(Text, { sx: styles.weekday, children: weekday }, `${weekday}-${i}`)) });
}

// src/months.tsx
import { Grid as Grid3, useMultiStyleConfig as useMultiStyleConfig9 } from "@chakra-ui/react";
import { jsx as jsx11 } from "react/jsx-runtime";
function CalendarMonths({ children, ...props }) {
  const styles = useMultiStyleConfig9("Calendar", {});
  return /* @__PURE__ */ jsx11(Grid3, { sx: { ...styles.months, ...props }, children });
}

// src/theme/index.ts
import { extendTheme } from "@chakra-ui/react";

// src/theme/calendar.ts
var Calendar2 = {
  parts: ["calendar", "months"],
  baseStyle: {
    calendar: {
      position: "relative",
      w: "min-content",
      borderWidth: "1px",
      rounded: "md",
      shadow: "lg"
    },
    months: {
      p: 4,
      w: "100%",
      gridTemplateColumns: "1fr 1fr"
    }
  }
};

// src/theme/month.ts
var CalendarMonth2 = {
  parts: ["month", "name", "week", "weekday", "days"],
  baseStyle: {
    name: {
      h: 8,
      fontSize: "md",
      lineHeight: 6,
      textAlign: "center",
      textTransform: "capitalize"
    },
    week: {
      gridTemplateColumns: "repeat(7, 1fr)"
    },
    weekday: {
      color: "gray.500",
      textAlign: "center",
      textTransform: "capitalize"
    },
    days: {
      gridTemplateColumns: "repeat(7, 1fr)"
    }
  },
  defaultProps: {
    name: {
      as: "h2"
    }
  }
};

// src/theme/day.ts
var CalendarDay2 = {
  baseStyle: {
    rounded: "none",
    bgColor: "transparent",
    _hover: {
      bgColor: "gray.100"
    },
    _disabled: {
      color: "gray.200",
      _hover: {
        cursor: "initial",
        bgColor: "transparent"
      }
    }
  },
  sizes: {
    sm: {
      h: 8
    }
  },
  variants: {
    selected: {
      bgColor: "pink.400",
      color: "white",
      _hover: {
        bgColor: "pink.300"
      }
    },
    range: {
      bgColor: "pink.200",
      color: "white",
      _hover: {
        bgColor: "pink.100"
      },
      _disabled: {
        _hover: {
          bgColor: "pink.300"
        }
      }
    },
    outside: {
      color: "gray.300"
    },
    today: {
      bgColor: "pink.100",
      _hover: {
        bgColor: "pink.200"
      }
    }
  },
  defaultProps: {
    size: "sm"
  }
};

// src/theme/controls.ts
var CalendarControl = {
  parts: ["controls", "button"],
  baseStyle: {
    controls: {
      position: "absolute",
      p: 4,
      w: "100%",
      justifyContent: "space-between"
    },
    button: {
      h: 6,
      px: 2,
      lineHeight: 0,
      fontSize: "md",
      rounded: "md"
    }
  }
};

// src/theme/index.ts
var theme = extendTheme({
  components: {
    Calendar: Calendar2,
    CalendarMonth: CalendarMonth2,
    CalendarDay: CalendarDay2,
    CalendarControl
  }
});
export {
  Calendar,
  CalendarAdapterContext,
  CalendarAdapterProvider,
  CalendarContext,
  CalendarControls,
  CalendarDay,
  CalendarDays,
  theme as CalendarDefaultTheme,
  CalendarMonth,
  CalendarMonthName,
  CalendarMonths,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarWeek,
  DayContext,
  MonthContext,
  Target,
  useAdapter,
  useCalendar,
  useCalendarContext,
  useCalendarDay
};
