<template>
  <q-drawer
    side="right"
    v-model="reportDrawer"
    overlay
    behavior="mobile"
    :width="360"
  >
    <q-toolbar class="justify-between shadow-2">
      <span class="text-weight-medium">
        {{ reportData.title }} Report List
      </span>
      <q-btn flat round icon="mdi-close" @click="reportDrawer = false" />
    </q-toolbar>

    <div class="q-pa-lg">
      <SInput label-text="Search" v-model="reportFilter" />

      <STable
        :columns="tableHeaders"
        :data="reportData.reports"
        hide-bottom
        :filter="reportFilter"
        @row-click="onRowClick"
      />
    </div>
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api';
import { tableHeaders } from '../tables/reportList.table';

export default defineComponent({
  props: {
    drawer: { type: Boolean, required: true },
    reportData: { type: Object, required: true },
  },
  setup(props, { root, emit }) {
    const reportFilter = ref('');
    const reportDrawer = computed({
      get: () => props.drawer,
      set: (val) => {
        emit('update:drawer', val);
      },
    });

    function onRowClick(_, row) {
      root.$router.push(row.path);
    }

    return {
      reportFilter,
      onRowClick,
      tableHeaders,
      reportDrawer,
    };
  },
});
</script>

<style lang="scss" scoped></style>
