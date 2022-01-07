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
import { CalendarValues } from './types'

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
