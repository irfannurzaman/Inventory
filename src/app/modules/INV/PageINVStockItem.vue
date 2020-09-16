<template>
  <div>
    <q-drawer :value="true" side="left" bordered :width="220" persistent>
      <SearchChartOfAccounts @onSearch="onSearch"/>
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
        class="table-rooming-list"
        :columns="roomTableHeaders"
        :data="data"
        :rows-per-page-options="[0]"
        :pagination.sync="pagination"
        :hide-bottom="hide_bottom"
        :loading="loading"
        row-key="index"
        virtual-scroll
        :virtual-scroll-item-size="29"
        :virtual-scroll-sticky-size-start="29"
        @virtual-scroll="onScroll"
      >
        <template #header="props">
          <q-tr :props="props">
            <q-th
              :props="props"
              key="articelNumber"
              rowspan="2"
            >{{ props.colsMap.articelNumber.label }}</q-th>

            <q-th
              :props="props"
              key="descriPtion"
              rowspan="2"
            >{{ props.colsMap.descriPtion.label }}</q-th>
            <q-th colspan="2">Mess</q-th>
            <q-th colspan="2">Delivery</q-th>
            <q-th
              :props="props"
              key="masseinheit"
              rowspan="2"
            >{{ props.colsMap.guestNote.label }}</q-th>
            <q-th colspan="3">Price</q-th>
            <q-th
              :props="props"
              key="purchase"
              rowspan="2"        
            >{{ props.colsMap.purchase.label}}</q-th>
            <q-th
              :props="props"
              key="articelNumber"
              rowspan="2"        
            >{{ props.colsMap.accountNumber.label }}
            </q-th>
            <q-th
              :props="props"
              key="actions"
              rowspan="2"
              class="fixed-col right"
              style="z-index: 4"        
            >{{ props.colsMap.actions.label }}
            </q-th>
          </q-tr>
          <q-tr :props="props">
            <q-th
              v-for="col in getDefaultColumns(props.cols)"
              :key="col.name"
              :props="props"
            >{{ col.label }}</q-th>
          </q-tr>
        </template>
        <template #body="props">
          <q-tr :props="props">
            <q-td
            :props="props"
            v-for="col in props.cols.filter(cols => ![
            'actions'].includes(cols.name))"
            :key="col.name"
            >
                  {{col.value}}
            </q-td>
            <q-td :props="props.row.actions" class="fixed-col right">
              <q-icon name="mdi-dots-vertical" size="16px">
                <q-menu :props="props" auto-close anchor="bottom right" self="top right">
                  <q-list :props="props">
                    <q-item :props="props" clickable v-ripple>
                      <q-item-section>edit</q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                      <q-item-section>delete</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </q-td>
          </q-tr>
        </template>
      </STable>
    </div>
    <DialogChartOfAccounts
      :dialog="dialog"
      @onDialog="onDialog"
      :selected="prepare"
      :accountId="accountId"
      :getAccountnumber="valueData"
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
import { mapWithBezeich } from '~/app/helpers/mapSelectItems.helpers';
import { roomTableHeaders } from './tables/stockItem.table';
import { data_table } from './utils/params.stockItem'
import {scroll} from 'quasar'

export default defineComponent({
  setup(_, { root: { $api } }) {
    const { getScrollTarget, setScrollPosition } = scroll
    let charts, value, lastArt1;
    const state = reactive({
      data: [],
      loading: false,
      nextPage: 2,
      dialog: false,
      hide_bottom: false,
      confirm: false,
      prepare: '',
      trueandfalse: false,
      valueData: 0,
      accountId: '',
      getAccountnumber: '',
    });

    // FETCH API
    const FETCH_API = async (api, body?) => {
      const GET_DATA = await $api.inventory.FetchAPIINV(api, body)
      lastArt1 = GET_DATA.firstArtnr
      const data = GET_DATA.tLArtikel['t-l-artikel']
      setTimeout(() => {
      state.loading = false
      const dataTable =  data_table(data)
      for(const i in dataTable){
        state.data.push(dataTable[i])
      }
        console.log('sukses', state.data.length)
      if(state.data.length !== 0){
        state.hide_bottom = true
      }
      }, 2000)
      
    }
    const onScroll = ({to, ref}) => {
      const lastIndex = state.data.length - 1
        if (!state.loading && to === lastIndex && lastIndex > 27 ) {
          if (lastIndex > 56) {
            state.loading = true
          }
            const data = {
              "sorttype ": value.shape,
              "lastArt" : value.description == ''? " ": value.description,
              "lastArt1" : lastArt1
            }
            FETCH_API('getInvArticleList', data)
        }

    }

    const onSearch = (value1) => {
      value = value1
      state.loading = true
      if (value.shape == '2') {
        const data = {
          "sorttype ": value.shape,
          "lastArt" : value.description == ''? " ": value.description,
          "lastArt1" : 1101001
        }
        FETCH_API('getInvArticleList', data)
      }
    };

    const onDialog = (val) => {
      state.dialog = val;
    };

    function deleteData() {
      async function asyncCall() {
        const GET_DATA = await Promise.all([
          $api.inventory.apiStockItem('delInvArticle', {
            pvILanguage: 1,
            artnr: state.valueData,
          }),
        ]);
      }
      asyncCall();
    }

    const onRowClick = (p, val) => {
      state.valueData = val.artnr;
    };

    function editItem(accountId) {
      state.dialog = true;
      state.accountId = accountId;
    }

    function getDefaultColumns(cols) {
      return cols.filter(
        (col) =>
          ![
            'descriPtion',
            'articelNumber',
            'guestNote',
            'purchase',
            'accountNumber',
            'actions'
          ].includes(col.name)
      );
    }

    function getDefaultData (cols){
      return cols.filter(
        col => 
        ![
          'articelNumber',
          'descriPtion',
          'accountNumber'
        ].includes(col.name)
      )
    }
    return {
      ...toRefs(state),
      roomTableHeaders,
      getDefaultColumns,
      getDefaultData,
      editItem,
      onRowClick,
      onScroll,
      deleteData,
      onSearch,
      onDialog,
      pagination: {
        rowsPerPage: 0,
      },
    };
  },
  components: {
    SearchChartOfAccounts: () =>
      import('./components/SearchChartStockItem.vue'),
    DialogChartOfAccounts: () => import('./components/ModalNewStockItem.vue'),
    StockItemRoomTable: () => import('./components/INVStockItemRoomTable.vue'),
  },
});
</script>

<style lang="scss" scoped>
.table-rooming-list {
  max-height: 75vh;
  thead tr th {
    position: sticky;
    z-index: 3;
  }

  thead tr:first-child th {
    top: 0;
  }

  thead tr:last-child th {
    top: 28px;
  }

  tr.selected td {
    background-color: #2d00e2 !important;
    color: #fff;
  }
}
</style>
