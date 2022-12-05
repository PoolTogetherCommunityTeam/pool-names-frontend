import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"
import Toast, { POSITION, TYPE } from "vue-toastification";
import "vue-toastification/dist/index.css";
import './index.css'
import { VueDapp } from 'vue-dapp'

const app = createApp(App);

const options = {
  timeout: 5000,
  hideProgressBar: true,
  closeButton: "button",
  position:POSITION.TOP_LEFT,
  toastClassName: "punk-toast-class",
  closeOnClick: false,

  toastDefaults: {
    // ToastOptions object for each type of toast
    [TYPE.INFO]: {
        timeout: false,
        icon: false
    }    
  }
}

app.use(router)
app.use(store)

app.use(VueDapp, {
  infuraId: "not-needed-but-should-not-be-empty-either", // non-empty string for WalletConnect
})

app.use(Toast, options);

app.mount('#app')
