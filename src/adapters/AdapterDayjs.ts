import { AdapterFormats, CalendarAdapter } from './index'
import dayjs, { Dayjs } from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'
import isoWeek from 'dayjs/plugin/isoWeek'
dayjs.extend(isoWeek)

export const AdapterDayjs: CalendarAdapter<Dayjs, 'en'> = props => {
  const defaultFormats: AdapterFormats = {
    weekday: 'ddd',
    month: 'MMMM, YYYY',
    monthDay: 'MM-D',
    day: 'D',
  }

  if (props.locale) {
    const locales = dayjs.Ls
    const locale = props.locale

    if (locales[locale] === undefined) {
      console.error(
        `Your locale has not been found. Maybe you forgot to import the locale with \`import 'dayjs/locale/${props.locale}'\``
      )
    }
  }

  if (props.weekStartsOn !== undefined) {
    dayjs.extend(updateLocale)
    dayjs.updateLocale(props.locale || 'en', {
      weekStart: props.weekStartsOn,
    })
  }

  const localizedDayjs = props.locale
    ? (...args: Parameters<typeof dayjs>) =>
        dayjs(...args).locale(props.locale || 'en')
    : dayjs

  return {
    defaultFormats,
    today: localizedDayjs(),
    isValid: value => localizedDayjs(value).isValid(),
    addMonths: (value, amount) =>
      amount < 0
        ? value.subtract(Math.abs(amount), 'month')
        : value.add(amount, 'month'),
    addDays: (value, amount) =>
      amount < 0
        ? value.subtract(Math.abs(amount), 'day')
        : value.add(amount, 'day'),
    startOfMonth: value => localizedDayjs(value).startOf('month'),
    endOfMonth: value => localizedDayjs(value).endOf('month'),
    startOfWeek: value => localizedDayjs(value).startOf('week'),
    endOfWeek: value => localizedDayjs(value).endOf('week'),
    daysInRange: (start, end) => {
      if (start > end) {
        throw new Error('Invalid interval')
      }

      const startOfInterval = start.startOf('day')
      const endOfInterval = end.endOf('day')
      const diff = Math.ceil(endOfInterval.diff(startOfInterval, 'days', true))

      return Array.from({ length: diff }, (_, i) =>
        localizedDayjs(start).add(i, 'days')
      )
    },
    removeOutMonthDays: (days, date) =>
      days.map(d => (d.isSame(date, 'month') ? d : null)),
    weekdays: (formatString = defaultFormats.weekday) => {
      const start = localizedDayjs().startOf('week')
      return Array.from({ length: 7 }, (_, i) =>
        start.add(i, 'days').format(formatString)
      )
    },
    format: (value, formatKey, formatString) =>
      localizedDayjs(value).format(formatString || defaultFormats[formatKey]),
    isBefore: (value, comparing) => value < comparing,
    isAfter: (value, comparing) => value > comparing,
    isSameDay: (value, comparing) => value.isSame(comparing, 'date'),
    isToday: value => value.isSame(localizedDayjs(), 'date'),
    isWeekend: value => {
      const day = localizedDayjs(value).isoWeekday()
      return day === 6 || day === 7
    },
  }
}
