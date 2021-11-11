import { Box, Flex, Button, Grid } from '@chakra-ui/react'
import { Month } from './month'
import { useCalendar } from './useCalendar'

export function Calendar() {
  const {
    startDateDays,
    endDateDays,
    startDate,
    endDate,
    nextMonth,
    prevMonth,
  } = useCalendar({
    start: new Date(),
  })

  return (
    <Box p={2} w="600px" borderWidth="1px" rounded="md" shadow="lg">
      <Flex w="100%" justifyContent="space-between">
        <Button onClick={prevMonth} size="sm">
          prev
        </Button>
        <Button onClick={nextMonth} size="sm">
          next
        </Button>
      </Flex>

      <Grid gap={4} w="100%" gridTemplateColumns="1fr 1fr">
        <Month date={startDate} days={startDateDays} />
        <Month date={endDate} days={endDateDays} />
      </Grid>
    </Box>
  )
}
