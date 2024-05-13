import { reactive } from '@vue/reactivity'
import { PiniaPluginContext } from 'pinia'

const DEFAULT_NAME: string = 'wait'

function WaitPlugin(
  { options, store }: PiniaPluginContext,
  waitObjectName = DEFAULT_NAME
) {
  const defaultActionsStates: Record<string, boolean> = {}
  Object.keys(options.actions).forEach((key) => {
    defaultActionsStates[key] = false
  })
  store[waitObjectName] = reactive(defaultActionsStates)
  store.$onAction(({ after, name, onError }: any) => {
    store[waitObjectName][name] = true
    after(() => {
      store[waitObjectName][name] = false
    })
    onError(() => {
      store[waitObjectName][name] = false
    })
  }, true)
}

declare module 'pinia' {
  export interface PiniaCustomStateProperties {
    [propName: string]: Record<string, boolean>
  }
}

export default WaitPlugin
