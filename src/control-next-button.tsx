import * as React from 'react'
import { Button, useMultiStyleConfig } from '@chakra-ui/react'
import { CalendarContext } from './context'
import { CalendarControlStyles } from './types'

type CalendarNextButton = {
  as?: ({ onClick }: { onClick: VoidFunction }) => JSX.Element
  year?: boolean
}

export function CalendarNextButton({ as, year }: CalendarNextButton) {
  const styles = useMultiStyleConfig(
    'CalendarControl',
    {}
  ) as CalendarControlStyles
  const { nextMonth, nextYear } = React.useContext(CalendarContext)

  const handleClick = () => {
    if (year) {
      nextYear()
    } else {
      nextMonth()
    }
  }

  if (as) {
    return as({ onClick: handleClick })
  }

  return (
    <Button onClick={handleClick} sx={styles.button}>
      &#8594;
    </Button>
  )
}
