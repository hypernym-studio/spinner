import process, { stdout } from 'node:process'
import { green, red } from './utils'
import type { Options, Spinner, UpdateOptions } from './types'

/**
 * Creates a tiny and super customizable CLI spinner for Node.
 *
 * @example
 *
 * ```ts
 * import { createSpinner } from '@hypernym/spinner'
 *
 * const spinner = createSpinner()
 *
 * spinner.start()
 *
 * setTimeout(() => {
 *   spinner.stop()
 * }, 3000)
 * ```
 */
export function createSpinner(options: Options = {}): Spinner {
  const {
    frames,
    interval,
    template,
    start = {},
    cancel = {},
    stop = {},
  } = options

  let _iteration = 0
  let _interval = interval || 40
  let _intervalId: NodeJS.Timeout
  let _frames = frames || ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
  let _message = start.message || 'Loading...'
  let _template: Options['template']

  const _cursor = {
    hide: () => stdout.write('\u001B[?25l'),
    show: () => stdout.write('\u001B[?25h'),
  }

  function _write(line: string): void {
    const isTerminal = /(\r?\n|\r)$/.test(line)

    stdout.cursorTo(0)
    stdout.write(line.trim())
    stdout.clearLine(1)
    stdout.write(isTerminal ? '\r\n' : '')
  }

  function _render(): void {
    const animation = _frames[_iteration++ % _frames.length]
    let line = `${green(animation)} ${_message}`

    if (template) line = template(animation, _message)
    if (_template) line = _template(animation, _message)

    _write(line)
  }

  function _exit(): never {
    spinner.stop({
      mark: red('✖'),
      message: 'Cancelled!',
      ...cancel,
    })
    process.exit()
  }

  function _update(options?: UpdateOptions): void {
    _frames = options?.frames || _frames
    _message = options?.message || _message
    _template = options?.template || _template
  }

  function _clear(int?: number): void {
    if (int) {
      _interval = int
      clearInterval(_intervalId)
      _intervalId = setInterval(_render, _interval)
    }
  }

  const spinner: Spinner = {
    start(options) {
      _update(options)

      _cursor.hide()
      _intervalId = setInterval(_render, _interval)

      _clear(options?.interval)
    },

    update(options) {
      _update(options)
      _clear(options?.interval)
    },

    stop(options) {
      const mark = options?.mark || stop.mark || green('✔')
      const message = options?.message || stop.message || 'Done!'
      let line = `${mark} ${message}\n`

      if (options?.template) line = `${options.template(mark, message)}\n`

      _cursor.show()
      clearInterval(_intervalId)

      _write(line)
    },
  }

  process.on('SIGINT', _exit)
  process.on('SIGTERM', _exit)

  return spinner
}
