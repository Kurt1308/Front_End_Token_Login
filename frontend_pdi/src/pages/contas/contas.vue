<template>
  <div style="width:100%;">
    <div class="text-center" style="padding-top: 10%">
      <h1><b>Contas</b></h1>
    </div>
    <b-container id="table-contas">
        <b-table
          bordered
          striped
          hover
          :items="items"
          :fields="fields"
        ></b-table>
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
