import { Box, Grid, useMultiStyleConfig } from '@chakra-ui/react'
import { isAfter, Locale } from 'date-fns'
import type { CalendarDate, CalendarValues } from './types'
import { Month } from './month'
import { useCalendar } from './useCalendar'
import { Controls } from './control'

type NextButton = ({ onClick }: { onClick: () => void }) => JSX.Element
type PrevButton = ({ onClick }: { onClick: () => void }) => JSX.Element

export type Calendar = {
  value: CalendarValues
  onlyOneMonth?: boolean
  singleDateSelection?: boolean
  locale?: Locale
  onSelectDate: (value: CalendarDate | CalendarValues) => void
  nextButton?: NextButton
  prevButton?: PrevButton
}

export function Calendar({
  value,
  onlyOneMonth = false,
  singleDateSelection = false,
  locale,
  onSelectDate,
  nextButton,
  prevButton,
}: Calendar) {
  const {
    startDateDays,
    endDateDays,
    startDate,
    endDate,
    nextMonth,
    prevMonth,
  } = useCalendar({
    start: value?.start || new Date(),
  })

  const styles = useMultiStyleConfig('Calendar', {})

  const selectDateHandler = (date: CalendarDate) => {
    if (singleDateSelection) {
      return onSelectDate(date)
    }

    if (value.start && isAfter(date, value.start)) {
      return onSelectDate({ ...value, end: date })
    }

    return onSelectDate({ ...value, start: date })
  }

  return (
    <Box sx={styles.calendar}>
      <Controls
        prevButton={prevButton}
        nextButton={nextButton}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />

      <Grid sx={styles.months}>
        <Month
          locale={locale}
          startSelectedDate={value?.start}
          endSelectedDate={value?.end}
          value={value}
          date={startDate}
          days={startDateDays}
          onSelectDate={selectDateHandler}
        />

        {!onlyOneMonth ? (
          <Month
            locale={locale}
            startSelectedDate={value?.start}
            endSelectedDate={value?.end}
            value={value}
            date={endDate}
            days={endDateDays}
            onSelectDate={selectDateHandler}
          />
        ) : null}
      </Grid>
    </Box>
  )
}
