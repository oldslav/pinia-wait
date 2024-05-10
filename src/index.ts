import { reactive } from '@vue/reactivity'
import { PiniaPluginContext } from 'pinia'

function WaitPlugin({ options, store }: PiniaPluginContext) {
  const defaultActionsStates: Record<string, boolean> = {}
  Object.keys(options.actions).forEach((key) => {
    defaultActionsStates[key] = false
  })
  store.wait = reactive(defaultActionsStates)
  store.$onAction(({ after, name, onError }: any) => {
    store.wait[name] = true
    after(() => {
      store.wait[name] = false
    })
    onError(() => {
      store.wait[name] = false
    })
  }, true)
}

declare module 'pinia' {
  export interface PiniaCustomStateProperties {
    wait: Record<string, boolean>
  }
}

export default WaitPlugin
