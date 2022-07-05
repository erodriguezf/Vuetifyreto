import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import axios from 'axios';
import VueAxios from 'vue-axios'

const api = axios.create({ baseURL: "https://localhost:7047/api" });

Vue.use(VueAxios,axios);

Vue.use(Vuetify);

export default new Vuetify({
  
});

export {api};