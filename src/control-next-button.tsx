import * as React from 'react'
import { Button, SystemStyleObject, useMultiStyleConfig } from '@chakra-ui/react'
import { CalendarContext } from './context'
import { CalendarControlStyles } from './types'

type CalendarNextButton = {
  as?: ({ onClick, sx }: { onClick: VoidFunction, sx: SystemStyleObject }) => JSX.Element
}

export function CalendarNextButton({ as }: CalendarNextButton) {
  const styles = useMultiStyleConfig(
    'CalendarControl',
    {}
  ) as CalendarControlStyles
  const { nextMonth } = React.useContext(CalendarContext)

  if (as) {
    return as({ onClick: nextMonth, sx: styles.button })
  }

  return (
    <Button onClick={nextMonth} sx={styles.button}>
      &#8594;
    </Button>
  )
}
