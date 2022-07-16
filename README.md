# Datepicker
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-8-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

A simple datepicker component build with [date-fns][1] and [Chakra-UI][2].

## Table of Contents

- [Requisites](#requisites)
- [Installation and Usage](#installation-and-usage)
- [Customizing](#customizing)
- [License](#license)

## Requisites
You need to install [date-fns][1] and [chakra-ui][2] in order to use this library.

```bash
yarn add date-fns
```

To install chakra-ui follow their [guide here](https://chakra-ui.com/guides/first-steps#framework-guide).

## Installation and Usage
After install these dependencies you can now install the library and use this as below:

```bash
yarn add @uselessdev/datepicker
```

Before to use this you can create your own theme or use the default one.

```tsx
import { ChakraProvider } from '@chakra-ui/react'
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
  CalendarDefaultTheme,
  useCalendar,
} from '@uselessdev/datepicker'

export function App() {
  const { getCalendarProps, getMonthProps } = useCalendar()

  return (
    return (
      <ChakraProvider theme={CalendarDefaultTheme}>
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
      </ChakraProvider>
    )
  )
}
```

**note that the example above doens't render an input but only the calendar**

## License
This code is under the [Apache-2.0](LICENSE) License

[1]: https://date-fns.org/
[2]: https://chakra-ui.com/

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://iamwallace.dev"><img src="https://avatars.githubusercontent.com/u/6943919?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Wallace Batista</b></sub></a><br /><a href="https://github.com/uselessdev/datepicker/commits?author=uselessdev" title="Code">💻</a> <a href="#ideas-uselessdev" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://htttp://www.leonardoelias.me"><img src="https://avatars.githubusercontent.com/u/1995213?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Leonardo Elias</b></sub></a><br /><a href="https://github.com/uselessdev/datepicker/commits?author=leonardoelias" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/kivi"><img src="https://avatars.githubusercontent.com/u/366163?v=4?s=100" width="100px;" alt=""/><br /><sub><b>kivi</b></sub></a><br /><a href="https://github.com/uselessdev/datepicker/commits?author=kivi" title="Code">💻</a></td>
    <td align="center"><a href="http://guiteixeira.dev"><img src="https://avatars.githubusercontent.com/u/24235344?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Guilherme Teixeira </b></sub></a><br /><a href="https://github.com/uselessdev/datepicker/commits?author=ggteixeira" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/branislaav"><img src="https://avatars.githubusercontent.com/u/10597602?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Brano Zavracky</b></sub></a><br /><a href="https://github.com/uselessdev/datepicker/commits?author=branislaav" title="Code">💻</a></td>
    <td align="center"><a href="https://pixel.is-a.dev"><img src="https://avatars.githubusercontent.com/u/69857856?v=4?s=100" width="100px;" alt=""/><br /><sub><b>O. Qudah</b></sub></a><br /><a href="https://github.com/uselessdev/datepicker/commits?author=BasicPixel" title="Documentation">📖</a></td>
    <td align="center"><a href="https://medium.com/@tomchentw"><img src="https://avatars.githubusercontent.com/u/922234?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tom Chen</b></sub></a><br /><a href="https://github.com/uselessdev/datepicker/commits?author=tomchentw" title="Documentation">📖</a> <a href="https://github.com/uselessdev/datepicker/commits?author=tomchentw" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/astahmer"><img src="https://avatars.githubusercontent.com/u/47224540?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alexandre Stahmer</b></sub></a><br /><a href="https://github.com/uselessdev/datepicker/commits?author=astahmer" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
