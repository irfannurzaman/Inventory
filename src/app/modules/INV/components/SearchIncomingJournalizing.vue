<template>
  <section class="mt-7">
    <div id="input" class="q-pa-md">
      <v-date-picker v-model="searches.date"  :popover="{ visibility: 'click' }">
        <SInput
          label-text="From Date"
          slot-scope="{ inputProps }"
          placeholder="From - Until"
          readonly
          v-bind="inputProps"
          clearable
          disable
        />
      </v-date-picker>
      <v-date-picker v-model="searches.date"  :popover="{ visibility: 'click' }">
        <SInput
          label-text="To Date"
          slot-scope="{ inputProps }"
          placeholder="From - Until"
          readonly
          v-bind="inputProps"
          clearable
          :disable="searches.disableData"
        />
      </v-date-picker>
      <SInput 
      label-text="Reference Number" 
      :options="searches.store" 
      v-model="searches.referenceNumber" 
      :disable="searches.disableData"/>
      <SInput 
      label-text="Description" 
      :options="searches.store" 
      v-model="searches.discription"
      :disable="searches.disableData" />
      <q-btn
        block
        color="primary"
        icon="mdi-search"
        :label="searches.lebelSearch"
        class="q-mt-md full-width"
        max-height="10"
        style="height: 25px"
        @click="onSearch"
        :disable="searches.disableButton"
      />

      <q-separator style="border-width: 1px;" class="q-my-md" />

      <SRemarkLeftDrawer label="Total Debit" :value="searches.hasilDebit" />
      <SRemarkLeftDrawer label="Total Credit" :value="searches.hasilCredit" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from '@vue/composition-api';
import { setupCalendar, DatePicker } from 'v-calendar';
import { date } from 'quasar';
import { log } from 'util';
import { type } from 'os';

setupCalendar({
  firstDayOfWeek: 2,
});

export default defineComponent({
  props: {
    searches: { type: Object, required: true },
  },

  setup(props, { emit }) {
    const state = reactive({
      ReqNumber: ref(' '),
    });

    const onSearch = () => {
      emit('onSearch', { ...props });
    };

    return {
      ...toRefs(state),
      onSearch,
    };
  },
  components: {
    'v-date-picker': DatePicker,
  },
});
</script>

<style lang="scss" scoped>
#input {
  width: 200px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

#radio {
  margin-left: -9px;
}
</style>
