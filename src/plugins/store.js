import Vue from "vue";
import Vuex from "vuex";

import task from "@/store/task"
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        task
    },
});
window.__testStore = store;
export default store;
