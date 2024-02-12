import { Grid, useMultiStyleConfig } from '@chakra-ui/react'
import type { CalendarMonthStyles } from './types'
import { useCalendarContext } from './context'
import { CalendarDay } from './day'
import { MonthContext } from './month'
import { DayContext } from './useCalendarDay'
import { PropsWithChildren, useContext } from 'react'

export function CalendarDays<TDate, TLocale>({
  children,
}: PropsWithChildren<unknown>) {
  const styles = useMultiStyleConfig('CalendarMonth', {}) as CalendarMonthStyles
  const context = useCalendarContext<TDate, TLocale>()
  const monthContext = useContext(MonthContext)

  return (
    <Grid sx={styles.days}>
      {context.dates[Number(monthContext.month)].days.map((day, index) => {
        if (!day) {
          return <span key={`not-a-day-${index}`} />
        }

        return (
          <DayContext.Provider
            value={{ day }}
            key={context.adapter.format(day, 'monthDay')}
          >
            {children ? children : <CalendarDay>{children}</CalendarDay>}
          </DayContext.Provider>
        )
      })}
    </Grid>
  )
}
