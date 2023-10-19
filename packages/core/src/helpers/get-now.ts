import dayjs from 'dayjs'

function getNow() {
  return dayjs().format('YYYY-MM-DD HH:mm:ss')
}

export { getNow }
