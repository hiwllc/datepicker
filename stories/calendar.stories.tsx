import * as React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import {
  Calendar,
  CalendarContent,
  CalendarHeader,
  CalendarMonth,
  CalendarMonthDays,
  CalendarMonthName,
  CalendarMonths,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarWeek,
  useCalendar,
} from '../src'
import { addMonths } from 'date-fns'

export default {
  title: 'Calendar',
  component: Calendar,
} as ComponentMeta<typeof Calendar>

export const Basic: ComponentStory<typeof Calendar> = () => {
  const { getCalendarProps, getMonthProps } = useCalendar({
    initialDate: addMonths(new Date(), 1),
  })

  return (
    <Calendar {...getCalendarProps()}>
      <CalendarContent>
        <CalendarHeader>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarHeader>

        <CalendarMonth {...getMonthProps()}>
          <CalendarMonthName />
          <CalendarWeek />
          <CalendarMonthDays />
        </CalendarMonth>
      </CalendarContent>
    </Calendar>
  )
}

export const WithMultipleMonths: ComponentStory<typeof Calendar> = () => {
  const { getCalendarProps, getMonthProps, months } = useCalendar({
    initialDate: addMonths(new Date(), 1),
    months: 2,
  })

  return (
    <Calendar {...getCalendarProps()}>
      <CalendarContent>
        <CalendarHeader>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarHeader>

        <CalendarMonths>
          {months.map(month => (
            // eslint-disable-next-line react/jsx-key
            <CalendarMonth {...getMonthProps(month.number)}>
              <CalendarMonthName />
              <CalendarWeek />
              <CalendarMonthDays />
            </CalendarMonth>
          ))}
        </CalendarMonths>
      </CalendarContent>
    </Calendar>
  )
}

export const WithSingleDateSelection: ComponentStory<typeof Calendar> = () => {
  const { getCalendarProps, getMonthProps } = useCalendar({
    initialDate: addMonths(new Date(), 1),
    singleDateSelection: true,
  })

  return (
    <Calendar {...getCalendarProps()}>
      <CalendarContent>
        <CalendarHeader>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarHeader>

        <CalendarMonth {...getMonthProps()}>
          <CalendarMonthName />
          <CalendarWeek />
          <CalendarMonthDays />
        </CalendarMonth>
      </CalendarContent>
    </Calendar>
  )
}
