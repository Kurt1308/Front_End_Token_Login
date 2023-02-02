<template>
    <div style="width:100%; background-color: white;">
      <div class="text-center" style="padding-top: 10%">
        <h1><b>Registrar Transações</b></h1>
      </div>
      
    </div>
  </template>
  
  <script>
  import { TransacoesService } from "../../services/transacoes/transacoesService.js";
  export default {
    data() {
      return {
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
    created() {
    }
  };
  </script>
  