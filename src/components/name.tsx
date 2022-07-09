import * as React from 'react'
import { Heading } from '@chakra-ui/react'
import { MonthContext } from './month'

export function CalendarMonthName() {
  const { name } = React.useContext(MonthContext)

  return (
    <Heading as="h3" fontSize="md" textAlign="center">
      {name}
    </Heading>
  )
}
