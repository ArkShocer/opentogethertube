import "./installCompositionApi.js";
import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import { setStoreInstance } from "@/util/vuex-workaround";
setStoreInstance(store);

import VueGtag from "vue-gtag";
Vue.use(
	VueGtag,
	{
		config: { id: "UA-148983263-2" },
	},
	router
);

import vuetify from "@/plugins/vuetify";

import Fragment from "vue-fragment";
Vue.use(Fragment.Plugin);

import { i18n } from "./i18n";

Vue.config.productionTip = false;

window.vm = new Vue({
	vuetify,
	store,
	router,
	i18n,
	render: h => h(App),
}).$mount("#app");
