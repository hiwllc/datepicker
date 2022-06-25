import * as React from 'react'
import { Button, SystemStyleObject, useMultiStyleConfig } from '@chakra-ui/react'
import { CalendarContext } from './context'
import { CalendarControlStyles } from './types'

type CalendarPrevButton = {
  as?: ({ onClick, sx }: { onClick: VoidFunction, sx: SystemStyleObject }) => JSX.Element
}

export function CalendarPrevButton({ as }: CalendarPrevButton) {
  const styles = useMultiStyleConfig(
    'CalendarControl',
    {}
  ) as CalendarControlStyles
  const { prevMonth } = React.useContext(CalendarContext)

  if (as) {
    return as({ onClick: prevMonth, sx: styles.button })
  }

  return (
    <Button onClick={prevMonth} sx={styles.button}>
      &#8592;
    </Button>
  )
}
