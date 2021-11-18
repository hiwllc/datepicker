import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'
import {
  Input,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Box,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import format from 'date-fns/format'
import { CalendarValues, CalendarDate } from './types'
import { Calendar } from './calendar'
import ptBR from 'date-fns/locale/pt-BR'

export default {
  title: 'Calendar',
  component: Calendar,
} as ComponentMeta<typeof Calendar>

export const Basic: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = useState<CalendarValues>({
    start: undefined,
    end: undefined,
  })

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return <Calendar value={dates} onSelectDate={handleSelectDate} />
}

export const WithInputs: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = useState<CalendarValues>({
    start: undefined,
    end: undefined,
  })

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSelectDate = (dates: CalendarValues) => {
    setDates(dates)

    if (dates.end) {
      onClose()
    }
  }

  return (
    <Box h="600px">
      <Popover isOpen={isOpen} onClose={onClose}>
        <PopoverTrigger>
          <Flex onClick={onOpen} w="300px" p={2} borderWidth={1} rounded="md">
            <Input
              variant="unstyled"
              placeholder="start date"
              defaultValue={dates.start && format(dates.start, 'MM/dd/yyyy')}
            />
            <Input
              variant="unstyled"
              placeholder="end date"
              defaultValue={dates.end && format(dates.end, 'MM/dd/yyyy')}
            />
          </Flex>
        </PopoverTrigger>

        <PopoverContent
          p={0}
          w="min-content"
          border="none"
          outline="none"
          _focus={{ boxShadow: 'none' }}
        >
          <PopoverBody>
            <Calendar value={dates} onSelectDate={handleSelectDate} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}

export const SingleMonth: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = useState<CalendarValues>({
    start: undefined,
    end: undefined,
  })

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return <Calendar value={dates} onlyOneMonth onSelectDate={handleSelectDate} />
}

export const SingleDateSelection: ComponentStory<typeof Calendar> = () => {
  const [date, setDate] = useState<CalendarDate>(new Date())

  const handleSelectDate = (date: CalendarDate) => setDate(date)

  return (
    <Box>
      <Input w="200px" mb={4} value={format(date, 'MM/dd/yyyy')} />

      <Calendar
        value={{ start: date }}
        onlyOneMonth
        singleDateSelection
        onSelectDate={handleSelectDate}
      />
    </Box>
  )
}

export const WithCustomButton: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = useState<CalendarValues>({
    start: undefined,
    end: undefined,
  })

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
    <Calendar
      nextButton={props => (
        <Button size="xs" colorScheme="purple" {...props}>
          &#8250;
        </Button>
      )}
      prevButton={props => (
        <Button size="xs" colorScheme="purple" {...props}>
          &#8249;
        </Button>
      )}
      value={dates}
      onSelectDate={handleSelectDate}
    />
  )
}

export const CustomLocale: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = useState<CalendarValues>({
    start: undefined,
    end: undefined,
  })

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
    <Calendar
      weekdayFormat="EEEEEE"
      value={dates}
      locale={ptBR}
      onSelectDate={handleSelectDate}
    />
  )
}

export const BlockPastDates: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = useState<CalendarValues>({
    start: undefined,
    end: undefined,
  })

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
    <Calendar blockPastDates value={dates} onSelectDate={handleSelectDate} />
  )
}

export const BlockFutureDates: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = useState<CalendarValues>({
    start: undefined,
    end: undefined,
  })

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
    <Calendar blockFutureDates value={dates} onSelectDate={handleSelectDate} />
  )
}
