<template>
  <div>
    <q-drawer :value="true" side="left" bordered :width="220" persistent>
      <SearchChartOfAccounts @onSearch="onSearch" />
    </q-drawer>
    <div class="q-pa-lg">
      <div class="q-mb-md">
        <q-btn @click="dialog = true" flat round class="q-mr-lg">
          <img :src="require('~/app/icons/Icon-Add.svg')" height="30" />
        </q-btn>
        <q-btn flat round class="q-mr-lg">
          <img :src="require('~/app/icons/Icon-Refresh.svg')" height="30" />
        </q-btn>
        <q-btn flat round>
          <img :src="require('~/app/icons/Icon-Print.svg')" height="30" />
        </q-btn>
      </div>
      <STable
        :loading="isFetching"
        :columns="tableHeaders"
        :data="data"
        :rows-per-page-options="[0]"
        :pagination.sync="pagination"
        hide-bottom
        class="table-accounting-date"
        @row-click="onRowClick"
      >
        <template #header-cell-fibukonto="props">
          <q-th :props="props" class="fixed-col left">{{ props.col.label }}</q-th>
        </template>

        <template #body-cell-fibukonto="props">
          <q-td :props="props" class="fixed-col left">{{ props.row.fibukonto }}</q-td>
        </template>

        <template #header-cell-actions="props">
          <q-th :props="props" class="fixed-col right">{{ props.col.label }}</q-th>
        </template>

        <template #body-cell-actions="props">
          <q-td :props="props" class="fixed-col right">
            <q-icon name="mdi-dots-vertical" size="16px">
              <q-menu auto-close anchor="bottom right" self="top right">
                <q-list>
                  <q-item clickable v-ripple @click="editItem">
                    <q-item-section>edit</q-item-section>
                  </q-item>
                  <q-item clickable v-ripple @click="confirm = true">
                    <q-item-section>delete</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-icon>
          </q-td>
        </template>
      </STable>
    </div>
    <DialogChartOfAccounts
      :dialog="dialog"
      @saveData="saveData"
      @cencel="dialog = false"
      :selected="prepare"
      :accountId="accountId"
    />
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="primary" text-color="white" />
          <span class="q-ml-sm">
            Are you sure delete the stock article {{ 1101002 }} - Avocado
            ?
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn @click="deleteData" flat label="Ok" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  toRefs,
  reactive,
  ref,
} from '@vue/composition-api';
import { tableHeaders } from './tables/recipe.table';
import { log } from 'util';
export default defineComponent({
  setup(_, { root: { $api } }) {
    let charts;
    const state = reactive({
      dialog: false,
      confirm: false,
      prepare: '',
      data: [],
      page: false,
      accountId: '',
      idDialog: '',
    });

    // Fetch API

    const FETCH_API = async (api, body?) => {
        const GET_DATA = await $api.inventory.FetchAPIINV(api, body)
        switch (api) {
            case 'recipeListPrepare':
                state.data = GET_DATA.tHRezept['t-h-rezept'].map((item, i) =>
                  Object.assign({}, item, GET_DATA.costList['cost-list'][i])
                );
                break;
        
            default:
                break;
        }
        console.log('sukses', GET_DATA)
    }




    onMounted(async () => {
        FETCH_API('recipeListPrepare')
    //   const data1 = await Promise.all([
    //     $api.inventory.apiRecipe('recipeListPrepare'),
    //   ]);

    //   state.data = data1[0].tHRezept['t-h-rezept'].map((item, i) =>
    //     Object.assign({}, item, data1[0].costList['cost-list'][i])
    //   );
    //   if (state.data !== undefined) {
    //     state.page = true;
    //   }
    //   ``;
    });
    const saveData = () => {
      state.dialog = false;
    };

    const asyncCall = async (val, input) => {
      const data1 = await Promise.all([
        $api.inventory.apiRecipe('recipeListPrepare'),
      ]);

      // MENGGABUNGKAN DUA OBJECT DALAM SATU ARRAY
      const data = data1[0].tHRezept['t-h-rezept'].map((item, i) =>
        Object.assign({}, item, data1[0].costList['cost-list'][i])
      );

      if (val == '1') {
        state.data = data.filter((data: any) => {
          return data.artnrrezept.toString().includes(input.toString());
        });
        if (state.data.length < 14) {
          state.page = false;
        }
        if (state.data.length > 14) {
          state.page = true;
        }
      }
      if (val == '2') {
        state.data = data.filter((data: any) => {
          return data
            .toLowerCase()
            .bezeich.toLowerCase()
            .includes(input.toLowerCase());
        });
        if (state.data.length < 14) {
          state.page = false;
        }
        if (state.data.length > 14) {
          state.page = true;
        }
      }
      if (val == '3') {
        state.data = data.filter((data: any) => {
          return data.kategorie.toString().includes(input.toString());
        });
        if (state.data.length < 14) {
          state.page = false;
        }
        if (state.data.length > 14) {
          state.page = true;
        }
      }
    };

    const onSearch = (val, input) => {
      asyncCall(val, input);
    };

    const editItem = (accountId) => {
      state.accountId = accountId;
      state.dialog = true;
      state.idDialog = '2';
    };

    const openDialog = () => {
      state.dialog = true;
      state.idDialog = '1';
    };

    const deleteData = async () => {
      await Promise.all([
        $api.inventory.apiRecipe('recipeListDelCheck', {
          pvILanguage: 1,
          ['t-h-rezept-artnrrezept']: 'Recipe Number',
        }),
      ]);
    };

    return {
      ...toRefs(state),
      onSearch,
      saveData,
      openDialog,
      editItem,
      deleteData,
      tableHeaders,
      pagination: {
        rowsPerPage: 0,
      },
    };
  },
  components: {
    SearchChartOfAccounts: () => import('./components/SearchRecipe.vue'),
    DialogChartOfAccounts: () => import('./components/DialogRecipe.vue'),
  },
});
</script>

<style lang="scss" scoped>
::v-deep .table-accounting-date {
  max-height: 75vh;

  thead tr {
    th {
      position: sticky;
      z-index: 3;
    }

    &:first-child th {
      top: 0;
    }
  }
}
</style>
