import * as React from 'react'
import { Button, useMultiStyleConfig } from '@chakra-ui/react'
import { CalendarContext } from './context'
import { CalendarControlStyles } from './types'

type CalendarPrevButton = {
  as?: ({ onClick }: { onClick: VoidFunction }) => JSX.Element
  year?: boolean
}

export function CalendarPrevButton({ as, year }: CalendarPrevButton) {
  const styles = useMultiStyleConfig(
    'CalendarControl',
    {}
  ) as CalendarControlStyles
  const { prevMonth, prevYear } = React.useContext(CalendarContext)

  const handleClick = () => {
    if (year) {
      prevYear()
    } else {
      prevMonth()
    }
  }

  if (as) {
    return as({ onClick: handleClick })
  }

  return (
    <Button onClick={handleClick} sx={styles.button}>
      &#8592;
    </Button>
  )
}
