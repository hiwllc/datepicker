import { Box, Flex, Button, Grid } from '@chakra-ui/react'
import { Month } from './month'
import { useCalendar } from './useCalendar'
import type { CalendarDate } from './useCalendar'
import { isAfter, isBefore } from 'date-fns'

export type Values = {
  start?: CalendarDate
  end?: CalendarDate
}

type Calendar = {
  values: Values
  onSelectStartDate: (date: CalendarDate) => void
  onSelectEndDate: (date: CalendarDate) => void
}

export function Calendar({
  values,
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

  const selectDateHandler = (date: CalendarDate) => {
    if (values.start && isAfter(date, values.start)) {
      return onSelectEndDate(date)
    }

    return onSelectStartDate(date)
  }

  return (
    <Box
      position="relative"
      w="600px"
      borderWidth="1px"
      rounded="md"
      shadow="lg"
    >
      <Flex p={4} position="absolute" w="100%" justifyContent="space-between">
        <Button onClick={prevMonth} size="xs">
          prev
        </Button>
        <Button onClick={nextMonth} size="xs">
          next
        </Button>
      </Flex>

      <Grid p={4} gap={4} w="100%" gridTemplateColumns="1fr 1fr">
        <Month
          startSelectedDate={values?.start}
          endSelectedDate={values?.end}
          values={values}
          date={startDate}
          days={startDateDays}
          onSelectDate={selectDateHandler}
        />
        <Month
          startSelectedDate={values?.start}
          endSelectedDate={values?.end}
          values={values}
          date={endDate}
          days={endDateDays}
          onSelectDate={selectDateHandler}
        />
      </Grid>
    </Box>
  )
}
