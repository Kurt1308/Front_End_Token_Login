<template>
  <div style="width:100%; background-color: white;">
    <div class="text-center" style="padding-top: 10%">
      <h1><b>Transações</b></h1>
    </div>
    <div class="mb-2">
      <b-form-checkbox v-model="stickyHeader" inline
        >Reduzir tabela</b-form-checkbox
      >
    </div>
    <b-container id="table-contas">
        <b-table
          bordered
          striped
          hover
          :items="items"
          :fields="fields"
          :sticky-header="stickyHeader"
        >
      <!-- We are using utility class `text-nowrap` to help illustrate horizontal scrolling -->
      <template #head(id)="scope">
        <div class="text-nowrap">Id Transação</div>
      </template>
      <template #head()="scope">
        <div class="text-nowrap">{{ scope.label }}</div>
      </template>
      <template #cell(num_cartao)="data">
          {{ formatNumeroCartao(data.item.num_cartao) }}
        </template>
        <template #cell(valor)="data">
          {{ formatDecimal(data.item.valor) }}
        </template>
        <template #cell(data_transacao)="data">
          {{ data.item.data_transacao | formatDateJustDate }}
        </template>
    </b-table>
    </b-container>
  </div>
</template>

<script>
import { TransacoesService } from "../../services/transacoes/transacoesService.js";
export default {
  data() {
    return {
      stickyHeader: true,
      fields: [
        {
          key: "id_transacao",
          stickyColumn: true,
          isRowHeader: true,
          variant: "primary"
        },
        { key: "num_cartao", label: "Número Cartão", stickyColumn: true },
        { key: "id_aprovacao", label: "Código da Aprovação", stickyColumn: true },
        { key: "data_transacao", label: "Data da Transação", stickyColumn: true },
        { key: "valor", label: "Valor", stickyColumn: true }
      ],
      items: [
      ]
    };
  },
  methods: {
    formatNumeroCartao(numCartao){
      let numeroTratado = numCartao.toString().slice(0,4) + '-' + numCartao.toString().toString().slice(4, 8) + '-' + numCartao.toString().toString().slice(8, 12) + '-' + numCartao.toString().toString().slice(12, 16);
      return numeroTratado;
    },
    formatDecimal(valor){
      let valorTratado = valor.toFixed(2);
      return valorTratado;
    },
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
    this.carregarTransacoes();
  }
};
</script>
