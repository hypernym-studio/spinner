import { createSpinner } from '../src/index.js'

const spinner = createSpinner()

spinner.start()

setTimeout(() => {
  spinner.stop()
}, 2000)
