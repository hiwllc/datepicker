import { Flex, Button, useMultiStyleConfig } from '@chakra-ui/react'
import type { Buttons } from './types'

export type Controls = {
  prevMonth: () => void
  nextMonth: () => void
  nextButton?: Buttons
  prevButton?: Buttons
}

export function Controls({
  nextMonth,
  prevMonth,
  nextButton,
  prevButton,
}: Controls) {
  const styles = useMultiStyleConfig('CalendarControl', {})

  return (
    <Flex sx={styles.controls}>
      {prevButton ? (
        prevButton({ onClick: prevMonth })
      ) : (
        <Button onClick={prevMonth} sx={styles.button}>
          &#8592;
        </Button>
      )}

      {nextButton ? (
        nextButton({ onClick: nextMonth })
      ) : (
        <Button onClick={nextMonth} sx={styles.button}>
          &#8594;
        </Button>
      )}
    </Flex>
  )
}
