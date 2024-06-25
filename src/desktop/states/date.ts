import { dayjs } from 'src/desktop/utils/locale'

export const date = Variable('', {
  poll: [1000*60*10, function() {
    return dayjs().format('ddd  D  MMM')
  }]
})

export const time = Variable('', {
  poll: [2000, function() {
    return dayjs().format('HH:mm')
  }]
})

