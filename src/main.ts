import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDiscord } from '@fortawesome/free-brands-svg-icons/faDiscord';
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube';
import { faSpotify } from '@fortawesome/free-brands-svg-icons/faSpotify';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';

library.add(faDiscord, faYoutube, faSpotify);

createApp(App)
  .use(store)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
