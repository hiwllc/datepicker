# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Block previous dates
- Block future dates
- Block weekends
- Block some dates
- Add preset of dates: `7 days`, `14 days`, `1 month`
- Enable outside days in single month
- Reset to current date if not selected on close

## [0.3.0] - 2021-11-18
### Added
- Support lacales with date-fns
- Month name and year format
- Month missing `styles.month` prop

### Changed
- Move `Buttons`, `NextButton` and `PrevButton` type to type file

## [0.2.0] - 2021-11-14
### Added
- Show only one month
- Select only one date
- Example to close on select dates
- Chevron icons in next/prev buttons
- Custom buttons control

### Changed
- Rename `Values` to `CalendarValues`
- Prefix theme keys with `Calendar`
- Use `onSelectDate` instead of `onSelectStartDate` and `onSelectEndDate`

## [0.1.1] - 2021-11-12
### Added
- Select end/start dates
- Default theme
