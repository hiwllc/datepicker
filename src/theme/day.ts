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
      color: 'gray.200',
      _hover: {
        cursor: 'initial',
        bgColor: 'transparent',
      },
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
      bgColor: 'pink.200',
      color: 'white',

      _hover: {
        bgColor: 'pink.100',
      },

      _disabled: {
        _hover: {
          bgColor: 'pink.300',
        },
      },
    },
  },

  defaultProps: {
    size: 'sm',
    variant: 'normal',
  },
}
