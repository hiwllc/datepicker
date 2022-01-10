import { Button, useMultiStyleConfig } from '@chakra-ui/react'
import { useContext } from 'react'
import { CalendarContext } from './context'
import { CalendarControlStyles } from './types'

type CalendarNextButton = {
  as?: ({ onClick }: { onClick: VoidFunction }) => JSX.Element
}

export function CalendarNextButton({ as }: CalendarNextButton) {
  const styles = useMultiStyleConfig(
    'CalendarControl',
    {}
  ) as CalendarControlStyles
  const { nextMonth } = useContext(CalendarContext)

  if (as) {
    return as({ onClick: nextMonth })
  }

  return (
    <Button onClick={nextMonth} sx={styles.button}>
      &#8594;
    </Button>
  )
}
