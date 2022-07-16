import * as React from 'react'
import { Grid, useMultiStyleConfig } from '@chakra-ui/react'
import { format } from 'date-fns'
import { MonthContext } from './month'
import { CalendarDay } from './day'
import { DayContext } from '../providers/day'

export function CalendarMonthDays() {
  const { days } = React.useContext(MonthContext)

  const styles = useMultiStyleConfig('CalendarMonth', {})

  return (
    <Grid sx={styles.days}>
      {days.map(day => (
        <DayContext.Provider value={{ day: day }} key={format(day, 'd-M')}>
          <CalendarDay />
        </DayContext.Provider>
      ))}
    </Grid>
  )
}
