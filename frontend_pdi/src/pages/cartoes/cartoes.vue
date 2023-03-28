<template>
  <div style="width:100%; background-color: white;">
    <div class="text-center" style="padding-top: 10%">
      <h1><b>Cartões</b></h1>
    </div>
    <b-container id="table-contas">
      <b-table bordered striped hover :items="items" :fields="fields">
        <template #cell(show_details)="row">
          <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
          <b-form-checkbox
            v-model="row.detailsShowing"
            @change="row.toggleDetails"
          >
            Mostrar detalhes deste cartão
          </b-form-checkbox>
        </template>
        <template #cell(num_cartao)="data">
          {{ formatNumeroCartao(data.item.num_cartao) }}
        </template>

        <template #row-details="row">
          <div v-if="acessoLiberado == false">
            <b-row>
              <b-col sm="2" class="text-sm-right"
                ><label
                  ><b><h4>Digite sua senha:</h4></b></label
                ></b-col
              >
              <b-col sm="2" class="text-sm-right"
                ><b-form-input v-model="senhaInterna"></b-form-input></b-col
              ><b-col sm="0.5" class="text-sm-right"
                ><b-button
                  style="margin-top:21%"
                  size="sm"
                  @click="pedirAcesso()"
                  >Acessar</b-button
                ></b-col
              >
            </b-row>
          </div>
          <b-card v-if="acessoLiberado == true">
            <b-row class="mb-2">
              <b-col sm="2" class="text-sm-right"><b>Ano/Mês Venc:</b></b-col>
              <b-col>{{ formatAnoMesVenc(row.item.mes_ano_vencimento) }}</b-col>

              <b-col sm="2" class="text-sm-right"><b>CVC:</b></b-col>
              <b-col>{{ row.item.cvc }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="2" class="text-sm-right"
                ><b>Limite Disponível:</b></b-col
              >
              <b-col>{{ formatDecimal(row.item.limite_saldo) }}</b-col>

              <b-col sm="2" class="text-sm-right"><b>Limite Saldo:</b></b-col>
              <b-col>{{
                formatDecimal(row.item.limite_saldo_disponivel)
              }}</b-col>
            </b-row>

            <b-button size="sm" @click="row.toggleDetails"
              >Hide Details</b-button
            >
          </b-card>
        </template>
      </b-table>
    </b-container>
  </div>
</template>

<script>
import { CartoesService } from "../../services/cartoes/cartoesService.js";
export default {
  data() {
    return {
      acessoLiberado: false,
      fields: [
        //{ key: "conta_id_conta", label: "Id Conta" },
        { key: "num_cartao", label: "Número do Cartão" },
        { key: "show_details", label: "Detalhes" }
      ],
      items: []
    };
  },
  methods: {
    formatNumeroCartao(numCartao) {
      let numeroTratado =
        numCartao.toString().slice(0, 4) +
        "-" +
        numCartao
          .toString()
          .toString()
          .slice(4, 8) +
        "-" +
        numCartao
          .toString()
          .toString()
          .slice(8, 12) +
        "-" +
        numCartao
          .toString()
          .toString()
          .slice(12, 16);
      return numeroTratado;
    },
    formatAnoMesVenc(data) {
      let dataTratada = "";
      if (data.length < 7) {
        dataTratada =
          data.toString().slice(0, 4) +
          "-" +
          data
            .toString()
            .toString()
            .slice(4, 6);
      } else {
        dataTratada =
          data.toString().slice(6, 10) +
          "-" +
          data
            .toString()
            .toString()
            .slice(3, 5);
      }
      return dataTratada;
    },
    formatDecimal(valor) {
      let valorTratado = valor.toFixed(2);
      return valorTratado;
    },
    carregarCartoes() {
      CartoesService.getCartoes()
        .then(response => {
          if (response.success) {
            this.items = response.data.cartoes;
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
    this.carregarCartoes();
  }
};
</script>
