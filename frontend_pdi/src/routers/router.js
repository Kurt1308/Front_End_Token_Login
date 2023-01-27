import Login from "../pages/login/login.vue";
import ForgotPassword from '../pages/login/ForgotPassword.vue';
import Menu from "../pages/menu/menu.vue";
import Inicio from "../pages/inicio/inicio.vue";
import Contas from "../pages/contas/contas.vue";
import Cartoes from "../pages/cartoes/cartoes.vue";
import Transacoes from "../pages/transacoes/transacoes.vue";

import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

let router = new Router({
  mode: "history",
  // Fazem referência às 'pages'
  routes: [
    {path: "/login",name: "Login",component: Login},
    {path: '/forgotpassword', name: 'ForgotPassword', component: ForgotPassword},
    {path: "/menu",name: "Menu",component: Menu,
    children: [
        { path: "/inicio", component: Inicio, name: "inicio"},
        { path: "/contas", component: Contas, name: "contas"},
        { path: "/cartoes", component: Cartoes, name: "cartoes"},
        { path: "/transacoes", component: Transacoes, name: "transacoes"},
      ]
    }
  ]
});

export default router;

router.beforeEach((to, from, next) => {
  const publicPages = ["/login","/forgotpassword"];
  const authRequired = !publicPages.includes(to.path);
  const hasToken = sessionStorage.getItem("_LOCAL_SESSION_")
    ? JSON.parse(sessionStorage.getItem("_LOCAL_SESSION_"))["token"]
    : null;
  if (authRequired && !hasToken) {
    next("/login");
    this.$toast.warning("Seu acesso expirou. Faça login novamente.", {
      position: "top-center",
      timeout: 5000,
      hideProgressBar: false,
      icon: faInfoCircle
    });
  } else if (!authRequired && hasToken && to.path === "/login"){
    next("/inicio");
  }
  next();
});
