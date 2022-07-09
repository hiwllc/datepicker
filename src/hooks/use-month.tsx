import * as React from 'react'
import { CalendarContext } from '../components/provider'

export function useMonthContext(month = 0) {
  const { months } = React.useContext(CalendarContext)
  return months[month]
}
