import { ComponentStyleConfig } from '@chakra-ui/react'

export const CalendarContent: ComponentStyleConfig = {
  baseStyle: {
    /* eslint-disable prettier/prettier */
    borderWidth: 1,
    rounded: 'md',
    shadow: 'lg',
    p: 4,
    width: 'max-content',
    gridTemplateRows: 'max-content 1fr',


    '& > *': {
      _last: {
        gridRowStart: 1,
        gridColumnStart: 1,
      }
    }
  },
}
