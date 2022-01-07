import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'

import { Calendar } from './calendar'
import { CalendarMonth } from './month'
import { CalendarDays } from './month-days'
import { CalendarMonthName } from './month-name'
import { CalendarWeek } from './month-week'
import { CalendarMonths } from './months'
import { CalendarControls } from './control'
import { CalendarNextButton } from './control-next-button'
import { CalendarPrevButton } from './control-prev-button'
import { CalendarDate, CalendarValues } from './types'
import { addDays, subDays } from 'date-fns'

export default {
  title: 'Calendar',
  component: Calendar,
} as ComponentMeta<typeof Calendar>

export const Basic: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = useState<CalendarValues>({})

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
    <Calendar value={dates} onSelectDate={handleSelectDate}>
      <CalendarControls>
        <CalendarPrevButton />
        <CalendarNextButton />
      </CalendarControls>

      <CalendarMonths>
        <CalendarMonth>
          <CalendarMonthName />
          <CalendarWeek />
          <CalendarDays />
        </CalendarMonth>
      </CalendarMonths>
    </Calendar>
  )
}

export const DisablePastDates: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = useState<CalendarValues>({})

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
    <Calendar value={dates} onSelectDate={handleSelectDate} disablePastDates>
      <CalendarControls>
        <CalendarPrevButton />
        <CalendarNextButton />
      </CalendarControls>

      <CalendarMonths>
        <CalendarMonth>
          <CalendarMonthName />
          <CalendarWeek />
          <CalendarDays />
        </CalendarMonth>
      </CalendarMonths>
    </Calendar>
  )
}

export const DisableFutureDates: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = useState<CalendarValues>({})

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
    <Calendar value={dates} onSelectDate={handleSelectDate} disableFutureDates>
      <CalendarControls>
        <CalendarPrevButton />
        <CalendarNextButton />
      </CalendarControls>

      <CalendarMonths>
        <CalendarMonth>
          <CalendarMonthName />
          <CalendarWeek />
          <CalendarDays />
        </CalendarMonth>
      </CalendarMonths>
    </Calendar>
  )
}

export const DisableDates: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = useState<CalendarValues>({})

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  const today = new Date()
  const disabledDates = [
    subDays(today, 5),
    today,
    addDays(today, 1),
    addDays(today, 2),
    addDays(today, 40),
  ]

  return (
    <Calendar
      value={dates}
      onSelectDate={handleSelectDate}
      disableDates={disabledDates}
    >
      <CalendarControls>
        <CalendarPrevButton />
        <CalendarNextButton />
      </CalendarControls>

      <CalendarMonths>
        <CalendarMonth>
          <CalendarMonthName />
          <CalendarWeek />
          <CalendarDays />
        </CalendarMonth>
      </CalendarMonths>
    </Calendar>
  )
}

export const DisableWeekends: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = useState<CalendarValues>({})

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
    <Calendar value={dates} onSelectDate={handleSelectDate} disableWeekends>
      <CalendarControls>
        <CalendarPrevButton />
        <CalendarNextButton />
      </CalendarControls>

      <CalendarMonths>
        <CalendarMonth>
          <CalendarMonthName />
          <CalendarWeek />
          <CalendarDays />
        </CalendarMonth>
      </CalendarMonths>
    </Calendar>
  )
}

export const AllowOutsideDays: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = useState<CalendarValues>({})

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
    <Calendar value={dates} onSelectDate={handleSelectDate} allowOutsideDays>
      <CalendarControls>
        <CalendarPrevButton />
        <CalendarNextButton />
      </CalendarControls>

      <CalendarMonths>
        <CalendarMonth>
          <CalendarMonthName />
          <CalendarWeek />
          <CalendarDays />
        </CalendarMonth>
      </CalendarMonths>
    </Calendar>
  )
}

export const SingleDateSelection: ComponentStory<typeof Calendar> = () => {
  const [date, setDate] = useState<CalendarDate>()

  const handleSelectDate = (date: CalendarDate) => setDate(date)

  return (
    <Calendar
      value={{ start: date }}
      onSelectDate={handleSelectDate}
      singleDateSelection
    >
      <CalendarControls>
        <CalendarPrevButton />
        <CalendarNextButton />
      </CalendarControls>

      <CalendarMonths>
        <CalendarMonth>
          <CalendarMonthName />
          <CalendarWeek />
          <CalendarDays />
        </CalendarMonth>
      </CalendarMonths>
    </Calendar>
  )
}
