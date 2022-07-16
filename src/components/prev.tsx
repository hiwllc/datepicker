import { Button, useStyleConfig } from '@chakra-ui/react'
import { useCalendarContext } from '../providers/calendar'

export function CalendarPrevButton() {
  const { onPrevMonth } = useCalendarContext()
  const style = useStyleConfig('CalendarControl')

  return (
    <Button onClick={onPrevMonth} aria-label="prev month" sx={style}>
      &#8592;
    </Button>
  )
}
