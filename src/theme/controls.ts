import { ComponentMultiStyleConfig } from '@chakra-ui/react'

export const CalendarControl: ComponentMultiStyleConfig = {
  parts: ['controls', 'button'],

  baseStyle: {
    controls: {
      position: 'absolute',
      p: 4,
      w: '100%',
      justifyContent: 'space-between',
    },

    button: {
      h: 6,
      px: 2,
      lineHeight: 0,
      fontSize: 'md',
      rounded: 'md',
    },
    smallButton: {
      h: 6,
      minW: 6,
      px: 0,
      justifyContent: 'center',
      lineHeight: 0,
      fontSize: 'md',
      rounded: 'md',
    },
  },
}
