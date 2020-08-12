<template>
  <div>
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <SearchGeneralLedger />
    </q-drawer>

    <div class="q-pa-lg">
      <div class="q-mb-md">
        <q-btn flat round class="q-mr-lg">
          <img :src="require('~/app/icons/Icon-Refresh.svg')" height="30" />
        </q-btn>
        <q-btn flat round>
          <img :src="require('~/app/icons/Icon-Print.svg')" height="30" />
        </q-btn>
      </div>

      <STable :loading="false" :columns="tableHeaders" :data="[]" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup() {
    const tableHeaders = [
      { name: 'selection', field: 'selection' },
      { label: 'Date', name: 'date', align: 'left' },
      { label: 'Reference Number', name: 'reference', align: 'left' },
      { label: 'Remark', name: 'remark', align: 'left' },
      { label: 'Debit', name: 'debit', align: 'left' },
      { label: 'Credit', name: 'credit', align: 'left' },
      { label: 'Balance', name: 'balance', align: 'left' },
      { label: 'Description', name: 'description', align: 'left' },
      { label: 'Created ID', name: 'createdId', align: 'left' },
      { label: 'Created Date', name: 'createdDate', align: 'left' },
      { label: 'Change ID', name: 'changeId', align: 'left' },
      { label: 'Changed Date', name: 'changedDate', align: 'left' },
      { label: 'Cash Flow', name: 'cashFlow', align: 'left' },
      { label: 'Tax Code', name: 'taxCode', align: 'left' },
      { label: 'Tax Amount', name: 'taxAmount', align: 'left' },
      { name: 'actions', field: 'actions' },
    ];

    return {
      tableHeaders,
    };
  },
  components: {
    SearchGeneralLedger: () => import('./components/SearchGeneralLedger.vue'),
  },
});
</script>
