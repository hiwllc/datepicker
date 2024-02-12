import { Heading, useMultiStyleConfig } from '@chakra-ui/react'
import { useCalendarContext } from './context'
import { MonthContext } from './month'
import { type CalendarMonthStyles } from './types'

export type CalendarMonthNameProps = {
  format?: string
}

export function CalendarMonthName<TDate, TLocale>({
  format,
}: CalendarMonthNameProps) {
  const styles = useMultiStyleConfig('CalendarMonth', {}) as CalendarMonthStyles
  const context = useCalendarContext<TDate, TLocale>()
  const monthContext = React.useContext(MonthContext)
  const currentMonth =
    context.dates[Number(monthContext.month)].startDateOfMonth

  return (
    <Heading sx={styles.name}>
      {context.adapter.format(currentMonth, 'month', format)}
    </Heading>
  )
}
