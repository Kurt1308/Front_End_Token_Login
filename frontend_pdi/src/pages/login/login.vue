<template>
  <div>
    <div class="middle-box text-center loginscreen animated fadeInDown">
      <div>
        <div style="vertical-align: central; padding-top: 150px">
          <img
            width="196"
            src="../../assets/logo.jpg"
          />
        </div>
        <form class="m-t" role="form" action="" method="post">
          <div class="form-group">
            <label class="login">E-mail</label>
            <input
              type="text"
              class="form-control single-line"
              name="email"
              ref="email"
              placeholder="Digite seu e-mail"
              required=""
              v-model.trim="email"
            />
          </div>
          <div class="form-group">
            <label class="login">Senha</label>
            <input
              type="password"
              class="form-control single-line"
              name="senha"
              ref="senha"
              placeholder="Digite sua senha"
              required=""
              v-model="senha"
            />
          </div>
        </form>
        <button
          @click="login()"
          id="BtnEntrar"
          class="btn btn-danger block full-width m-b"
        >
          Entrar
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { LoginService } from "../../services/login/LoginService";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "../../services/base/authService";
import CryptoJS from "crypto-js";

export default {
  name: "login",
  data() {
    return {
      email: "",
      senha: ""
    };
  },
  methods: {
    login() {
      if (!this.email) {
        this.$toast.warning("Preencha corretamente o e-mail.", {
          position: "top-center",
          timeout: 5000,
          hideProgressBar: false,
          icon: faInfoCircle
        });
        this.$refs.email.focus();
        return;
      }
      if (!this.senha) {
        this.$toast.warning("Preencha corretamente a senha.", {
          position: "top-center",
          timeout: 5000,
          hideProgressBar: false,
          icon: faInfoCircle
        });
        this.$refs.senha.focus();
        return;
      }
      let senha = CryptoJS.HmacMD5(
        this.senha,
        $config.chaveCriptografia
      ).toString();
      let data = { username: this.email, password: this.senha };
      LoginService.loginAutenticacao(data).then(response => {
        if (response.success) {
          $sessao._setSessionFromToken(response.data.token.substring(7));
          AuthService.setBearer(response.data.token);
          const router = this.$router;
          router.push("/inicio");
        } else {
          $sessao._removeSession();
          AuthService.setBearer("");
          this.$toast.warning(response.data.mensagem || response.statusMessage, {
            position: "top-center",
            timeout: 5000,
            hideProgressBar: false,
            icon: faInfoCircle
          });
        }
      }).catch(err => {
        $sessao._removeSession();
        AuthService.setBearer("");
        this.$toast.warning(err.message || err.statusMessage, {
          position: "top-center",
          timeout: 5000,
          hideProgressBar: false,
          icon: faInfoCircle
        });
      });
    },
  }
};
</script>
<style lang="scss">
@import "../../assets/styles/_variables.scss";
@import "../../assets/styles/_bootstrap.scss";
@import "../../assets/styles/style.scss";

a {
  color: #080d12;
}
a:hover {
  color: #0e0e0f;
}
</style>
