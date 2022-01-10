import * as React from 'react'
import { Heading, useMultiStyleConfig } from '@chakra-ui/react'
import { format as dateFormat } from 'date-fns'
import { CalendarContext } from './context'
import { MonthContext } from './month'
import { CalendarMonthStyles } from './types'

export type CalendarMonthName = {
  format?: string
}

export function CalendarMonthName({
  format = 'MMMM, yyyy',
}: CalendarMonthName) {
  const styles = useMultiStyleConfig('CalendarMonth', {}) as CalendarMonthStyles
  const { dates, locale } = React.useContext(CalendarContext)
  const { month } = React.useContext(MonthContext)

  const currentMonth = dates[Number(month)].startDateOfMonth

  return (
    <Heading sx={styles.name}>
      {dateFormat(currentMonth, format, { locale })}
    </Heading>
  )
}
