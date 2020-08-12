<template>
  <section class="mt-7">
    <div v-if="search.isFetching" class="q-pa-md text-center">
      <q-spinner color="primary" size="4em" :thickness="3" />
    </div>

    <template v-else>
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

        <SSelect
          label-text="From"
          :options="search.fromOptions"
          v-model="search.from"
          use-input
          input-debounce="0"
          @filter="filterFrom"
        />

        <SSelect
          label-text="To"
          :options="search.toOptions"
          v-model="search.to"
          use-input
          input-debounce="0"
          @filter="filterTo"
        />
      </div>

      <q-separator class="q-my-sm" />

      <div class="q-pa-md">
        <SSelect
          label-text="Display"
          :options="searches.display"
          v-model="search.display"
        />

        <q-btn-toggle
          v-model="description"
          spread
          no-caps
          dense
          toggle-color="primary"
          :options="[
            { label: 'Description', value: 'description' },
            { label: 'Remark', value: 'remark' },
          ]"
          class="q-mb-md"
        />

        <q-checkbox v-model="excludeOther" label="Exclude Other Dept" />
        <q-checkbox v-model="summaryPerDate" label="Summary Per Date" />

        <q-btn
          dense
          color="primary"
          icon="mdi-magnify"
          label="Search"
          class="q-mt-md full-width"
        />
      </div>

      <q-separator class="q-my-sm" />

      <div class="q-px-md">
        <SRemarkLeftDrawer
          right
          label="Debit"
          :value="formatThousands(credit)"
        />
        <SRemarkLeftDrawer
          right
          label="Credit"
          :value="formatThousands(debit)"
        />
      </div>
    </template>
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
} from '@vue/composition-api';
import { setupCalendar, DatePicker } from 'v-calendar';
import { date } from 'quasar';
import { formatThousands } from '~/app/helpers/numberFormat.helpers';
import { mapWithBezeich } from '~/app/helpers/mapSelectItems.helpers';

setupCalendar({
  firstDayOfWeek: 2,
});

export default defineComponent({
  setup(_, { root: { $api } }) {
    const state = reactive({
      credit: 0,
      debit: 0,
      description: 'remark',
      date: {
        start: date.startOfDate(new Date(), 'month'),
        end: new Date(),
      },
      search: {
        isFetching: true,
        from: null,
        fromOptions: [],
        to: null,
        toOptions: [],
        display: 'All',
      },
      excludeOther: false,
      summaryPerDate: false,
      prepareOptions: [],
    });

    const searches = {
      display: [
        { label: 'All', value: 'all' },
        { label: 'Main Account', value: 'mainAccount' },
        { label: 'Department', value: 'department' },
        { label: 'Reference Number', value: 'referenceNumber' },
      ],
    };

    const filterOptions = (val, searchOptions) => {
      state.search[searchOptions] = state.prepareOptions.filter(
        (v: any) => v.label.toLowerCase().indexOf(val.toLowerCase()) > -1
      );
    };

    const filterFrom = (val, update) => {
      update(() => {
        filterOptions(val, 'fromOptions');
      });
    };

    const filterTo = (val, update) => {
      update(() => {
        filterOptions(val, 'toOptions');
      });
    };

    onMounted(async () => {
      const res = await $api.accountReceivable.getPrepareSelectGLAcct();
      state.prepareOptions = mapWithBezeich(res, 'fibukonto');
      state.search.isFetching = false;
    });

    return {
      ...toRefs(state),
      formatThousands,
      searches,
      filterFrom,
      filterTo,
    };
  },
  components: {
    'v-date-picker': DatePicker,
  },
});
</script>
