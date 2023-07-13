import { CalendarAdapter } from './index'
import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import startOfMonth from 'date-fns/startOfMonth'
import isSameMonth from 'date-fns/isSameMonth'
import isValid from 'date-fns/isValid'
import endOfMonth from 'date-fns/endOfMonth'
import format from 'date-fns/format'
import startOfWeek from 'date-fns/startOfWeek'
import endOfWeek from 'date-fns/endOfWeek'
import isBefore from 'date-fns/isBefore'
import isAfter from 'date-fns/isBefore'
import isSameDay from 'date-fns/isSameDay'
import isWeekend from 'date-fns/isWeekend'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import enUS from 'date-fns/locale/en-US'

export const AdapterDateFns: CalendarAdapter<Date, typeof enUS> = props => {
  const defaultFormats = {
    weekday: 'E',
    month: 'MMMM, yyyy',
    monthDay: 'MM-d',
    day: 'd',
  }

  const locale = props.locale || enUS
  const weekStartsOn = props.weekStartsOn || locale.options?.weekStartsOn

  return {
    defaultFormats,
    today: new Date(),
    isValid: value => isValid(value),
    addMonths: (value, amount) => addMonths(value, amount),
    addDays: (value, amount) => addDays(value, amount),
    startOfMonth: value => startOfMonth(value),
    endOfMonth: value => endOfMonth(value),
    startOfWeek: value => startOfWeek(value, { locale, weekStartsOn }),
    endOfWeek: value => endOfWeek(value, { locale, weekStartsOn }),
    daysInRange: (start, end) => eachDayOfInterval({ start, end }),
    removeOutMonthDays: (days, date) =>
      days.map(d => (isSameMonth(date, d) ? d : null)),
    weekdays: (formatString = defaultFormats.weekday) => {
      const start = startOfWeek(new Date(), {
        locale,
        weekStartsOn,
      })
      return Array.from({ length: 7 }, (_, i) =>
        format(addDays(start, i), formatString, { locale, weekStartsOn })
      )
    },
    format: (value, formatKey, formatString) =>
      format(value, formatString || defaultFormats[formatKey], {
        locale,
        weekStartsOn,
      }),
    isBefore: (value, comparing) => isBefore(value, comparing),
    isAfter: (value, comparing) => isAfter(value, comparing),
    isSameDay: (value, comparing) => isSameDay(value, comparing),
    isToday: value => isSameDay(value, new Date()),
    isWeekend: value => isWeekend(value),
  }
}
