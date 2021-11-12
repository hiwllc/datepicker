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
import { CalendarDate, Values } from 'src'
import { Calendar } from './calendar'

export default {
  title: 'Calendar',
  component: Calendar,
} as ComponentMeta<typeof Calendar>

export const Basic: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = useState<Values>({
    start: undefined,
    end: undefined,
  })

  const handleSelectStartDate = (date: CalendarDate) =>
    setDates(dates => ({ ...dates, start: date }))

  const handleSelectEndDate = (date: CalendarDate) =>
    setDates(dates => ({ ...dates, end: date }))

  return (
    <Calendar
      values={dates}
      onSelectEndDate={handleSelectEndDate}
      onSelectStartDate={handleSelectStartDate}
    />
  )
}

export const WithInputs: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = useState<Values>({
    start: undefined,
    end: undefined,
  })

  const handleSelectStartDate = (date: CalendarDate) => {
    setDates(dates => ({ ...dates, start: date }))
  }

  const handleSelectEndDate = (date: CalendarDate) => {
    setDates(dates => ({ ...dates, end: date }))
  }

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
            <Calendar
              values={dates}
              onSelectStartDate={handleSelectStartDate}
              onSelectEndDate={handleSelectEndDate}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}
