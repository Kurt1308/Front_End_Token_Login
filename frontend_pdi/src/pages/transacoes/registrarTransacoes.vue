<template>
  <div style="width:100%; background-color: white;">
    <div class="text-center" style="padding-top: 10%">
      <h1><b>Registrar Transações</b></h1>
    </div>
    <div>
      <b-button
        style="margin-left:24%; margin-top:5%"
        :class="visible ? null : 'collapsed'"
        :aria-expanded="visible ? 'true' : 'false'"
        aria-controls="collapse-4"
        @click="visible = !visible"
      >
        Efetuar Transação
      </b-button>
      <div style="margin-left:24%; margin-top:2%">
        <container>
          <b-collapse id="collapse-4" v-model="visible" class="mt-2">
            <b-card style="width: 48rem;">
              <div>
                <label><h1><b>Valor da transação: </b></h1></label>
                <b-input-group size="lg" prepend="$">
                  <b-form-input></b-form-input>
                </b-input-group>
                <label><h1><b>Número do Cartão: </b></h1></label>
                <b-input-group size="lg" prepend="Nº">
                  <b-form-input></b-form-input>
                </b-input-group>
              </div>
            </b-card>
          </b-collapse>
        </container>
      </div>
    </div>
  </div>
</template>

<script>
import { TransacoesService } from "../../services/transacoes/transacoesService.js";
export default {
  data() {
    return {
      visible: false
    };
  },
  methods: {
    carregarTransacoes() {
      TransacoesService.getTransacoes()
        .then(response => {
          if (response.success) {
            this.items = response.data.transacoes;
          } else {
            this.$toast.warning(
              response.data.mensagem || response.statusMessage,
              {
                position: "top-center",
                timeout: 5000,
                hideProgressBar: false
              }
            );
          }
        })
        .catch(err => {
          this.$toast.warning(err.message || err.statusMessage, {
            position: "top-center",
            timeout: 5000,
            hideProgressBar: false
          });
        });
    }
  },
  created() {}
};
</script>
