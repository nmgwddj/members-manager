import { Tracker } from 'meteor/tracker'

export default (reactiveMapper) => {
  return (props, onData, env) => {
    let trackerCleanup = null
    const handler = Tracker.nonreactive(() => {
      return Tracker.autorun(() => {
        // assign the custom clean-up function.
        trackerCleanup = reactiveMapper(props, onData, env)
      })
    })

    return () => {
      if (typeof trackerCleanup === 'function') trackerCleanup()
      return handler.stop()
    }
  }
}
