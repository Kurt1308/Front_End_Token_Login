<template>
  <div style="width:100%; background-color: white;">
    <div class="text-center" style="padding-top: 10%">
      <h1><b>Registrar Transação</b></h1>
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
          <b-collapse id="collapse-4" v-model="visible" class="mt-2">
            <b-card style="width: 48rem;">
              <div>
                <label
                  ><h1><b>Valor da transação: </b></h1></label
                >
                <b-input-group size="lg" prepend="R$">
                  <b-form-input v-model="valor"></b-form-input>
                </b-input-group>
                <label
                  ><h1><b>Número do Cartão: </b></h1></label
                >
                <b-input-group
                  v-mask="'####-####-####-####'"
                  size="lg"
                  prepend="Nº"
                >
                  <b-form-input v-model="numCartao"></b-form-input>
                </b-input-group>
                <b-button style="margin-top:2%" @click="inserirTransacoes()">Enviar</b-button>
              </div>
            </b-card>
          </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import { TransacoesService } from "../../services/transacoes/transacoesService.js";
export default {
  data() {
    return {
      visible: false,
      valor: null,
      numCartao: null
    };
  },
  methods: {
    formataNumCartao(value){
      var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []

    for (var i=0, len=match.length; i<len; i+=4) {
        parts.push(match.substring(i, i+4))
    }

    if (parts.length) {
        return parts.join('')
    } else {
        return value
    }
    },
    inserirTransacoes() {
      let item = { valor: this.valor, num_cartao: this.formataNumCartao(this.numCartao), id_aprovacao: "3fa85f64-5717-4562-b3fc-2c963f66afa6" };
      TransacoesService.addTransacao(item)
        .then(response => {
          if (response.success) {
            this.items = response.data.transacoes;
            this.$toast.warning(
              response.data.mensagem || response.statusMessage,
              {
                position: "top-center",
                timeout: 5000,
                hideProgressBar: false
              }
            );
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
