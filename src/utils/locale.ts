import Dayjs from 'dayjs'

import 'dayjs/locale/pt'

// import customParseFormat from 'dayjs/plugin/customParseFormat'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import localeData from 'dayjs/plugin/localeData'
// import minMax from 'dayjs/plugin/minMax'
// import duration from 'dayjs/plugin/duration'
// import weekday from 'dayjs/plugin/weekday'
// import weekOfYear from 'dayjs/plugin/weekOfYear'
// import isBetween from 'dayjs/plugin/isBetween'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

export const dayjs = Dayjs

dayjs.extend(localizedFormat)
dayjs.extend(localeData)
// dayjs.extend(minMax)
// dayjs.extend(duration)
// dayjs.extend(customParseFormat)
// dayjs.extend(weekday)
// dayjs.extend(weekOfYear)
// dayjs.extend(isBetween)
dayjs.extend(utc)
dayjs.extend(timezone)
// dayjs.tz.guess()

dayjs().localeData()
