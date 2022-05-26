import { createApp } from 'vue'
import App from './App.vue'
import {loadFonts} from "./plugins/webfontloader";
import vuetify from "./plugins/vuetify";

const app = createApp(App)
loadFonts()

app.use(vuetify)
app.mount('#app')
