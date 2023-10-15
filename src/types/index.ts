export interface UpdateOptions {
  frames?: string[]
  interval?: number
  message?: string
  template?: (animation?: string, message?: string) => string
}

export interface StopOptions {
  mark?: string
  message?: string
  template?: (mark?: string, message?: string) => string
}

export interface Options {
  /**
   * Specifies the frames to be used in the spinner animation.
   */
  frames?: string[]
  /**
   * Specifies the time delay (in ms) between each frame.
   */
  interval?: number
  /**
   * Defines the _line_ template.
   *
   * Useful when you need to rearrange the position of the animation and message or change the template completely.
   */
  template?: (animation?: string, message?: string) => string
  /**
   * Specifies global options for the `.start()` method.
   */
  start?: UpdateOptions
  /**
   * Specifies global options for the `.stop()` method.
   */
  stop?: StopOptions
  /**
   * Specifies global options for the Node `exit` event.
   *
   * It's activated when the user explicitly cancels the process in the terminal (`ctrl` + `c`).
   */
  cancel?: StopOptions
}

export interface Spinner {
  /**
   * Starts the spinner.
   *
   * Also, it can customize spinner options individually.
   */
  start(options?: UpdateOptions): void
  /**
   * Dynamically updates the spinner on the fly.
   *
   * Very useful when you want to change the message
   * or dynamics of other options before stopping the spinner.
   */
  update(options?: UpdateOptions): void
  /**
   * Stops the spinner with a custom mark and message.
   *
   * Also, this method can be used as _success_, _warning_, _cancel_, _error_ or similar events,
   * since it is very customizable.
   */
  stop(options?: StopOptions): void
}

// Auto-generated
export * from '../index.js'
