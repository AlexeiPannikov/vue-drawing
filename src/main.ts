import { createApp } from 'vue'
import App from './App.vue'
import {loadFonts} from "./plugins/webfontloader";
import vuetify from "./plugins/vuetify";

const app = createApp(App)
app.use(vuetify)
loadFonts()

app.mount('#app')
