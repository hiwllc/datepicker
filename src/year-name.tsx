import { Heading, useMultiStyleConfig } from '@chakra-ui/react'
import { format as dateFormat } from 'date-fns'
import * as React from 'react'
import { CalendarContext } from './context'
import { MonthContext } from './month'
import { CalendarYearStyles } from './types'

export type CalendarYearName = {
  format?: string
}

export function CalendarYearName({ format = 'yyyy' }: CalendarYearName) {
  const styles = useMultiStyleConfig('CalendarYear', {}) as CalendarYearStyles
  const { dates, locale } = React.useContext(CalendarContext)
  const { month } = React.useContext(MonthContext)

  const currentMonth = dates[Number(month)].startDateOfMonth

  return (
    <Heading sx={styles.name}>
      {dateFormat(currentMonth, format, { locale })}
    </Heading>
  )
}
