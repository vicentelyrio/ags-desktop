import Dayjs from 'dayjs'

import localizedFormat from 'dayjs/plugin/localizedFormat'
import localeData from 'dayjs/plugin/localeData'

export const dayjs = Dayjs

dayjs.extend(localizedFormat)
dayjs.extend(localeData)

dayjs().localeData()
