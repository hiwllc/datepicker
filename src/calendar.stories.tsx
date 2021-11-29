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
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { format, addDays, subDays, addMonths, subMonths } from 'date-fns'
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

  return <Calendar value={dates} singleMonth onSelectDate={handleSelectDate} />
}

export const SingleDateSelection: ComponentStory<typeof Calendar> = () => {
  const [date, setDate] = useState<CalendarDate>(new Date())

  const handleSelectDate = (date: CalendarDate) => setDate(date)

  return (
    <Box>
      <Input w="200px" mb={4} value={format(date, 'MM/dd/yyyy')} />

      <Calendar
        value={{ start: date }}
        singleMonth
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

export const DisablePastDates: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = useState<CalendarValues>({
    start: undefined,
    end: undefined,
  })

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
    <Calendar disablePastDates value={dates} onSelectDate={handleSelectDate} />
  )
}

export const DisableFutureDates: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = useState<CalendarValues>({
    start: undefined,
    end: undefined,
  })

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
    <Calendar
      disableFutureDates
      value={dates}
      onSelectDate={handleSelectDate}
    />
  )
}

export const DisableSomeDates: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = useState<CalendarValues>({
    start: undefined,
    end: undefined,
  })

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  const date = new Date()

  const denyDates = [
    subDays(date, 2),
    subDays(date, 1),
    date,
    addDays(date, 2),
    addMonths(date, 1),
  ]

  return (
    <Calendar
      disableDates={denyDates}
      value={dates}
      onSelectDate={handleSelectDate}
    />
  )
}

export const DisableWeekends: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = useState<CalendarValues>({
    start: undefined,
    end: undefined,
  })

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
    <Calendar disableWeekends value={dates} onSelectDate={handleSelectDate} />
  )
}

export const AllowOutsideDays: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = useState<CalendarValues>({
    start: undefined,
    end: undefined,
  })

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
    <Calendar
      singleMonth
      allowOutsideDays
      value={dates}
      onSelectDate={handleSelectDate}
    />
  )
}

export const PresetDates: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = useState<CalendarValues>({
    start: undefined,
    end: undefined,
  })

  const handleSelectDate = (dates: CalendarValues) => {
    setDates(dates)
  }

  const date = new Date()

  const handleSelectPastPresetDates = (amount: number, isMonth?: boolean) => {
    setDates({
      start: isMonth ? subMonths(date, amount) : subDays(date, amount),
      end: new Date(),
    })
  }

  const handleSelectFuturePresetDates = (amount: number, isMonth?: boolean) => {
    setDates({
      start: new Date(),
      end: isMonth ? addMonths(date, amount) : addDays(date, amount),
    })
  }

  return (
    <Calendar value={dates} onSelectDate={handleSelectDate}>
      <VStack
        spacing={4}
        py={6}
        p={4}
        h="100%"
        alignItems="stretch"
        bgColor="gray.50"
        borderEndRadius="md"
      >
        <Button
          onClick={() => handleSelectPastPresetDates(7)}
          colorScheme="teal"
          size="xs"
        >
          last 7 days
        </Button>
        <Button
          onClick={() => handleSelectPastPresetDates(14)}
          colorScheme="teal"
          size="xs"
        >
          last 14 days
        </Button>
        <Button
          onClick={() => handleSelectPastPresetDates(1, true)}
          colorScheme="teal"
          size="xs"
        >
          last month
        </Button>
        <Button
          onClick={() => handleSelectFuturePresetDates(7)}
          colorScheme="pink"
          size="xs"
        >
          next 7 days
        </Button>
        <Button
          onClick={() => handleSelectFuturePresetDates(14)}
          colorScheme="pink"
          size="xs"
        >
          next 14 days
        </Button>
        <Button
          onClick={() => handleSelectFuturePresetDates(1, true)}
          colorScheme="pink"
          size="xs"
        >
          next month
        </Button>
      </VStack>
    </Calendar>
  )
}
