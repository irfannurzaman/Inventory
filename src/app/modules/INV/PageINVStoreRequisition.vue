<template>
  <div id="app">
    <q-drawer :value="true" side="left" bordered :width="220" persistent>
      <searchIncoming :searches="searches" @onSearch="onSearch" />
    </q-drawer>

    <div class="q-pa-lg">
      <div class="q-mb-md">
        <q-btn @click="addData" flat round class="q-mr-lg">
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
      >
        <template #body-cell-artnr="props">
          <q-td 
          :props="props" 
          :class="props.row['t-status'] == 2 ? 'bg-red text-white' : null"
          >{{props.row.artnr}}</q-td>
        </template>

        <template #header-cell-fibukonto="props">
          <q-th :props="props" class="fixed-col left">{{ props.col.label}}</q-th>
        </template>

        <template #body-cell-fibukonto="props">
          <q-td :props="props" class="fixed-col left">{{ props.row.fibukonto}}</q-td>
        </template>

        <template #header-cell-actions="props">
          <q-th :props="props" class="fixed-col right">{{ props.col.label }}</q-th>
        </template>

        <template #body-cell-actions="props">
          <q-td :props="props" class="fixed-col right">
            <q-icon 
              v-if="props.row.einzelpreis !== props.row.price"
              name="mdi-dots-vertical" size="16px">
              <q-menu auto-close anchor="bottom right" self="top right">
                <q-list v-if="props.row.einzelpreis !== props.row.price">
                  <q-item 
                  :disable="props.row.appStr == 'Y' ? true :  false" 
                  clickable v-ripple 
                  @click="editItem(props.row)">
                    <q-item-section >Modify</q-item-section>
                  </q-item>
                  <q-item 
                  :disable=" props.row.appStr == 'Y' ? true : false " 
                  clickable v-ripple 
                  @click="insertOther(props.row)">
                    <q-item-section >Insert Other</q-item-section>
                  </q-item>
                  <q-item 
                  :disable="props.row.appStr == 'Y'?
                  props.row['t-status'] == 2 ? true : false : true" 
                  clickable v-ripple 
                  @click="outgoingStock(props.row)">
                    <q-item-section >Outgoing Stock</q-item-section>
                  </q-item>
                  <q-item 
                  :disable="props.row.appStr == 'Y' ? true : false"  
                  clickable v-ripple 
                  @click="deleteRow(props.row)">
                  <q-item-section>Delete</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-icon>
          </q-td>
        </template>
      </STable>
      <dialogTypeStoreRequisition
        :dialogTransfer="dialogTransfer"
        :disableToStore="disableToStore"
        :disableAccount="disableAccount"
        :dialog="dialog"
        :searches="searches"
        :group="group"
        :keyApprove="keyApprove"
        :insertData="insertData"
        :editData="editData"
        :editKey="editKey"
        @select="select"
        @close="close"
        @select1="select1"
        @sukses="sukses"
      />
      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="warning" color="primary" text-color="white" />
            <span class="q-ml-sm">Are you sure delete the stock article {{1101002}} - Avocado ?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn @click="deleteData" flat label="Ok" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  toRefs,
  reactive,
} from '@vue/composition-api';
import { mapGroup } from '~/app/helpers/mapSelectItems.helpers';
import { tableHeaders } from './tables/storeRequisition';
import { formatterMoney } from '~/app/helpers/formatterMoney.helper'
import { Notify, date } from 'quasar';


export default defineComponent({
  setup(_, { root: { $api } }) {
    let rowDelete, dataActions
    const state = reactive({
      isFetching: false,
      searches: {
        departments: [],
        articelNumber: []
      },
      dialog: false,
      dialogTransfer: false,
      transfer: null,
      data: [],
      insertData: [],
      editData: [],
      trueAndFalse: false,
      confirm: false,
      fromDept: '',
      toDept: '',
      group: '',
      keyApprove: '',
      editKey: ''
    });

    onMounted(async () => {
      const [data, data2] = await Promise.all([
        $api.inventory.FetchAPIINV('storeRequestPrepare', {
          userInit: '01'
        }),
        $api.inventory.FetchAPIINV('storeReqPrepare')
      ]);
        state.searches.departments = mapGroup(
          data.tParameters['t-parameters'],
        'vstring',
        'varname'
      );
      state.searches.articelNumber = data.tempLArtikel['temp-l-artikel']
    });

    const getData = async () => {
      const [GET_DATA] = await Promise.all([
        $api.inventory.FetchAPIINV('storeReqCreateList', {
          fromDate: date.formatDate(dataActions.date.start, 'MM/DD/YY'),
          toDate: date.formatDate(dataActions.date.end, 'MM/DD/YY'),
          fromDept: dataActions.fromDept.value,
          toDept: dataActions.toDept.value,
          currLschein: dataActions.ReqNumber == ''? ' ' : dataActions.ReqNumber ,
          showPrice: true,
        }),
      ]);

      state.data = GET_DATA.tList['t-list'].map((items) => ({
        datum: items.datum,
        lscheinnr: items.lscheinnr,
        ['f-bezeich'] : items['f-bezeich'],
        deptName : items.deptName,
        artnr: items.artnr,
        bezeich: items.bezeich,
        einheit: items.einheit,
        content: items.content !== 0 ? items.content : '',
        einzelpreis: items.einzelpreis !== 0 ? formatterMoney(items.einzelpreis) : items.price,
        qty:  `${items.qty}.000`,
        qty1: `${items.qty1}.000`,
        stornogrund: items.stornogrund,
        ID: items.ID,
        appStr: items.appStr,
        actions: items.actions,
        ['t-status']: items['t-status'],
        price: items.price
      }));
      if (GET_DATA.itExist == 'true') {
        state.isFetching = false;
      }
    };


    const prepareInsStorerequestbl = async (val) => {
      const [GET_DATA] = await Promise.all([
        $api.inventory.FetchAPIINV('storeReqInsPrepare', {
          userInit: '01',
          tDatum: date.formatDate(val.datum, 'MM/DD/YY'),
          tLschein: val.lscheinnr
        })
      ])
      state.insertData = GET_DATA
    }

    const chgStoreRequestLoadData = async (row) => {
      const [GET_DATA] = await Promise.all([
        $api.inventory.FetchAPIINV('chgStoreRequestLoadData', {
          userInit: '01',
          tDatum: date.formatDate(row.datum, 'MM/DD/YY'),
          tLschein: row.lscheinnr,
          tAmount: '0',
          lscheinnr: ''
        })
      ])
      state.editData = GET_DATA
    }

    const onSearch = (val) => {
      dataActions = val
      state.isFetching = true;
      getData();
    };
    const select = (val) => {
      state.dialogTransfer = true;
      state.dialog = val;
    };
    const close = (val) => {
      state.dialogTransfer = val;
      state.dialog = val;
    };

    function select1() {
      state.dialogTransfer = false;
      Notify.create({
        type: 'positive',
        message: 'success'
      })
    }


    const addData = () => {
      state.dialog = true
      state.keyApprove = ''
    }

    const editItem = (row) => {
      const data = row['stornogrund']
      if (data == '') {
      state.editKey = '1'
      } else {
      state.editKey = '2'
      }
      state.keyApprove = 'approve'
      state.dialogTransfer = true
      chgStoreRequestLoadData(row)
    }

    const insertOther = (row) => {
      state.keyApprove = ''
      const data = row
      if (data['stornogrund'] == '') {
        state.editKey = '1'
      } else {
        state.editKey = '2'
      }
      prepareInsStorerequestbl(data)
      state.dialogTransfer = true
    }

    const outgoingStock = (row) => {
      state.keyApprove = ''
      const data = row
      if (data['stornogrund'] == '') {
        state.editKey = '1'
      } else {
        state.editKey = '2'
      }
      prepareInsStorerequestbl(data)
      state.dialogTransfer = true
    }

    const deleteRow = (row) => {
      rowDelete = row
      state.confirm = true
    } 

    const sukses = () => {
      getData()
    }


    return {
      ...toRefs(state),
      tableHeaders,
      addData,
      insertOther,
      outgoingStock,
      editItem,
      deleteRow,
      select1,
      onSearch,
      close,
      select,
      sukses,
      pagination: {
        rowsPerPage: 0,
      },
    };
  },
  components: {
    searchIncoming: () => import('./components/SearchStoreRequisition.vue'),
    dialogTypeStoreRequisition: () =>
      import('./components/DialogTypeStoreRequisition.vue'),
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
