import { createApp } from 'vue'
import MyApp from './App.vue'
import router from './router';
import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

import { App, URLOpenListenerEvent } from '@capacitor/app';

import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);

const app = createApp(MyApp)
  .use(IonicVue)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});

App.addListener('appUrlOpen', function (event: URLOpenListenerEvent) {
  // Example url: https://beerswift.app/tabs/tabs2
  // slug = /tabs/tabs2
  const slug = event.url.split('.app').pop();

  // We only push to the route if there is a slug present
  if (slug) {
    router.push({
      path: slug,
    });
  }
});

import * as LiveUpdates from '@capacitor/live-updates';

// Register event to fire each time user resumes the app
App.addListener('resume', async () => {
  if (localStorage.shouldReloadApp === 'true') {
    await LiveUpdates.reload();
  }
  else {
    const result = await LiveUpdates.sync();
    localStorage.shouldReloadApp = result.activeApplicationPathChanged;
  }
});

// First sync on app load
const result = await LiveUpdates.sync();
localStorage.shouldReloadApp = result.activeApplicationPathChanged;

