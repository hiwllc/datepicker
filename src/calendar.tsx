import { Box, Flex, Button, Grid } from '@chakra-ui/react'
import { Month } from './month'
import { useCalendar } from './useCalendar'
import type { CalendarDate } from './useCalendar'

type Calendar = {
  values: {
    start: CalendarDate
    end?: CalendarDate
  }
}

export function Calendar({ values }: Calendar) {
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
        />
        <Month
          startSelectedDate={values?.start}
          endSelectedDate={values?.end}
          values={values}
          date={endDate}
          days={endDateDays}
        />
      </Grid>
    </Box>
  )
}
