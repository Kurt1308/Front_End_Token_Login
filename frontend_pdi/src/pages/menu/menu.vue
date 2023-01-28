<template>
  <div>
    <div :class="'menu'">
      <div class="menu wrapper">
        <nav id="sidebar">
          <div class="sidebar-header">
            <span style="margin-bottom: 10px">
              <img width="165" style="width: 95%" src="../../assets/logo.jpg" />
            </span>
            <br />
          </div>

          <ul id="menu-lateral-grande" class="list-unstyled components">
            <li id="menu-home-inicio">
              <router-link :to="{ name: 'inicio' }" class="item-menu">
                <font-awesome-icon id="ico-home" icon="home" />
                <span id="home-titulo" style="margin-left: 5px"> HOME </span>
              </router-link>
            </li>
            <li
              id="menu-Exemplo"
              v-if="this.existeRoleCooperativa()"
              :class="1"
            >
              <a
                class="item-menu"
                @click="exibeSubExmplo = !exibeSubExmplo"
              >
                <span id="coop-titulo" style="margin-left: 5px"> CONTAS </span>
              </a>
              <router-link
                id="sub-menu-regras"
                v-if="
                  exibeSubExmplo &&
                  this.existeRoleCooperativaRegrasReceita()
                "
                :to="'/contas'"
                class="item-menu"
              >
                <span id="regra-receita-titulo" style="margin-left: 15px">
                  Contas Cadastradas
                </span>
              </router-link>
            </li>
            <li
              id="menu-Exemplo2"
              v-if="this.existeRoleCooperativa()"
              :class="1"
            >
              <a
                class="item-menu"
                @click="exibeSubExemplo2 = !exibeSubExemplo2"
              >
                <span id="coop-titulo" style="margin-left: 5px"> CARTÕES</span>
              </a>
              <router-link
                id="sub-menu-regras"
                v-if="
                  exibeSubExemplo2 &&
                  this.existeRoleCooperativaRegrasReceita()
                "
                :to="'/cartoes'"
                class="item-menu"
              >
                <span id="regra-receita-titulo" style="margin-left: 15px">
                  Cartões Cadastrados
                </span>
              </router-link>
            </li>
            <li
              id="menu-Exemplo3"
              v-if="this.existeRoleCooperativa()"
              :class="1"
            >
              <a
                class="item-menu"
                @click="exibeSubExemplo3 = !exibeSubExemplo3"
              >
                <span id="coop-titulo" style="margin-left: 5px"> TRANSAÇÕES</span>
              </a>
              <router-link
                id="sub-menu-regras"
                v-if="
                  exibeSubExemplo3 &&
                  this.existeRoleCooperativaRegrasReceita()
                "
                :to="'/transacoes'"
                class="item-menu"
              >
                <span id="regra-receita-titulo" style="margin-left: 15px">
                  Transações
                </span>
              </router-link>
            </li>
          </ul>
        </nav>

        <div id="content" class="container-fluid" style="padding: 0px">
          <nav
            id="header"
            class="navbar navbar-expand-lg navbar-light"
            :style="[
              $router.name == 'inicio'
                ? 'background: #fffff'
                : 'background: #f3f3f3',
            ]"
          >
            <div class="container-fluid">
              <div class="collapse navbar-collapse">
                <div class="row">
                  <div class="col-md-12 text-right">
                    <a
                      @click="logout()"
                      style="
                        color: #888888;
                        font-weight: bold;
                        margin-left: 5px;
                      "
                    >
                      Logout
                      <font-awesome-icon icon="sign-out-alt" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <router-view></router-view>
          <div class="footer fixed">
            <div class="footer-text">
              <strong></strong>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import GetAllRoles from "../../services/permissao/getRoleJWT.js";

export default {
  data() {
    return {
      usuario: null,
      exibeSubExmplo: false,
      exibeSubExemplo2: false,
      exibeSubExemplo3: false,
      roles: [],
    };
  },
  // created() {
  //   this.carregarUsuarioSessao();
  //   this.roles = GetAllRoles();
  // },
  methods: {
    logout() {
      $sessao._removeSession();
      const router = this.$router;
      router.push("/login");
      this.$toast.success("Logout efetuado com sucesso.", {
        position: "top-center",
        timeout: 5000,
        hideProgressBar: false,
        icon: faInfoCircle,
      });
    },
    // carregarUsuarioSessao() {
    //   this.usuario = $sessao._getSession();
    // },
    navegarPara(pathTela) {
      const router = this.$router;
      router.to(pathTela);
    },
    existeRoleFiltro(nomeRole) {
      return (
        this.roles.filter((item) => {
          return item.includes(nomeRole);
        }).length > 0
      );
    },
    existeRoleCooperativa() {
      return true; // TODO: RETIRAR QDO ROLES OK
      return this.existeRoleFiltro("Cooperativa");
    },
    existeRoleCooperativaRegrasReceita() {
      return true; // TODO: RETIRAR QDO ROLES OK
      return this.existeRoleFiltro("RegrasReceita");
    },
    existeRoleCooperativaAgendaFinanceira() {
      return true; // TODO: RETIRAR QDO ROLES OK
      return this.existeRoleFiltro("AgendaFinanceira");
    },
    existeRoleMaster() {
      return (
        this.existeRoleFiltro("Master") || this.existeRoleFiltro("Maestro")
      );
    },
    existeRoleMasterCredito() {
      return this.existeRoleFiltro("MasterCredito");
    },
    existeRoleMasterDebito() {
      return this.existeRoleFiltro("MasterDebito");
    },
    existeRoleMaestro() {
      return this.existeRoleFiltro("Maestro");
    },
    existeRoleVisa() {
      return this.existeRoleFiltro("Visa");
    },
    existeRoleVisaCredito() {
      return this.existeRoleFiltro("VisaCredito");
    },
    existeRoleVisaDebito() {
      return this.existeRoleFiltro("VisaDebito");
    },
    existeRoleTecban() {
      return this.existeRoleFiltro("Tecban");
    },
  },
};
</script>
<style lang="scss">
@import "../../assets/styles/_variables.scss";
@import "../../assets/styles/_bootstrap.scss";
@import "../../assets/styles/style.scss";

body {
  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  background-color: #000000;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;
}

.menu {
  a,
  a:hover,
  a:focus {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;
  }

  .navbar {
    padding: 15px 10px;
    border: none;
    min-height: 60px;
    border-radius: 0;
    box-shadow: 1px 1px 3px rgb(251, 248, 248);
  }

  .navbar-btn {
    box-shadow: none;
    outline: none !important;
    border: none;
  }

  .line {
    width: 100%;
    height: 1px;
    border-bottom: 1px dashed #ddd;
    margin: 40px 0;
  }

  .wrapper {
    display: flex;
    align-items: stretch;
  }

  #sidebar {
    min-width: 220px;
    max-width: 220px;
    background: #080808;
    color: #fdfeff;
    font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.3s;
  }

  #sidebar-mini {
    min-width: 66px;
    max-width: 66px;
    background: #0c0c0c;
    color: #a7b1c2;
    font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.3s;
  }

  .item-menu {
    padding: 14px 20px 14px 25px;
  }

  #sidebar.active {
    margin-left: -250px;
  }

  #sidebar-mini.active {
    margin-right: -250px;
  }

  #sidebar .sidebar-header {
    padding: 33px 25px;
    background-color: #080808;
  }

  #sidebar-mini .sidebar-header-reduzido {
    height: 72px;
    background-color: #09090a;
    background-image: url(../../assets/images/header-profile.png);
  }

  #sidebar .sidebar-header-reduzido {
    height: 72px;
    background-color: #010202;
    background-image: url(../../assets/images/header-profile.png);
  }

  #sidebar ul.components {
    padding: 0px 0;
  }

  #sidebar ul p {
    color: #080808;
    padding: 0px 22px;
  }

  #sidebar ul li a {
    padding: 14px 20px 14px 25px;
    font-size: 13px;
    display: block;
    border-radius: 2px;
  }

  #sidebar-mini ul li a {
    padding: 14px 20px 14px 25px;
    font-size: 1.1em;
    display: block;
    border-radius: 2px;
  }

  .router-link-active {
    border-radius: 2px;
    color: #fff !important;
    border-left: 4px solid $primary;
    background: #0a0a0a;
  }

  #sidebar ul li a:hover {
    color: #fff;
    background: rgb(6, 6, 6);
  }

  #sidebar-mini ul li a:hover {
    color: #fff;
    background: rgb(8, 8, 8);
  }

  #sidebar ul li.active > a,
  a[aria-expanded="true"] {
    background: #050606;
  }

  #sidebar-mini ul.active li > a,
  a[aria-expanded="true"] {
    background: #070707;
  }

  #sidebar-mini li a {
    padding: 7px 10px 7px 10px;
    padding-left: 52px;
  }

  #sidebar-mini ul.active {
    display: block;
    border-radius: 0 2px 2px 0;
    min-width: 140px;
    height: auto;
    list-style-type: none;
    z-index: 1000;
  }

  #sidebar-mini .nav-second {
    position: absolute;
    left: 60px;
    top: 0;
    background-color: #010202;
    padding: 10px 10px 10px 10px;
    font-size: 12px;
  }

  #sidebar-mini .nav > li {
    position: relative;
  }

  a[data-toggle="collapse"] {
    position: relative;
  }

  a[aria-expanded="false"]::before,
  a[aria-expanded="true"]::before {
    content: "\e259";
    display: block;
    position: absolute;
    right: 20px;
    // font-family: 'Glyphicons Halflings';
    font-size: 0.6em;
  }
  a[aria-expanded="true"]::before {
    content: "\e260";
  }

  ul ul a {
    font-size: 0.9em !important;
    padding-left: 30px !important;
    background: #f4f5f7;
    border-radius: 4px;
  }

  ul.CTAs {
    padding: 20px;
  }

  ul.CTAs a {
    text-align: center;
    font-size: 0.9em !important;
    display: block;
    border-radius: 5px;
    margin-bottom: 5px;
  }

  a.download {
    background: #fff;
    color: #020202;
  }

  a.article,
  a.article:hover {
    background: rgba(9, 30, 66, 0.04) !important;
    color: #fff !important;
  }

  #content {
    padding: 20px;
    min-height: 100vh;
    transition: all 0.3s;
  }

  @media (max-width: 768px) {
    #sidebar {
      margin-left: 0px;
      z-index: 10;
      width: 100%;
      height: 100%;
      position: fixed;
    }
    #sidebar.active {
      margin-left: 0;
    }
    #sidebarCollapse span {
      display: none;
    }
  }
}

.topbar-branco {
  background: #fff;
}
.topbar-cinza {
  background: #f3f3f3;
}

/* FOOTER */
.footer {
  background: none repeat scroll 0 0 white;
  border-top: 1px solid #e7eaec;
  bottom: 0;
  left: 0;
  padding: 10px 20px;
  position: relative;
  right: 0;
}

.footer.fixed_full {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 10px 20px;
  background: white;
  border-top: 1px solid #e7eaec;
}

.footer.fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 10px 20px;
  background: white;
  border-top: 1px solid #e7eaec;
  margin-left: 220px;
}

.footer-text {
  strong {
    float: left;
  }
  span {
    float: right;
  }
}
</style>
