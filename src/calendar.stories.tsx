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
} from '@chakra-ui/react'
import format from 'date-fns/format'
import { CalendarValues } from './types'
import { Calendar } from './calendar'

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

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
    <Box h="600px">
      <Popover>
        <PopoverTrigger>
          <Flex w="300px" p={2} borderWidth={1} rounded="md">
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
