import { Box, Grid, useMultiStyleConfig } from '@chakra-ui/react'
import { isAfter } from 'date-fns'
import type { CalendarDate, CalendarValues } from './types'
import { Month } from './month'
import { useCalendar } from './useCalendar'
import { Controls } from './control'

export type Calendar = {
  values: CalendarValues
  onlyOneMonth?: boolean
  onSelectStartDate: (date: CalendarDate) => void
  onSelectEndDate: (date: CalendarDate) => void
}

export function Calendar({
  values,
  onlyOneMonth = false,
  onSelectStartDate,
  onSelectEndDate,
}: Calendar) {
  const {
    startDateDays,
    endDateDays,
    startDate,
    endDate,
    nextMonth,
    prevMonth,
  } = useCalendar({
    start: values?.start || new Date(),
  })

  const styles = useMultiStyleConfig('Calendar', {})

  const selectDateHandler = (date: CalendarDate) => {
    if (values.start && isAfter(date, values.start)) {
      return onSelectEndDate(date)
    }

    return onSelectStartDate(date)
  }

  return (
    <Box sx={styles.calendar}>
      <Controls prevMonth={prevMonth} nextMonth={nextMonth} />

      <Grid sx={styles.months}>
        <Month
          startSelectedDate={values?.start}
          endSelectedDate={values?.end}
          values={values}
          date={startDate}
          days={startDateDays}
          onSelectDate={selectDateHandler}
        />

        {!onlyOneMonth ? (
          <Month
            startSelectedDate={values?.start}
            endSelectedDate={values?.end}
            values={values}
            date={endDate}
            days={endDateDays}
            onSelectDate={selectDateHandler}
          />
        ) : null}
      </Grid>
    </Box>
  )
}
