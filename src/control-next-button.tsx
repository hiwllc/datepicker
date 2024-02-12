import * as React from 'react'
import { Button, useMultiStyleConfig } from '@chakra-ui/react'
import { CalendarContext } from './context'
import { type CalendarControlStyles } from './types'

type CalendarNextButton = {
  as?: ({ onClick }: { onClick: VoidFunction }) => JSX.Element
}

export function CalendarNextButton({ as }: CalendarNextButton) {
  const styles = useMultiStyleConfig(
    'CalendarControl',
    {}
  ) as CalendarControlStyles
  const { nextMonth } = React.useContext(CalendarContext)

  if (as) {
    return as({ onClick: nextMonth })
  }

  return (
    <Button onClick={nextMonth} sx={styles.button}>
      &#8594;
    </Button>
  )
}
