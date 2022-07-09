import * as React from 'react'
import { Box } from '@chakra-ui/react'

type MonthContext = {
  month?: number
}

export const MonthContext = React.createContext<MonthContext>({
  month: 0,
})

export function CalendarMonth({
  children,
  month = 0,
}: React.PropsWithChildren<MonthContext>) {
  return (
    <MonthContext.Provider value={{ month }}>
      <Box>{children}</Box>
    </MonthContext.Provider>
  )
}
