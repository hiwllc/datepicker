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

// src/adapters/AdapterDayjs.ts
var AdapterDayjs_exports = {};
__export(AdapterDayjs_exports, {
  AdapterDayjs: () => AdapterDayjs
});
module.exports = __toCommonJS(AdapterDayjs_exports);
var import_dayjs = __toESM(require("dayjs"), 1);
var import_updateLocale = __toESM(require("dayjs/plugin/updateLocale"), 1);
var import_isoWeek = __toESM(require("dayjs/plugin/isoWeek"), 1);
import_dayjs.default.extend(import_isoWeek.default);
var AdapterDayjs = (props) => {
  const defaultFormats = {
    weekday: "ddd",
    month: "MMMM, YYYY",
    monthDay: "MM-D",
    day: "D"
  };
  if (props.locale) {
    const locales = import_dayjs.default.Ls;
    const locale = props.locale;
    if (locales[locale] === void 0) {
      console.error(
        `Your locale has not been found. Maybe you forgot to import the locale with \`import 'dayjs/locale/${props.locale}'\``
      );
    }
  }
  if (props.weekStartsOn !== void 0) {
    import_dayjs.default.extend(import_updateLocale.default);
    import_dayjs.default.updateLocale(props.locale || "en", {
      weekStart: props.weekStartsOn
    });
  }
  const localizedDayjs = props.locale ? (...args) => (0, import_dayjs.default)(...args).locale(props.locale || "en") : import_dayjs.default;
  return {
    defaultFormats,
    today: localizedDayjs(),
    isValid: (value) => localizedDayjs(value).isValid(),
    addMonths: (value, amount) => amount < 0 ? value.subtract(Math.abs(amount), "month") : value.add(amount, "month"),
    addDays: (value, amount) => amount < 0 ? value.subtract(Math.abs(amount), "day") : value.add(amount, "day"),
    startOfMonth: (value) => localizedDayjs(value).startOf("month"),
    endOfMonth: (value) => localizedDayjs(value).endOf("month"),
    startOfWeek: (value) => localizedDayjs(value).startOf("week"),
    endOfWeek: (value) => localizedDayjs(value).endOf("week"),
    daysInRange: (start, end) => {
      if (start > end) {
        throw new Error("Invalid interval");
      }
      const startOfInterval = start.startOf("day");
      const endOfInterval = end.endOf("day");
      const diff = Math.ceil(endOfInterval.diff(startOfInterval, "days", true));
      return Array.from(
        { length: diff },
        (_, i) => localizedDayjs(start).add(i, "days")
      );
    },
    removeOutMonthDays: (days, date) => days.map((d) => d.isSame(date, "month") ? d : null),
    weekdays: (formatString = defaultFormats.weekday) => {
      const start = localizedDayjs().startOf("week");
      return Array.from(
        { length: 7 },
        (_, i) => start.add(i, "days").format(formatString)
      );
    },
    format: (value, formatKey, formatString) => localizedDayjs(value).format(formatString || defaultFormats[formatKey]),
    isBefore: (value, comparing) => value < comparing,
    isAfter: (value, comparing) => value > comparing,
    isSameDay: (value, comparing) => value.isSame(comparing, "date"),
    isToday: (value) => value.isSame(localizedDayjs(), "date"),
    isWeekend: (value) => {
      const day = localizedDayjs(value).isoWeekday();
      return day === 6 || day === 7;
    },
    differenceInMonths: (value, comparing) => value.diff(comparing, "month")
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AdapterDayjs
});
