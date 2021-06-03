import Vue from "vue";
import Vuetify from "vuetify";
import pt from "vuetify/es5/locale/pt";

import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        locales: {pt},
        current: "en",
    },
    theme: {
        themes: {
            light: {
                'light-orange': "#F5A62E",
                'z-light-green': "#239465",
                'z-light-blue':"#51BBE8"
            }
        }
    },
});
