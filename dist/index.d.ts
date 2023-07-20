import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { PropsWithChildren, ReactElement } from 'react';
import { C as CalendarAdapter } from './index-00cfeeff.js';
export { A as AdapterFormats, b as CalendarAdapterContext, a as CalendarAdapterContextType, c as CalendarAdapterProvider, u as useAdapter } from './index-00cfeeff.js';
import { ButtonProps, GridProps, CSSObject } from '@chakra-ui/react';

type BaseCalendarProps<TDate, TLocale = void> = {
    months?: number;
    locale?: TLocale;
    allowOutsideDays?: boolean;
    disablePastDates?: boolean | TDate;
    disableFutureDates?: boolean | TDate;
    disableWeekends?: boolean;
    disableDates?: TDate[];
    weekdayFormat?: string;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    highlightToday?: boolean;
    allowSelectSameDay?: boolean;
};
type CalendarSingleDate<TDate> = TDate | null | undefined;
type SingleCalendarProps<TDate, TLocale = void> = BaseCalendarProps<TDate, TLocale> & {
    value: CalendarSingleDate<TDate>;
    onSelectDate: (value: CalendarSingleDate<TDate>) => void;
    singleDateSelection: true;
    weekDateSelection?: never;
};
type CalendarDateRange<TDate> = {
    start?: TDate | null;
    end?: TDate | null;
};
type RangeCalendarProps<TDate, TLocale = void> = BaseCalendarProps<TDate, TLocale> & {
    value: CalendarDateRange<TDate>;
    onSelectDate: (value: CalendarDateRange<TDate>) => void;
    singleDateSelection?: false;
    weekDateSelection?: boolean;
};
type CalendarProps<TDate, TLocale = void> = RangeCalendarProps<TDate, TLocale> | SingleCalendarProps<TDate, TLocale>;
declare function Calendar<TDate, TLocale>(props: PropsWithChildren<CalendarProps<TDate, TLocale>>): react_jsx_runtime.JSX.Element;

type CalendarContextType<TDate, TLocale> = {
    dates: {
        startDateOfMonth: TDate;
        endDateOfMonth: TDate;
        startWeek: TDate;
        endWeek: TDate;
        days: (TDate | null)[];
    }[];
    nextMonth: VoidFunction;
    prevMonth: VoidFunction;
    onSelectDates: (date: TDate) => void;
    startSelectedDate?: TDate;
    endSelectedDate?: TDate;
    allowOutsideDays?: boolean;
    disablePastDates?: boolean | TDate;
    disableFutureDates?: boolean | TDate;
    disableWeekends?: boolean;
    disableDates?: TDate[];
    locale?: TLocale;
    weekdayFormat?: string;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    highlightToday?: boolean;
    adapter: ReturnType<CalendarAdapter<TDate, TLocale>>;
};
declare const CalendarContext: react.Context<CalendarContextType<any, any> | null>;
declare const useCalendarContext: <TDate, TLocale>() => CalendarContextType<TDate, TLocale>;

type CalendarControlsProps = react.PropsWithChildren<unknown>;
declare function CalendarControls({ children }: CalendarControlsProps): react_jsx_runtime.JSX.Element;

type CalendarNextButtonProps = {
    as?: ({ onClick }: {
        onClick: VoidFunction;
    }) => ReactElement | null;
};
declare function CalendarNextButton<TDate, TLocale>({ as, }: CalendarNextButtonProps): react_jsx_runtime.JSX.Element | null;

type CalendarPrevButtonProps = {
    as?: ({ onClick }: {
        onClick: VoidFunction;
    }) => ReactElement | null;
};
declare function CalendarPrevButton<TDate, TLocale>({ as, }: CalendarPrevButtonProps): react_jsx_runtime.JSX.Element | null;

type CalendarDayProps = PropsWithChildren<ButtonProps>;
declare function CalendarDay<TDate, TLocale>({ children, ...props }: CalendarDayProps): react_jsx_runtime.JSX.Element;

type CalendarMonthProps = PropsWithChildren<{
    month?: number;
}>;
type MonthContextType = {
    month?: number;
};
declare const MonthContext: react.Context<MonthContextType>;
declare function CalendarMonth({ children, month }: CalendarMonthProps): react_jsx_runtime.JSX.Element;

declare function CalendarDays<TDate, TLocale>({ children, }: PropsWithChildren<unknown>): react_jsx_runtime.JSX.Element;

type CalendarMonthNameProps = {
    format?: string;
};
declare function CalendarMonthName<TDate, TLocale>({ format, }: CalendarMonthNameProps): react_jsx_runtime.JSX.Element;

declare function CalendarWeek<TDate, TLocale>(): react_jsx_runtime.JSX.Element;

type CalendarMonthsProps = PropsWithChildren<GridProps>;
declare function CalendarMonths({ children, ...props }: CalendarMonthsProps): react_jsx_runtime.JSX.Element;

type CalendarDate = Date | number;
type CalendarValues = {
    start?: CalendarDate;
    end?: CalendarDate;
};
type Buttons = ({ onClick }: {
    onClick: () => void;
}) => JSX.Element;
declare enum Target {
    START = "start",
    END = "end"
}
type CalendarThemeKeys = 'calendar' | 'months';
type CalendarStyles = Record<CalendarThemeKeys, CSSObject>;
type CalendarMonthThemeKeys = 'month' | 'name' | 'week' | 'weekday' | 'days';
type CalendarMonthStyles = Record<CalendarMonthThemeKeys, CSSObject>;
type CalendarControlThemeKeys = 'controls' | 'button';
type CalendarControlStyles = Record<CalendarControlThemeKeys, CSSObject>;

type UseCalendarProps<TDate, TLocale> = {
    start: TDate;
    blockFuture?: boolean;
    allowOutsideDays?: boolean;
    months?: number;
    adapter: ReturnType<CalendarAdapter<TDate, TLocale>>;
};
declare function useCalendar<TDate, TLocale>({ start, months, blockFuture, allowOutsideDays, adapter, }: UseCalendarProps<TDate, TLocale>): {
    nextMonth: () => void;
    prevMonth: () => void;
    resetDate: () => void;
    dates: {
        startDateOfMonth: TDate;
        endDateOfMonth: TDate;
        startWeek: TDate;
        endWeek: TDate;
        days: (TDate | null)[];
    }[];
    startDate: TDate;
};

type CalendarDayContextType<TDate> = {
    day: TDate;
};
declare const DayContext: react.Context<CalendarDayContextType<any>>;
declare function useCalendarDay<TDate, TLocale>(): {
    day: TDate;
    variant: "outside" | "selected" | "range" | "today" | undefined;
    isSelected: boolean | undefined;
    interval: TDate[] | undefined;
    isInRange: boolean;
    isDisabled: boolean | undefined;
    onSelectDates: (date: TDate) => void;
};

declare const theme: Record<string, any>;

export { Buttons, Calendar, CalendarAdapter, CalendarContext, CalendarContextType, CalendarControlStyles, CalendarControlThemeKeys, CalendarControls, CalendarControlsProps, CalendarDate, CalendarDateRange, CalendarDay, CalendarDayContextType, CalendarDayProps, CalendarDays, theme as CalendarDefaultTheme, CalendarMonth, CalendarMonthName, CalendarMonthNameProps, CalendarMonthProps, CalendarMonthStyles, CalendarMonthThemeKeys, CalendarMonths, CalendarMonthsProps, CalendarNextButton, CalendarPrevButton, CalendarProps, CalendarSingleDate, CalendarStyles, CalendarThemeKeys, CalendarValues, CalendarWeek, DayContext, MonthContext, RangeCalendarProps, SingleCalendarProps, Target, UseCalendarProps, useCalendar, useCalendarContext, useCalendarDay };
