import * as React from 'react'
import { Heading, useMultiStyleConfig } from '@chakra-ui/react'
import { MonthContext } from './month'

export function CalendarMonthName() {
  const { name } = React.useContext(MonthContext)
  const styles = useMultiStyleConfig('CalendarMonth', {})

  return (
    <Heading as="h3" sx={styles.name}>
      {name}
    </Heading>
  )
}
