import { Flex, Button, useMultiStyleConfig } from '@chakra-ui/react'

export type Controls = {
  prevMonth: () => void
  nextMonth: () => void
}

export function Controls({ nextMonth, prevMonth }: Controls) {
  const styles = useMultiStyleConfig('CalendarControl', {})

  return (
    <Flex sx={styles.controls}>
      <Button onClick={prevMonth} sx={styles.button}>
        prev
      </Button>
      <Button onClick={nextMonth} sx={styles.button}>
        next
      </Button>
    </Flex>
  )
}
