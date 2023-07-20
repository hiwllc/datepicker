import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { PropsWithChildren } from 'react';

type CalendarAdapterProps<TLocale> = {
    locale?: TLocale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};
type AdapterFormats = {
    weekday: string;
    month: string;
    monthDay: string;
    day: string;
};
type CalendarAdapter<TDate, TLocale = void> = (props: CalendarAdapterProps<TLocale>) => {
    defaultFormats: AdapterFormats;
    today: TDate;
    isValid: (v: TDate | undefined) => boolean;
    addMonths: (v: TDate, amount: number) => TDate;
    addDays: (v: TDate, amount: number) => TDate;
    startOfMonth: (v: TDate) => TDate;
    endOfMonth: (v: TDate) => TDate;
    startOfWeek: (v: TDate) => TDate;
    endOfWeek: (v: TDate) => TDate;
    daysInRange: (start: TDate, end: TDate) => TDate[];
    removeOutMonthDays: (days: TDate[], date: TDate) => Array<TDate | null>;
    weekdays: (format?: string) => string[];
    format: (v: TDate, formatKey: keyof AdapterFormats, formatString?: string) => string;
    isBefore: (value: TDate, comparing: TDate) => boolean;
    isAfter: (value: TDate, comparing: TDate) => boolean;
    isSameDay: (value: TDate, comparing: TDate) => boolean;
    isToday: (value: TDate) => boolean;
    isWeekend: (value: TDate) => boolean;
};
type CalendarAdapterContextType<TDate, TLocale> = {
    adapter: CalendarAdapter<TDate, TLocale>;
};
declare const CalendarAdapterContext: react.Context<CalendarAdapterContextType<any, any> | null>;
declare const CalendarAdapterProvider: <TDate, TLocale>(props: PropsWithChildren<CalendarAdapterContextType<TDate, TLocale>>) => react_jsx_runtime.JSX.Element;
declare const useAdapter: <TDate, TLocale>(props: CalendarAdapterProps<TLocale>) => {
    defaultFormats: AdapterFormats;
    today: TDate;
    isValid: (v: TDate | undefined) => boolean;
    addMonths: (v: TDate, amount: number) => TDate;
    addDays: (v: TDate, amount: number) => TDate;
    startOfMonth: (v: TDate) => TDate;
    endOfMonth: (v: TDate) => TDate;
    startOfWeek: (v: TDate) => TDate;
    endOfWeek: (v: TDate) => TDate;
    daysInRange: (start: TDate, end: TDate) => TDate[];
    removeOutMonthDays: (days: TDate[], date: TDate) => (TDate | null)[];
    weekdays: (format?: string) => string[];
    format: (v: TDate, formatKey: keyof AdapterFormats, formatString?: string) => string;
    isBefore: (value: TDate, comparing: TDate) => boolean;
    isAfter: (value: TDate, comparing: TDate) => boolean;
    isSameDay: (value: TDate, comparing: TDate) => boolean;
    isToday: (value: TDate) => boolean;
    isWeekend: (value: TDate) => boolean;
};

export { AdapterFormats as A, CalendarAdapter as C, CalendarAdapterContextType as a, CalendarAdapterContext as b, CalendarAdapterProvider as c, useAdapter as u };
