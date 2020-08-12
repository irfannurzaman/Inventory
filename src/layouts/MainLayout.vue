<template>
  <div>
    <q-layout view="HHh LpR fFf">
      <LayoutMainHeader />

      <q-page-container
        :style="{ 'padding-right': reportData ? '50px' : '0px' }"
      >
        <router-view />
      </q-page-container>

      <q-drawer
        v-model="rightDrawer"
        side="right"
        bordered
        :width="50"
        persistent
      >
        <div class="column full-height">
          <q-list padding>
            <q-item
              clickable
              v-ripple
              class="q-px-sm"
              @click="reportDrawer = true"
            >
              <q-item-section class="items-center">
                <img
                  :src="require('~/app/icons/Icon-Report-List.svg')"
                  height="30px"
                />
              </q-item-section>
            </q-item>
          </q-list>

          <q-list padding class="q-mt-auto q-mb-lg">
            <q-item clickable v-ripple @click="rightDrawer = false">
              <q-item-section>
                <q-icon name="mdi-chevron-right" />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-drawer>
    </q-layout>

    <q-layout v-if="reportData">
      <LayoutReportDrawer
        :drawer.sync="reportDrawer"
        :report-data="reportData"
      />

      <q-page-sticky position="bottom-right" :offset="[18, 28]">
        <q-btn
          v-if="!rightDrawer"
          fab
          icon="mdi-chevron-left"
          color="primary"
          @click="rightDrawer = true"
        />
      </q-page-sticky>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from '@vue/composition-api';

export default defineComponent({
  setup(_, { root }) {
    const rightDrawer = ref(true);
    const reportDrawer = ref(false);
    const reportData = ref(null);

    watch(
      () => root.$route,
      (route) => {
        const { reportList } = route.meta;
        rightDrawer.value = !!reportList;
        reportData.value = reportList;

        if (!reportList) {
          rightDrawer.value = false;
        }
      },
      { immediate: true }
    );

    return {
      rightDrawer,
      reportDrawer,
      reportData,
    };
  },
  components: {
    LayoutMainHeader: () => import('./components/LayoutMainHeader.vue'),
    LayoutReportDrawer: () => import('./components/LayoutReportDrawer.vue'),
  },
});
</script>
