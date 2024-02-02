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

// src/adapters/AdapterDateFns.ts
var AdapterDateFns_exports = {};
__export(AdapterDateFns_exports, {
  AdapterDateFns: () => AdapterDateFns
});
module.exports = __toCommonJS(AdapterDateFns_exports);
var import_date_fns = require("date-fns");
var import_en_US = __toESM(require("date-fns/locale/en-US"), 1);
var AdapterDateFns = (props) => {
  const defaultFormats = {
    weekday: "E",
    month: "MMMM, yyyy",
    monthDay: "MM-d",
    day: "d"
  };
  const locale = props.locale || import_en_US.default;
  const weekStartsOn = props.weekStartsOn || locale.options?.weekStartsOn;
  return {
    defaultFormats,
    today: /* @__PURE__ */ new Date(),
    isValid: (value) => (0, import_date_fns.isValid)(value),
    addMonths: (value, amount) => (0, import_date_fns.addMonths)(value, amount),
    addDays: (value, amount) => (0, import_date_fns.addDays)(value, amount),
    startOfMonth: (value) => (0, import_date_fns.startOfMonth)(value),
    endOfMonth: (value) => (0, import_date_fns.endOfMonth)(value),
    startOfWeek: (value) => (0, import_date_fns.startOfWeek)(value, { locale, weekStartsOn }),
    endOfWeek: (value) => (0, import_date_fns.endOfWeek)(value, { locale, weekStartsOn }),
    daysInRange: (start, end) => (0, import_date_fns.eachDayOfInterval)({ start, end }),
    removeOutMonthDays: (days, date) => days.map((d) => (0, import_date_fns.isSameMonth)(date, d) ? d : null),
    weekdays: (formatString = defaultFormats.weekday) => {
      const start = (0, import_date_fns.startOfWeek)(/* @__PURE__ */ new Date(), {
        locale,
        weekStartsOn
      });
      return Array.from(
        { length: 7 },
        (_, i) => (0, import_date_fns.format)((0, import_date_fns.addDays)(start, i), formatString, { locale, weekStartsOn })
      );
    },
    format: (value, formatKey, formatString) => (0, import_date_fns.format)(value, formatString || defaultFormats[formatKey], {
      locale,
      weekStartsOn
    }),
    isBefore: (value, comparing) => (0, import_date_fns.isBefore)(value, comparing),
    isAfter: (value, comparing) => (0, import_date_fns.isAfter)(value, comparing),
    isSameDay: (value, comparing) => (0, import_date_fns.isSameDay)(value, comparing),
    isToday: (value) => (0, import_date_fns.isSameDay)(value, /* @__PURE__ */ new Date()),
    isWeekend: (value) => (0, import_date_fns.isWeekend)(value),
    differenceInMonths: (value, comparing) => (0, import_date_fns.differenceInCalendarMonths)(value, comparing)
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AdapterDateFns
});
