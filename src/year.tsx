import { Heading, useMultiStyleConfig } from '@chakra-ui/react'
import { format as dateFormat } from 'date-fns'
import * as React from 'react'
import { CalendarContext } from './context'
import { MonthContext } from './month'
import { CalendarYearStyles } from './types'

export type CalendarYear = {
  format?: string
}

export function CalendarYear({
  format = 'yyyy',
}: CalendarYear) {
  const styles = useMultiStyleConfig('CalendarYear', {}) as CalendarYearStyles
  const { dates, locale } = React.useContext(CalendarContext)
  const { month } = React.useContext(MonthContext)

  const currentMonth = dates[Number(month)].startDateOfMonth

  return (
    <Heading sx={styles.year}>
      {dateFormat(currentMonth, format, { locale })}
    </Heading>
  )
}
