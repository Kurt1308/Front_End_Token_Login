<template>
  <div>
    <div class="text-center" style="padding-top: 10%">
      <h1><b>Cartões</b></h1>
    </div>
    <b-container id="table-contas">
        <b-table
          bordered
          striped
          hover
          :items="items"
          :fields="fields"
        >
      <template #cell(show_details)="row">
        <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
        <b-form-checkbox
          v-model="row.detailsShowing"
          @change="row.toggleDetails"
        >
          Mostrar detalhes deste cartão
        </b-form-checkbox>
      </template>

      <template #row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="2" class="text-sm-right"><b>Mês/Ano Venc:</b></b-col>
            <b-col>{{ row.item.anoVenc }}</b-col>
          
            <b-col sm="2" class="text-sm-right"><b>CVC:</b></b-col>
            <b-col>{{ row.item.cvc }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="2" class="text-sm-right"><b>Limite Saldo:</b></b-col>
            <b-col>{{ row.item.limiteSaldo }}</b-col>
          
            <b-col sm="2" class="text-sm-right"
              ><b>Limite Disponível:</b></b-col
            >
            <b-col>{{ row.item.limiteDisponivel }}</b-col>
          </b-row>

          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
        </b-card>
      </template>
    </b-table>
  </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: ["contaCartao", "numCartao", "show_details"],
      items: [
        {
          contaCartao: 45687,
          numCartao: "4569854125489562",
          _showDetails: false,
          anoVenc: "02-2024",
          cvc: 584,
          limiteSaldo: 503.25,
          limiteDisponivel: 514.78
        },
        {
          contaCartao: 87452,
          numCartao: "4569854125489562",
          _showDetails: false,
          anoVenc: "02-2024",
          cvc: 584,
          limiteSaldo: 503.25,
          limiteDisponivel: 514.78
        },
        {
          contaCartao: 41582,
          numCartao: "4569854125489562",
          _showDetails: false,
          anoVenc: "02-2024",
          cvc: 584,
          limiteSaldo: 503.25,
          limiteDisponivel: 514.78
        },
        {
          contaCartao: 41578,
          numCartao: "4569854125489562",
          _showDetails: false,
          anoVenc: "02-2024",
          cvc: 584,
          limiteSaldo: 503.25,
          limiteDisponivel: 514.78
        }
      ]
    };
  }
};
</script>
