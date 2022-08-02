import { ComponentStyleConfig } from '@chakra-ui/react'

export const CalendarDay: ComponentStyleConfig = {
  baseStyle: {
    w: 8,
    rounded: 'none',
    bgColor: 'transparent',
    textAlign: 'center',

    _hover: {
      bgColor: 'gray.100',
    },

    _disabled: {
      cursor: 'initial',
      opacity: '0.1',
    },
  },

  sizes: {
    sm: {
      h: 8,
    },
  },

  variants: {
    selected: {
      bgColor: 'pink.400',
      color: 'white',

      _hover: {
        bgColor: 'pink.200',
      },
    },

    range: {
      bgColor: 'pink.300',
      color: 'white',

      _hover: {
        bgColor: 'pink.200',
      },
    },

    disabled: {
      _hover: {
        bgColor: 'transparent',
      },
    },
  },

  defaultProps: {
    size: 'sm',
    variant: 'normal',
  },
}
