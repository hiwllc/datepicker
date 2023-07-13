import { Grid, useMultiStyleConfig } from '@chakra-ui/react'
import type { CalendarMonthStyles } from './types'
import { useCalendarContext } from './context'
import { CalendarDayDJ } from './day'
import { MonthContext } from './month'
import { DayContextDJ } from './useCalendarDay'
import { PropsWithChildren, useContext } from 'react'

export function CalendarDaysDJ<TDate, TLocale>({
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
          <DayContextDJ.Provider
            value={{ day }}
            key={context.adapter.format(day, 'monthDay')}
          >
            {children ? children : <CalendarDayDJ>{children}</CalendarDayDJ>}
          </DayContextDJ.Provider>
        )
      })}
    </Grid>
  )
}
