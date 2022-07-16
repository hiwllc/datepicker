export enum Target {
  START = 'Start',
  END = 'End',
}

export type Range = {
  end?: Date | null
  start?: Date | null
}

export type RangeSelection = (interval: Range) => void

export type Month = {
  days: Date[]
  firstDayOfMonth: Date | number
  lastDayOfMonth: Date | number
  firstWeekDayOfStartOfMonth: Date | number
  lastWeekDayOfEndOfMonth: Date | number
  name: string
  number?: number
}

export type Months = Month[]
