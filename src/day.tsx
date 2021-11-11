import format from 'date-fns/format'
import { Button } from '@chakra-ui/react'
import { CalendarDate } from 'src'

type Day = {
  day: CalendarDate
  isSelected: boolean
  isInRange?: boolean
  onSelectDate: (date: Date | number) => void
}

export function Day({ day, isSelected, isInRange }: Day) {
  let styles = {}

  if (isSelected) {
    styles = {
      bgColor: 'pink.400',
      color: 'white',

      _hover: {
        bgColor: 'pink.300',
      },
    }
  }

  if (isInRange && !isSelected) {
    styles = {
      bgColor: 'pink.200',
      color: 'white',

      _hover: {
        bgColor: 'pink.100',
      },
    }
  }

  return (
    <Button rounded="none" size="sm" variant="ghost" {...styles}>
      {format(day, 'd')}
    </Button>
  )
}
