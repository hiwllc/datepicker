import { Button } from '@chakra-ui/react'
import { useCalendarContext } from './provider'

export function CalendarPrevButton() {
  const { onPrevMonth } = useCalendarContext()
  return (
    <Button
      fontSize="md"
      h={6}
      px={2}
      lineHeight={0}
      onClick={onPrevMonth}
      aria-label="prev month"
    >
      &#8592;
    </Button>
  )
}
