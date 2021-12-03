import { ComponentMultiStyleConfig } from '@chakra-ui/react'

export const Calendar: ComponentMultiStyleConfig = {
  parts: ['calendar', 'months'],

  baseStyle: {
    calendar: {
      position: 'relative',
      w: 'min-content',
      borderWidth: '1px',
      rounded: 'md',
      shadow: 'lg',
    },

    months: {
      p: 4,
      w: '100%',
      gridTemplateColumns: '1fr 1fr',
    },
  },
}
