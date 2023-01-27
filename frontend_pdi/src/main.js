import Vue from "vue";
import router from "./routers/router";
import App from "./App";
import $sessao from "./config/sessao";
import $config from "./config/config";
import moment from "moment";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSpinner,
  faFilter,
  faHome,
  faBuilding,
  faSquarePollHorizontal,
  faLink,
  faLinkSlash,
  faPaperclip,
  faCaretLeft,
  faCaretRight,
  faList,
  faUserCircle,
  faClipboardList,
  faBars,
  faArrowUp,
  faArrowDown,
  faSignOutAlt,
  faArrowLeft,
  faCreditCard,
  faInfoCircle,
  faFile,
  faFileClipboard,
  faMoneyBillAlt,
  faMoneyBill,
  faQuestionCircle,
  faEdit,
  faAlignJustify,
  faChevronUp,
  faLandmark,
  faCalendar,
  faBook,
  faPen,
  faCheck,
  faXmark,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { dom } from "@fortawesome/fontawesome-svg-core";
import vuetify from "./plugins/vuetify";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueTheMask, { TheMask } from "vue-the-mask";
import VueExcelXlsx from "vue-excel-xlsx";
import JsonCSV from "vue-json-csv";
import VueMask from "v-mask";
import Toast from "vue-toastification";
import numeral from "numeral";
import VueHtml2Canvas from "vue-html2canvas";
import _ from "lodash";
import { faCcVisa, faCcMastercard } from "@fortawesome/free-brands-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-toastification/dist/index.css";

numeral.register("locale", "br", {
  delimiters: {
    thousands: ".",
    decimal: ","
  },
  abbreviations: {
    thousand: "k",
    million: "m",
    billion: "b",
    trillion: "t"
  },
  ordinal: function(number) {
    return number === 1 ? "er" : "ème";
  },
  currency: {
    symbol: "R$"
  }
});

numeral.locale("br");

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueMask);
Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
  timeout: 2000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  rtl: false
});
Vue.use($sessao);
Vue.use(VueTheMask);
Vue.use(VueExcelXlsx);
Vue.use(numeral);
Vue.use(VueHtml2Canvas);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("downloadCsv", JsonCSV);

library.add(
  faSpinner,
  faFilter,
  faHome,
  faBuilding,
  faSquarePollHorizontal,
  faLink,
  faLinkSlash,
  faPaperclip,
  faList,
  faUserCircle,
  faClipboardList,
  faCaretLeft,
  faCaretRight,
  faBars,
  faArrowUp,
  faArrowDown,
  faSignOutAlt,
  faArrowLeft,
  faCcVisa,
  faCreditCard,
  faInfoCircle,
  faFile,
  faFileClipboard,
  faMoneyBillAlt,
  faMoneyBill,
  faQuestionCircle,
  faEdit,
  faCcMastercard,
  faAlignJustify,
  faChevronUp,
  faLandmark,
  faCalendar,
  faBook,
  faPen,
  faCheck,
  faXmark,
  faPlusCircle,
);

window.$sessao = $sessao;
window.$config = $config;
window.moment = moment;
window._ = _;

Vue.filter("formatDateDMYHms", value => {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY HH:mm:ss");
  }
});

Vue.filter("formatDate", value => {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY HH:mm");
  }
});

Vue.filter("formatDateJustDate", value => {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
});
Vue.filter("formatCardNumber", value => {
  if (value) {
    return (
      value.trim().substring(0, 4) + " **** **** " + value.trim().slice(-4)
    );
  }
});
Vue.filter("upper", value => {
  if (value) {
    return value.toUpperCase();
  }
});

Vue.filter("formatNumber", function(value) {
  return numeral(value).format("0,0.00"); // displaying other groupings/separators is possible, look at the docs
});

Vue.filter("trimWords", function(value) {
  return (
    value
      .split(" ")
      .splice(0, 20)
      .join(" ") + "..."
  );
});

router.beforeEach(function(to, from, next) {
  if (to.path.indexOf("/login") === -1) {
    if ($sessao._getSession() == null) {
      next();
    } else {
      next();
    }
  } else {
    next();
  }
});

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Progress Bar
    NProgress.start();
  }
  next();
});

router.afterEach((to, from) => {
  // Progress Bar
  NProgress.done();
});

dom.watch();

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
