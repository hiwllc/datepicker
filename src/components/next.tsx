import { Button, useStyleConfig } from '@chakra-ui/react'
import { useCalendarContext } from './provider'

export function CalendarNextButton() {
  const { onNextMonth } = useCalendarContext()
  const style = useStyleConfig('CalendarControl')

  return (
    <Button onClick={onNextMonth} aria-label="next month" sx={style}>
      &#8594;
    </Button>
  )
}
