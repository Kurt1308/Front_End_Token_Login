<template>
  <div style="width:100%; background-color: white;">
    <div class="text-center" style="padding-top: 10%">
      <h1><b>Contas</b></h1>
    </div>
    <b-container id="table-contas">
      <b-table bordered striped hover :items="items" :fields="fields">
        <template #cell(num_conta)="data">
          {{ formatNumeroConta(data.item.num_conta) }}
        </template>
        <template #cell(situacao)="data">
          {{ formatSituacao(data.item.situacao) }}
        </template>
        <template #cell(agencia_id_agencia)="data">
          {{ formatAgencia(data.item.agencia_id_agencia) }}
        </template>
        <template #cell(tipo_conta)="data">
          {{ formatTipoConta(data.item.tipo_conta) }}
        </template>
        </b-table
      >
    </b-container>
  </div>
</template>

<script>
import { ContasService } from "../../services/contas/contasService.js";
export default {
  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [
        {
          key: "num_conta",
          label: "Número da Conta",
          sortable: true
        },
        {
          key: "nome_titular",
          label: "Nome Titular",
          sortable: true
        },
        {
          key: "situacao",
          label: "Situação",
          sortable: true
        },
        {
          key: "agencia_id_agencia",
          label: "Agência",
          sortable: true
        },
        {
          key: "tipo_conta",
          label: "Tipo de Conta",
          sortable: true
        }
      ],
      items: []
    };
  },
  methods: {
    formatNumeroConta(num_conta) {
      let numeroTratado = num_conta.toString().slice(0,3) + '-' + num_conta.toString().slice(3, 6);
      return numeroTratado;
    },
    formatAgencia(agencia){
      let agenciaTratada = "";
      if(agencia == 1){
        agenciaTratada = "Belo Horizonte"
      } else{
        agenciaTratada = "São Paulo"
      }
      return agenciaTratada;
    },
    formatSituacao(situacao){
      let situacaoTratada = "";
      if(situacao == 1){
        situacaoTratada = "Ativa"
      } else {
        situacaoTratada = "Inativa";
      }
      return situacaoTratada;
    },
    formatTipoConta(tipoConta){
      let tipoContaTratado = "";
      if(tipoConta == "F"){
        tipoContaTratado = "Pessoa Física";
      } else {
        tipoContaTratado = "Pessoa Jurídica";
      }
        return tipoContaTratado;
    },
    carregarContas() {
      ContasService.getContas()
        .then(response => {
          if (response.success) {
            this.items = response.data.contas;
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
  created() {
    this.carregarContas();
  }
};
</script>
