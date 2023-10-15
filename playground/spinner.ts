import { createSpinner } from '../src/index.js'

const spinner = createSpinner()

spinner.start({
  message: 'Step 1: Loading...',
})

setTimeout(() => {
  spinner.update({
    message: 'Step 1: Still loading...',
  })
}, 1000)

setTimeout(() => {
  spinner.update({
    message: 'Step 1: Almost done...',
  })
}, 2000)

setTimeout(() => {
  spinner.stop({
    message: 'Step 1: Done!',
  })
}, 3000)

setTimeout(() => {
  spinner.start({
    message: 'Step 2: Loading...',
  })
}, 4000)

setTimeout(() => {
  spinner.stop({
    message: 'Step 2: Done!',
  })
}, 5000)
