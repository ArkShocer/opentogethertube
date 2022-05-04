import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
Vue.use(Vuetify);

const plugin = new Vuetify({
	icons: {
		iconfont: "fa",
	},
	theme: {
		dark: true,
		themes: {
			dark: {
				primary: "#ffb300", // orange
				secondary: "#42A5F5", // blue
			},
			light: {
				// Test colours
				primary: "#00eeff", // Turquoise
				secondary: "#ff00f7", // pink
			},
		},
	},
});
export default plugin;
