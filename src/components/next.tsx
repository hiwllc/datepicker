import { Button } from '@chakra-ui/react'
import { useCalendarContext } from './provider'

export function CalendarNextButton() {
  const { onNextMonth } = useCalendarContext()
  return (
    <Button
      fontSize="md"
      h={6}
      px={2}
      lineHeight={0}
      onClick={onNextMonth}
      aria-label="next month"
    >
      &#8594;
    </Button>
  )
}
