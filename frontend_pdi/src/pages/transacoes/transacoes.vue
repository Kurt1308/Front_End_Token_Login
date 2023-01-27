<template>
  <div>
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
    </b-table>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stickyHeader: true,
      fields: [
        {
          key: "id",
          stickyColumn: true,
          isRowHeader: true,
          variant: "primary"
        },
        { key: "a", label: "Número Cartão", stickyColumn: true },
        { key: "b", label: "Código da Aprovação", stickyColumn: true },
        { key: "c", label: "Data da Transação", stickyColumn: true },
        { key: "d", label: "Valor", stickyColumn: true }
      ],
      items: [
        {
          id: 1,
          a: 0,
          b: 1,
          c: 2,
          d: 3
        },
        {
          id: 1,
          a: 0,
          b: 1,
          c: 2,
          d: 3
        },
        {
          id: 1,
          a: 0,
          b: 1,
          c: 2,
          d: 3
        },
        {
          id: 1,
          a: 0,
          b: 1,
          c: 2,
          d: 3
        },
        {
          id: 1,
          a: 0,
          b: 1,
          c: 2,
          d: 3
        },
        {
          id: 1,
          a: 0,
          b: 1,
          c: 2,
          d: 3
        },
        {
          id: 1,
          a: 0,
          b: 1,
          c: 2,
          d: 3
        },
        {
          id: 1,
          a: 0,
          b: 1,
          c: 2,
          d: 3
        },
        {
          id: 1,
          a: 0,
          b: 1,
          c: 2,
          d: 3
        },
        {
          id: 1,
          a: 0,
          b: 1,
          c: 2,
          d: 3
        },
        {
          id: 1,
          a: 0,
          b: 1,
          c: 2,
          d: 3
        },
        {
          id: 1,
          a: 0,
          b: 1,
          c: 2,
          d: 3
        },
        {
          id: 1,
          a: 0,
          b: 1,
          c: 2,
          d: 3
        },
        {
          id: 1,
          a: 0,
          b: 1,
          c: 2,
          d: 3
        },
        {
          id: 1,
          a: 0,
          b: 1,
          c: 2,
          d: 3
        },
        {
          id: 1,
          a: 0,
          b: 1,
          c: 2,
          d: 3
        },
        {
          id: 1,
          a: 0,
          b: 1,
          c: 2,
          d: 3
        }
      ]
    };
  }
};
</script>
