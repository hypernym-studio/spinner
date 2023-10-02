import { createSpinner } from '../src/index.js'

const spinner = createSpinner()

spinner.start()

setTimeout(() => {
  spinner.update({
    message: 'Still loading...',
  })
}, 1000)

setTimeout(() => {
  spinner.update({
    message: 'Almost done...',
  })
}, 2000)

setTimeout(() => {
  spinner.stop()
}, 3000)
