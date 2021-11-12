import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'
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
