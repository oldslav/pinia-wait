# pinia-wait

Loading state for pinia actions

## Installation

`npm i --save pinia-wait`

## Usage

### Create a pinia instance and add plugin

```
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import WaitPlugin from 'pinia-wait'

const pinia = createPinia()
pinia.use(WaitPlugin)

const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

### Use it in your components

```
<ButtonComponent
  :loading="myStore.wait.someAction"
/>
```

### Change wait object name

>You can use any name you want by passing PiniaPluginContext as first argument and name as second

```
pinia.use(
  (context) => WaitPlugin(context, '$loading')
)
```
