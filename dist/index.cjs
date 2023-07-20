"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Calendar: () => Calendar,
  CalendarAdapterContext: () => CalendarAdapterContext,
  CalendarAdapterProvider: () => CalendarAdapterProvider,
  CalendarContext: () => CalendarContext,
  CalendarControls: () => CalendarControls,
  CalendarDay: () => CalendarDay,
  CalendarDays: () => CalendarDays,
  CalendarDefaultTheme: () => theme,
  CalendarMonth: () => CalendarMonth,
  CalendarMonthName: () => CalendarMonthName,
  CalendarMonths: () => CalendarMonths,
  CalendarNextButton: () => CalendarNextButton,
  CalendarPrevButton: () => CalendarPrevButton,
  CalendarWeek: () => CalendarWeek,
  DayContext: () => DayContext,
  MonthContext: () => MonthContext,
  Target: () => Target,
  useAdapter: () => useAdapter,
  useCalendar: () => useCalendar,
  useCalendarContext: () => useCalendarContext,
  useCalendarDay: () => useCalendarDay
});
module.exports = __toCommonJS(src_exports);

// src/calendar.tsx
var import_react4 = require("@chakra-ui/react");

// src/context.tsx
var import_react = require("react");
var CalendarContext = (0, import_react.createContext)(null);
var useCalendarContext = () => {
  const calendarContext = (0, import_react.useContext)(CalendarContext);
  if (calendarContext === null) {
    throw new Error("Something went wrong");
  }
  return calendarContext;
};

// src/useCalendar.ts
var import_react2 = require("react");
function useCalendar({
  start,
  months = 1,
  blockFuture,
  allowOutsideDays,
  adapter
}) {
  const initialState = blockFuture ? adapter.addMonths(start, -1) : start;
  const [date, setDate] = (0, import_react2.useState)(initialState);
  const actions = (0, import_react2.useMemo)(
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
var import_react3 = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var CalendarAdapterContext = (0, import_react3.createContext)(null);
var CalendarAdapterProvider = (props) => {
  const { adapter, children } = props;
  const contextValue = {
    adapter
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarAdapterContext.Provider, { value: contextValue, children });
};
var useAdapter = (props) => {
  const adapterContext = (0, import_react3.useContext)(CalendarAdapterContext);
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
var import_react5 = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
function isSingleMode(props) {
  return !!props.singleDateSelection;
}
function Calendar(props) {
  const styles = (0, import_react4.useMultiStyleConfig)("Calendar", {});
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
  const target = (0, import_react5.useRef)("start" /* START */);
  (0, import_react5.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react4.Flex, { sx: styles.calendar, children: props.children })
    }
  );
}

// src/control.tsx
var import_react6 = require("@chakra-ui/react");
var import_jsx_runtime3 = require("react/jsx-runtime");
function CalendarControls({ children }) {
  const styles = (0, import_react6.useMultiStyleConfig)(
    "CalendarControl",
    {}
  );
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react6.Flex, { sx: styles.controls, children });
}

// src/control-next-button.tsx
var import_react7 = require("@chakra-ui/react");
var import_jsx_runtime4 = require("react/jsx-runtime");
function CalendarNextButton({
  as
}) {
  const styles = (0, import_react7.useMultiStyleConfig)(
    "CalendarControl",
    {}
  );
  const context = useCalendarContext();
  if (as) {
    return as({ onClick: context.nextMonth });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react7.Button, { onClick: context.nextMonth, sx: styles.button, children: "\u2192" });
}

// src/control-prev-button.tsx
var import_react8 = require("@chakra-ui/react");
var import_jsx_runtime5 = require("react/jsx-runtime");
function CalendarPrevButton({
  as
}) {
  const styles = (0, import_react8.useMultiStyleConfig)(
    "CalendarControl",
    {}
  );
  const context = useCalendarContext();
  if (as) {
    return as({ onClick: context.prevMonth });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react8.Button, { onClick: context.prevMonth, sx: styles.button, children: "\u2190" });
}

// src/day.tsx
var import_react12 = require("@chakra-ui/react");

// src/month.tsx
var import_react9 = require("@chakra-ui/react");
var import_react10 = require("react");
var import_jsx_runtime6 = require("react/jsx-runtime");
var MonthContext = (0, import_react10.createContext)({
  month: 0
});
function CalendarMonth({ children, month = 0 }) {
  const styles = (0, import_react9.useMultiStyleConfig)("CalendarMonth", {});
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(MonthContext.Provider, { value: { month }, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react9.Box, { sx: styles.month, children }) });
}

// src/useCalendarDay.ts
var import_react11 = require("react");
var DayContext = (0, import_react11.createContext)({
  day: null
});
function useCalendarDay() {
  const context = useCalendarContext();
  const dayContext = (0, import_react11.useContext)(DayContext);
  const monthContext = (0, import_react11.useContext)(MonthContext);
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
var import_jsx_runtime7 = require("react/jsx-runtime");
function CalendarDay({
  children,
  ...props
}) {
  const context = useCalendarContext();
  const { day, interval, variant, isDisabled, onSelectDates } = useCalendarDay();
  const styles = (0, import_react12.useStyleConfig)("CalendarDay", { variant, interval });
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    import_react12.Button,
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
var import_react13 = require("@chakra-ui/react");
var import_react14 = require("react");
var import_jsx_runtime8 = require("react/jsx-runtime");
function CalendarDays({
  children
}) {
  const styles = (0, import_react13.useMultiStyleConfig)("CalendarMonth", {});
  const context = useCalendarContext();
  const monthContext = (0, import_react14.useContext)(MonthContext);
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react13.Grid, { sx: styles.days, children: context.dates[Number(monthContext.month)].days.map((day, index) => {
    if (!day) {
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", {}, `not-a-day-${index}`);
    }
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      DayContext.Provider,
      {
        value: { day },
        children: children ? children : /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CalendarDay, { children })
      },
      context.adapter.format(day, "monthDay")
    );
  }) });
}

// src/month-name.tsx
var React = __toESM(require("react"), 1);
var import_react15 = require("@chakra-ui/react");
var import_jsx_runtime9 = require("react/jsx-runtime");
function CalendarMonthName({
  format
}) {
  const styles = (0, import_react15.useMultiStyleConfig)("CalendarMonth", {});
  const context = useCalendarContext();
  const monthContext = React.useContext(MonthContext);
  const currentMonth = context.dates[Number(monthContext.month)].startDateOfMonth;
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react15.Heading, { sx: styles.name, children: context.adapter.format(currentMonth, "month", format) });
}

// src/month-week.tsx
var import_react16 = require("@chakra-ui/react");
var import_jsx_runtime10 = require("react/jsx-runtime");
function CalendarWeek() {
  const styles = (0, import_react16.useMultiStyleConfig)("CalendarMonth", {});
  const context = useCalendarContext();
  const weekdays = context.adapter.weekdays(context.weekdayFormat);
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_react16.Grid, { sx: styles.week, children: weekdays.map((weekday, i) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_react16.Text, { sx: styles.weekday, children: weekday }, `${weekday}-${i}`)) });
}

// src/months.tsx
var import_react17 = require("@chakra-ui/react");
var import_jsx_runtime11 = require("react/jsx-runtime");
function CalendarMonths({ children, ...props }) {
  const styles = (0, import_react17.useMultiStyleConfig)("Calendar", {});
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_react17.Grid, { sx: { ...styles.months, ...props }, children });
}

// src/theme/index.ts
var import_react18 = require("@chakra-ui/react");

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
var theme = (0, import_react18.extendTheme)({
  components: {
    Calendar: Calendar2,
    CalendarMonth: CalendarMonth2,
    CalendarDay: CalendarDay2,
    CalendarControl
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Calendar,
  CalendarAdapterContext,
  CalendarAdapterProvider,
  CalendarContext,
  CalendarControls,
  CalendarDay,
  CalendarDays,
  CalendarDefaultTheme,
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
});
