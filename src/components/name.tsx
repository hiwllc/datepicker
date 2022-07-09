import * as React from 'react'
import { Heading } from '@chakra-ui/react'
import { useMonthContext } from '../hooks/use-month'
import { MonthContext } from './month'

export function CalendarMonthName() {
  const { month } = React.useContext(MonthContext)
  const { name } = useMonthContext(month)

  return (
    <Heading as="h3" fontSize="md" textAlign="center">
      {name}
    </Heading>
  )
}
