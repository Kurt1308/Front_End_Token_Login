<template>
  <div>
    <div class="passwordBox animated fadeInDown">
      <div>
        <b-form class="m-t" ref="form1" @submit.prevent="enviar">
          <h2>Alterar ou Recuperar a minha senha</h2>
          <div v-if="exibeValidaNomeEmail">
            <p>
              Digite o seu Nome e E-mail para alterar ou recuperar a sua senha.
            </p>
            <div class="form-group">
              <input
                type="text"
                class="form-control single-line"
                name="nome"
                ref="nome"
                placeholder="Digite seu Nome"
                required
                v-model="nome"
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control single-line"
                name="email"
                ref="email"
                placeholder="Digite seu e-mail"
                required
                v-model.trim="email"
              />
            </div>
          </div>
          <div v-if="exibeValidaCPF">
            <p>
              Digite o seu CPF para alterar ou recuperar a sua senha.
            </p>
            <div class="form-group">
              <b-form-input id="form-cpf"
                required
                v-model="cpf"
                v-mask="'###.###.###-##'"
                maxlength="14"
                :state="ValidaFormCpf(cpf)"
                >
              </b-form-input>
            </div>
          </div>
          <div v-if="exibeNovaSenha">
            <p>
              Digite a sua Nova senha.
            </p>
            <div class="form-group">
              <input
                type="password"
                class="form-control single-line"
                name="senha"
                ref="senha"
                placeholder="Nova Senha"
                required
                v-model="senha"
              />
            </div>
          </div>
          <b-button
            type="submit"
            id="BtnEnviar"
            class="btn btn-primary block full-width m-b"
            variant="primary"
          >
            Enviar
          </b-button>
          <b-button
            @click="voltar()"
            id="BtnVoltar"
            class="btn btn-secundary block full-width m-b"
            variant="secondary"
          >
            Voltar para o Login
          </b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>
<script>
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { ForgotPasswordService } from "../../services/login/ForgotPasswordService";
import validarCpf from "../../utils/validador-cpf"
import CryptoJS from "crypto-js";

export default {
  name: "ForgotPassword",
  data() {
    return {
      email: "",
      nome: "",
      cpf: "",
      senha: "",
      usuarioDTO: [],
      validouNomeEmail: false,
      exibeValidaNomeEmail: true,
      validouCPF: false,
      exibeValidaCPF: false,
      exibeNovaSenha: false
    };
  },
  methods: {
    voltar() {
      this.$router.push("/login");
    },
    ValidaFormCpf(cpf){
      let valido = null; // valido pode assumir null, true ou false
      if(cpf != null && cpf.length == 14) {
        valido = validarCpf(cpf);
      }
      return valido;
    }, 
    enviar() {
      if (
        this.exibeValidaNomeEmail == true &&
        this.validouNomeEmail == false &&
        this.validouCPF == false
      ) {
        let data = {
          id: null,
          usuario: this.nome,
          email: this.email,
          situacao: null,
          administrador: null,
          grupo: null,
          cpf: null,
          senha: null
        };
        ForgotPasswordService.getUsuariosByFiltro(data).then(response => {
          if (response.success) {
            this.usuarioDTO = response.data.usuarios;
            this.validouNomeEmail = true;
            this.exibeValidaNomeEmail = false;
            this.exibeValidaCPF = true;
            this.validouCPF = false;
            this.exibeNovaSenha = false;
          } else {
            this.$toast.warning(response.data.mensagem || response.statusMessage, {
              position: "top-center",
              timeout: 5000,
              hideProgressBar: false,
              icon: faInfoCircle,
            });
            this.usuarioDTO = [];
            this.email = "";
            this.nome = "";
            this.senha = "";
            this.cpf = "";
            this.validouNomeEmail = false;
            this.exibeValidaNomeEmail = true;
            this.exibeValidaCPF = false;
            this.validouCPF = false;
            this.exibeNovaSenha = false;
          }
        }).catch(err => {
          this.$toast.warning(err.message || err.statusMessage, {
            position: "top-center",
            timeout: 5000,
            hideProgressBar: false,
            icon: faInfoCircle
          });
        });
      } else if (
        this.validouNomeEmail == true &&
        this.exibeValidaCPF == true &&
        this.validouCPF == false &&
        this.usuarioDTO.length > 0
      ) {
        if (this.usuarioDTO[0].cpf == this.cpf) {
          this.validouCPF = true;
          this.exibeValidaCPF = false;
          this.exibeNovaSenha = true;
        } else {
          this.$toast.warning(
              "O CPF INFORMADO NÃO FOI LOCALIZADO",
              {
                position: "top-center",
                timeout: 5000,
                hideProgressBar: false,
                icon: faInfoCircle
              }
            );
          this.cpf = "";
          this.validouCPF = false;
          this.exibeValidaCPF = true;
          this.validouNomeEmail = true;
          this.exibeNovaSenha = false;
        }
      } else if (
        this.exibeNovaSenha &&
        this.usuarioDTO.length > 0 &&
        this.senha != ""
      ) {
        let data = {};
        data.id = this.usuarioDTO[0].id;
        data.usuario = this.usuarioDTO[0].usuario;
        data.email = this.usuarioDTO[0].email;
        data.situacao = this.usuarioDTO[0].situacao;
        data.administrador = this.usuarioDTO[0].administrador;
        data.grupo = this.usuarioDTO[0].grupo;
        data.cpf = this.usuarioDTO[0].cpf;
        data.senha = CryptoJS.HmacMD5(
          this.senha,
          window.$config.chaveCriptografia
        ).toString();

        ForgotPasswordService.putUsuario(data).then(response => {
          if (response.success) {
            this.$toast.warning(response.data.mensagem, {
              position: "top-center",
              timeout: 5000,
              hideProgressBar: false,
              icon: faInfoCircle
            });
            this.voltar();
          } else {
            this.$toast.warning(response.data.mensagem || response.statusMessage, {
              position: "top-center",
              timeout: 5000,
              hideProgressBar: false,
              icon: faInfoCircle,
            });
            this.usuarioDTO = [];
            this.email = "";
            this.nome = "";
            this.validouNomeEmail = false;
            this.exibeValidaNomeEmail = true;
            this.exibeValidaCPF = false;
            this.validouCPF = false;
            this.exibeNovaSenha = false;
          }
        }).catch(err => {
          this.$toast.warning(err.message || err.statusMessage, {
            position: "top-center",
            timeout: 5000,
            hideProgressBar: false,
            icon: faInfoCircle
          });
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/_variables.scss";
@import "../../assets/styles/_bootstrap.scss";
@import "../../assets/styles/style.scss";
a {
  color: #337ab7;
}
a:hover {
  color: #23527c;
}
</style>