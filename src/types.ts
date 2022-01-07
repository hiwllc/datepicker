import type { CSSObject } from '@chakra-ui/react'

export type CalendarDate = Date | number

export type CalendarValues = {
  start?: CalendarDate
  end?: CalendarDate
}

export type Buttons = ({ onClick }: { onClick: () => void }) => JSX.Element

export enum Target {
  START = 'start',
  END = 'end',
}

export type CalendarThemeKeys = 'calendar' | 'months'
export type CalendarStyles = Record<CalendarThemeKeys, CSSObject>

export type CalendarMonthThemeKeys =
  | 'month'
  | 'name'
  | 'week'
  | 'weekday'
  | 'days'
export type CalendarMonthStyles = Record<CalendarMonthThemeKeys, CSSObject>

export type CalendarControlThemeKeys = 'controls' | 'button'
export type CalendarControlStyles = Record<CalendarControlThemeKeys, CSSObject>
