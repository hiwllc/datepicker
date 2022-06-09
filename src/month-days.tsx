import * as React from 'react'
import { Grid, useMultiStyleConfig } from '@chakra-ui/react'
import { format } from 'date-fns'
import type { CalendarMonthStyles } from './types'
import { CalendarContext } from './context'
import { CalendarDay } from './day'
import { MonthContext } from './month'
import { DayContext } from './useCalendarDay'

export function CalendarDays({ children }: React.PropsWithChildren<unknown>) {
  const styles = useMultiStyleConfig('CalendarMonth', {}) as CalendarMonthStyles
  const { dates } = React.useContext(CalendarContext)
  const { month } = React.useContext(MonthContext)

  return (
    <Grid sx={styles.days}>
      {dates[Number(month)].days.map((day, index) => {
        if (!day) {
          return <span key={`not-a-day-${index}`} />
        }

        return (
          <DayContext.Provider value={{ day }} key={format(day, 'd-M')}>
            {children ? children : <CalendarDay>{children}</CalendarDay>}
          </DayContext.Provider>
        )
      })}
    </Grid>
  )
}
