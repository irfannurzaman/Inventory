<template>
  <section class="mt-7">
    <div class="q-pa-md">
      <label class="block q-mb-sm">Display</label>
      <q-btn-toggle
        v-model="display"
        spread
        no-caps
        dense
        toggle-color="primary"
        :options="[
          { label: 'Active', value: 'active' },
          { label: 'Closed', value: 'closed' },
        ]"
      />
    </div>

    <q-separator />

    <div class="q-pa-md">
      <v-date-picker
        mode="range"
        v-model="date"
        :columns="2"
        :popover="{ visibility: 'click' }"
      >
        <SInput
          label-text="Date"
          slot-scope="{ inputProps }"
          placeholder="From - Until"
          readonly
          v-bind="inputProps"
          clearable
          @clear="date = null"
        >
          <template v-slot:append>
            <q-icon name="mdi-event" />
          </template>
        </SInput>
      </v-date-picker>

      <SInput label-text="Voucher No" />

      <q-btn
        dense
        color="primary"
        icon="mdi-magnify"
        label="Search"
        class="q-mt-md full-width"
      />
    </div>

    <q-separator class="q-my-md" />

    <div class="q-px-md">
      <SRemarkLeftDrawer right label="Debit" :value="formatThousands(credit)" />
      <SRemarkLeftDrawer right label="Credit" :value="formatThousands(debit)" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api';
import { setupCalendar, DatePicker } from 'v-calendar';
import { formatThousands } from '~/app/helpers/numberFormat.helpers';

setupCalendar({
  firstDayOfWeek: 2,
});

export default defineComponent({
  setup() {
    const state = reactive({
      display: 'active',
      date: null,
      credit: 0,
      debit: 0,
    });

    return {
      ...toRefs(state),
      formatThousands,
    };
  },
  components: {
    'v-date-picker': DatePicker,
  },
});
</script>

<style lang="scss" scoped></style>
