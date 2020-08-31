<template>
  <div>
    <div>
      <q-dialog seamless v-model="dialog">
        <q-card style="width: 500px;">
          <q-toolbar>
            <q-toolbar-title class="text-white text-weight-medium">Type Of Store Requisition</q-toolbar-title>
          </q-toolbar>
          <q-card-section>
            <div class="actualQuantity">Actual Quantity</div>
            <div class="q-pa-md">
              <q-option-group
                size="xs"
                :options="options"
                label="Notifications"
                type="radio"
                v-model="group"
              />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn @click="close1" label="Cancel" />
            <q-btn @click="select" color="primary" label="Select" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div>
      <q-dialog seamless v-model="dialogTransfer" :position="position">
        <q-card style="width: 820px; max-width: 90vw;">
          <q-toolbar>
            <q-toolbar-title class="text-white text-weight-medium">Inter Store Transfer</q-toolbar-title>
          </q-toolbar>
          <q-card-section>
            <div class="row">
              <SInput
                style="margin-right: 10px; width: 180px;"
                label-text="Delivery Number"
                v-model="deliveryNumber"
                disable
                unelevated
              />
              <SSelect
                style="margin-right: 10px; width: 180px;"
                label-text="From Store"
                :options="header.fromStore"
                v-model="header.fromStore1"
                :disable="disable"
              />
              <SSelect
                v-if="group == '1'"
                style="margin-right: 10px; width: 180px;"
                label-text="To Store"
                :options="header.toStore1"
                v-model="header.toStore"
                :disable="disable"
              />
              <SInput
                v-else
                style="margin-right: 10px; width: 180px;"
                label-text="Account"
                @click.prevent="clickAccount"
                v-model="header.account"
                :disable="disable"
              />
              <SInput
                style="margin-right: 10px; width: 180px;"
                label-text="Total Amount"
                v-model="header.totalAmount"
                disable
              />
            </div>
            <div>
              <q-splitter v-model="splitterModel">
                <template v-slot:before>
                  <q-tabs v-model="tab" vertical active-color="primary" indicator-color="primary">
                    <q-tab name="mails" label="Header" />
                    <q-tab name="alarms" label="item" />
                  </q-tabs>
                </template>

                <template v-slot:after>
                  <q-tab-panels
                    v-model="tab"
                    animated
                    swipeable
                    vertical
                    transition-prev="jump-up"
                    transition-next="jump-up"
                  >
                    <q-tab-panel name="mails" style="height: 380px">
                      <div class="row">
                        <SSelect
                          style="margin-right: 20px; width: 300px;"
                          label-text="Department"
                          v-model="header.department1"
                          :options="header.department"
                          :disable="disable"
                        />
                        <q-checkbox v-if="keyApprove == 'approve'" top-label label="Approve" v-model="valApprove" />
                      </div>
                      <v-date-picker v-model="dataDate" :popover="{ visibility: 'click' }">
                        <SInput
                          style="width: 300px;"
                          label-text="Date"
                          slot-scope="{ inputProps }"
                          placeholder="Select Date"
                          readonly
                          v-bind="inputProps"
                          clearable
                          :disable="disable"
                        ></SInput>
                      </v-date-picker>
                    </q-tab-panel>

                    <q-tab-panel name="alarms">
                      <div style="margintop: -20px;" class="row">
                        <div class="col">
                          <SInput
                            style="margin-right: 20px; width: 200px; margin-top: -20px"
                            label-text="Stock Articel Name"
                            v-model="header.articelNumber"
                            @click.prevent="clickArticelNumber"
                            :disable="disable"
                          />
                          <SInput
                            style="
                              margin-right: 10px;
                              width: 200px;
                              margintop: -15px;
                            "
                            label-text="Unit And Content Per Unit"
                            v-model="header.unitAndContent"
                            disable
                          />
                          <SInput
                            style="
                              margin-right: 10px;
                              width: 200px;
                              margintop: -15px;
                            "
                            label-text="Stock Onhand"
                            v-model="stockOnhand"
                            disable
                          />
                          <SInput
                            unelevated
                            style="
                              margin-right: 10px;
                              width: 200px;
                              margintop: -10px;
                            "
                            label-text="Quantity Mess Unit"
                            v-model="quantityMessUnit"
                            :disable="disable"
                          />
                          <SInput
                            style="
                              margin-right: 10px;
                              width: 200px;
                              margintop: -15px;
                            "
                            label-text="Price"
                            v-model="dataPrice"
                            disable
                          />
                          <SInput
                            style="
                              margin-right: 10px;
                              width: 200px;
                              margintop: -15px;
                            "
                            label-text="Amount"
                            v-model="dataAmount"
                            disable
                          />
                          <q-btn
                            style="width: 200px; margintop: -5px; height: 25px;"
                            dense
                            max-height="10"
                            color="primary"
                            label="Add"
                            @click="clickAdd"
                          />
                        </div>
                        <div class="col" id="table-store-requisition">
                          <STable
                            :loading="isFetching"
                            :columns="tableDialog"
                            :data="dataTableStore"
                            :rows-per-page-options="[0]"
                            :pagination.sync="pagination"
                            hide-bottom
                            class="table-accounting-date2"
                            :style="heightTableStoreTransfer"
                            @row-click="onRowClick"
                            v-if="tableData == true"
                          >
                          <template v-slot:body="props">
                            <q-tr :props="props">
                              <q-td key="storageNumber" :props="props">{{ props.row.storageNumber }}</q-td>
                              <q-td key="articelNumber" :props="props">{{ props.row.articelNumber }}</q-td>
                              <q-td key="des" :props="props">{{ props.row.des }}</q-td>
                              <q-td key="unitPrice" :props="props">{{ props.row.unitPrice }}</q-td>
                              <q-td key="onhand" :props="props">{{ props.row.onhand }}</q-td>
                                <q-td key="quantity" @click="rowEditQty(props.row)" v-if="props.row.selection == false">
                                {{ props.row.quantity }}
                                </q-td>
                                <q-input v-else @blur="props.row['selection'] = false"
                                  v-model="props.row.quantity"
                                  borderless
                                  v-on:keyup.enter="validateQty(props.row)"
                                />
                              <q-td key="amount" :props="props">{{ props.row.amount }}</q-td>
                              <q-td key="date" :props="props">{{ props.row.date }}</q-td>
                              <q-td key="type" :props="props">{{ props.row.type }}</q-td>
                              <q-td key="sUsername" :props="props">{{ props.row.sUsername }}</q-td>
                              <q-td key="datum" :props="props">{{ props.row.datum }}</q-td>
                              <q-td key="time" :props="props">{{ props.row.time }}</q-td>
                              <q-td key="acctNo" :props="props">{{ props.row.acctNo }}</q-td>
                            </q-tr>
                          </template>
                          </STable>
                          <STable
                            :loading="isFetching"
                            :columns="tableDialog"
                            :data="dataTableStore"
                            :rows-per-page-options="[0]"
                            :pagination.sync="pagination"
                            hide-bottom
                            class="table-accounting-date2"
                            :style="heightTableStoreTransfer"
                            @row-click="onRowClick"
                            v-else
                          />
                        </div>
                      </div>
                    </q-tab-panel>
                  </q-tab-panels>
                </template>
              </q-splitter>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn @click="close" label="Cancel" />
            <q-btn :loading="loading1" @click="select1" color="primary" label="Select" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div>
      <q-dialog seamless v-model="selectStockArticel">
        <q-card style="width: 800px; max-width: 90vw;">
          <q-toolbar>
            <q-toolbar-title class="text-white text-weight-medium">Select Stock Articel</q-toolbar-title>
          </q-toolbar>
          <q-card-section style="height: 300px; max-height: 50vh;">
            <div class="row">
              <div class="col-2" id="select-articel-input">
                <SInput v-model="inputselectStockArticel" />
                <q-option-group
                  size="xs"
                  v-model="groupStockArticel"
                  :options="optionsStockArticel"
                  color="primary"
                />
              </div>
              <q-separator vertical />
              <div id="select-articel-table" class="col-9">
                <STable
                  :loading="isFetching"
                  :columns="tableDialogStockArticel"
                  :data="dataStockArticel"
                  :rows-per-page-options="[0]"
                  :pagination.sync="pagination"
                  hide-bottom
                  class="table-accounting-date"
                  :style="heightSelectStockArticel"
                >
                  <template v-slot:body="props">
                    <q-tr :props="props" :class="(props.row.selected)?'bg-blue-grey-2 text-black':'bg-white text-black'">
                      <q-td
                        v-for="col in props.cols"
                        :key="col.name"
                        :props="props"
                        @click="onRowClicktableStockArticel(props.row)">
                          {{ col.value }}
                      </q-td>
                    </q-tr>
                  </template>
                </STable>
              </div>
            </div>
          </q-card-section>

          <q-separator />
          <q-card-actions align="right">
            <q-btn flat label="Cancel" @click="selectStockArticel = false" />
            <q-btn flat label="Ok" color="primary" @click="onClickStockArticel" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div>
      <q-dialog seamless v-model="dialogAccount">
        <q-card style="width: 800px; max-width: 90vw;">
          <q-toolbar>
            <q-toolbar-title class="text-white text-weight-medium">Select Cost Allocations</q-toolbar-title>
          </q-toolbar>
          <q-card-section style="height: 300px; max-height: 50vh;">
            <div class="row">
              <div class="col-2" id="right-cost-alecations">
                <q-option-group
                  size="xs"
                  v-model="groupAlecations"
                  :options="optionsAlecations"
                  color="primary"
                />
              </div>
              <div class="col-3" id="right-cost-alecations">
                <STable
                  :loading="isFetching"
                  :columns="tableCostCenterList"
                  :data="dataCostCenterList"
                  :rows-per-page-options="[0]"
                  :pagination.sync="pagination"
                  :style="heightCostAllecations"
                  hide-bottom
                  class="table-accounting-date"
                >
                <template v-slot:body="props">
                    <q-tr :props="props" :class="(props.row.selected)?'bg-blue-grey-2 text-black':'bg-white text-black'">
                      <q-td
                        v-for="col in props.cols"
                        :key="col.name"
                        :props="props"
                        @click="clickCostAllecations(props.row)">
                          {{ col.value }}
                      </q-td>
                    </q-tr>
                  </template>
                </STable>
              </div>
              <div class="col">
                <STable
                  :loading="isFetching"
                  :columns="tableAllocationsList"
                  :data="dataAllocationsList"
                  :rows-per-page-options="[0]"
                  :pagination.sync="pagination"
                  :style="heightAllocationsList"
                  hide-bottom
                  class="table-accounting-date"
                >
                  <template v-slot:body="props">
                    <q-tr :props="props" :class="(props.row.selected)?'bg-blue-grey-2 text-black':'bg-white text-black'">
                      <q-td
                        v-for="col in props.cols"
                        :key="col.name"
                        :props="props"
                        @click="clickCostAllecations2(props.row)">
                          {{ col.value }}
                      </q-td>
                    </q-tr>
                  </template>
                </STable>
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn flat label="Cancel" @click="dialogAccount = false" />
            <q-btn flat label="Ok" color="primary" @click="accountDialog()" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  onMounted,
  toRefs,
  watch,
} from '@vue/composition-api';
import { setupCalendar, DatePicker } from 'v-calendar';
import {
  tableDialogNew,
  tableDialogStockArticel,
  tableCostCenterList,
  tableAllocationsList,
} from '../tables/storeRequisition';
import { mapGroup } from '~/app/helpers/mapSelectItems.helpers';
import { formatterMoney } from '~/app/helpers/formatterMoney.helper'
import { Notify, date } from 'quasar';
import { type } from 'os';
setupCalendar({
  firstDayOfWeek: 2,
});

let headerAcoount, dataAlecations

export default defineComponent({
  props: {
    dialog: { type: Boolean, required: true },
    dialogTransfer: { type: Boolean, required: true },
    searches: { type: Array, required: true },
    keyApprove: {type: String, required: true },
    editKey: {type: String, required: true },
    insertData: {type: Object, required: true },
    editData: {type: Object, required: true }
  },
  components: {
    'v-date-picker': DatePicker,
  },
  setup(props, { emit, root: { $api } }) {
    let approve
    const state = reactive({
      dataDate: null as any,
      options: [
        { label: 'Transfer To Other Storage', value: '1' },
        { label: 'Outgoing / Consumed', value: '2', color: 'bat' },
      ],
      group: '1',
      groupStockArticel: '1',
      optionsStockArticel: [
        {
          label: 'Number',
          value: '1',
        },
        {
          label: 'Description',
          value: '2',
        },
      ],
      groupAlecations: '1',
      optionsAlecations: [
        {
          label: 'acctNo',
          value: '1',
        },
        {
          label: 'Description',
          value: '2',
        },
      ],
      pagination: {
        rowsPerPage: 0,
      },
      tab: 'mails',
      tab2: 'mails',
      splitterModel: 20,
      valApprove: false,
      header: {
        department: [],
        fromStore: [],
        fromStore1: '',
        toStore1: [],
        toStore: '',
        department1: '',
        articelNumber: '',
        unitAndContent: '',
        account: '',
        totalAmount: ''
      },
      position: 'top',
      transdate: '',
      deliveryNumber: null,
      selectStockArticel: false,
      stockOnhand: '',
      quantityMessUnit: '',
      dataStockArticel: [] as any,
      dataTableStore: [] as any,
      inputselectStockArticel: '',
      dataPrice: '',
      dataAmount: '',
      bilanganPrice: 0,
      heightSelectStockArticel: '',
      heightTableStoreTransfer: '',
      dialogAccount: false,
      dataCostCenterList: [] as any,
      dataAllocationsList: [] as any,
      heightCostAllecations: '',
      heightAllocationsList: '',
      loading1: false,
      dataRowStockArticel: null as any,
      disable: false,
      tableDialog: [] as any,
      tableData : false as any
    });

    // Helper 
    const helperData = (val) => {
      approve = val.opList['op-list'][0]
        
        state.deliveryNumber = val.lscheinnr;
        state.header.fromStore1 = `${val.currLager}-${val.lagerBezeich}`;
        state.header.toStore = `${val.currPos}-${val.lagerBez1}`;
        state.header.department1 = `${val.deptNo}-${val.deptname}`;
        state.header.totalAmount = formatterMoney(val.tAmount)
        state.dataDate = new Date(date.formatDate(val.opList['op-list'][0].datum, 'YYYY, MM, DD'))
        state.dataTableStore = val.opList['op-list'].map((items) => ({
          storageNumber: `0${items['lager-nr']}`,
          articelNumber: items.artnr,
          des: items.bezeich,
          unitPrice: formatterMoney(items.einzelpreis),
          onhand: `${items.onhand}00`,
          quantity: `${items.anzahl}00`,
          amount: formatterMoney(items.warenwert),
          date: items.datum,
          type: items.stornogrund !== '' ? 'Outgoing' : 'TranfersOut',
          sUsername: items.username,
          time: '',
          acctNo: items.fibu10,
          selection: false
        }))
        
    }
    const deleteData = () => {
        state.deliveryNumber = null;
        state.header.fromStore1 = '';
        state.header.toStore = '';
        state.header.department1 = '';
        state.header.totalAmount = ''
        state.dataDate = null;
        state.header.articelNumber = '';
        state.header.unitAndContent = '';
        state.stockOnhand = '';
        state.quantityMessUnit = '';
        state.dataPrice = '';
        state.dataAmount = '';
        state.dataTableStore = []
        state.header.account = '' 
    }


    const notyfyCreate = (mess, col) => {
      return Notify.create({
              message: mess,
              color: col,
            });
    }


    // function

    const GET_TRANSCODE = async () => {
      let data = [];
      const [GET_DATA, GET_DATA2, GET_DATA3] = await Promise.all([
        $api.inventory.FetchAPIINV('storeRequestInitDisp'),
        $api.inventory.FetchAPIINV('storeRequestNewLscheinnr', {
          lscheinnr: `R${state.transdate
            .substring(2)
            .replace('-', '')
            .replace('-', '')}001`,
          s: `R${state.transdate
            .substring(2)
            .replace('-', '')
            .replace('-', '')}`,
          recidLOphdr: data['recidLOphdr'],
        }),
        $api.inventory.FetchCommon('getHelpInvArticle', {
          currLager: state.tab2 == 'mails' ?
          state.header.fromStore1['value'] :
          state.header.fromStore1.substr(0,state.header.fromStore1.indexOf('-')),
          recipe: false,
          sorttype: '0',
          sArtnr: '0',
          sBezeich: ' ',
        }),
      ]);
      data = GET_DATA;
      if (state.tab2 == 'mails'){
        state.deliveryNumber =  GET_DATA2.lscheinnr;
      }
      state.dataStockArticel = GET_DATA3.sartnrList['sartnr-list'].map(
        (items, index) => ({
          artnr: items.artnr,
          bezeich: items.bezeich,
          onhand: items['anz-anf-best'] + items['anz-eingang'] - items['anz-ausgang'],
          selected: false
        })
      );

    if (state.dataStockArticel.length < 8) {
      state.heightSelectStockArticel = 'auto';
    } else {
      state.heightSelectStockArticel = 'height: 250px';
    }
    };


    const apiSaveData = async (
    dataTable : any,
    fromStore : any,
    valApprove : any
    ) => {
      let onhand, artNr, qty, hasil
      for(const i in dataTable){
        artNr = dataTable[i].articelNumber
        onhand = dataTable[i].onhand
        qty = dataTable[i].quantity
        if (parseInt(qty) > parseInt(onhand) || qty == '0') {
          hasil = parseInt(qty)
        }
      }
      const [GET_DATA] = await Promise.all([
        $api.inventory.FetchAPIINV('storeRequestCheckQty',{
          opList : {
            "op-list": [{
              artnr: artNr,
              anzahl: hasil,
              "lager-nr" : fromStore
              .substr(0,state.header.fromStore1.indexOf('.'))
            }]
          }
        })
      ])
      if(GET_DATA.itsOk == 'false' || hasil == 0) {
        setTimeout(() => {
          notyfyCreate(
            'Wrong quantity: 3309026 Bin Card Inputted quantity = 101 - Stock onhand = 100 POSTING NOT POSSIBLE',
            'red'
            )
          state.loading1 = false
        }, 1000)
      } else {
        setTimeout(async() => {
          emit('select1', false);
          state.loading1 = false
          state.valApprove = false
          deleteData()
          const [GET_DATA] = await Promise.all([
            $api.inventory.FetchAPIINV('chgStoreRequestSaveData', {
              opList: {
                "op-list" : [{
                  anzahl0: approve.anzahl0,
                  anzahl: approve.anzahl,
                  warenwert: approve.warenwert,
                  fibu: '',
                  fibu10: '',
                  sRecid: approve['s-recid']
                }]
              },
              sRecid: approve['s-recid'],
              userInit: '01',
              tLschein: approve.lscheinnr,
              releaseFlag: true,
              transferred: true,
              showPrice: valApprove
            })
          ])

          if(GET_DATA.approved == 'true'){
            emit('sukses')
          }
      }, 2000)
      }
    }

    const costAlications = async () => {
        const [GET_DATA] = await Promise.all([
        $api.inventory.FetchCommon('selectCostDept1')
      ])

      const data = GET_DATA.allocList['alloc-list'].map((items) => ({
        bezeich: items.bezeich,
        fibu: items.fibu,
        name: items.name,
        ['rec-id']: items['rec-id'],
        selected: false
      }))

      state.dataAllocationsList = data.filter((items) => {
        return items.name.toString().includes(dataAlecations.num.toString())
      })
      if (state.dataAllocationsList.length < 9) {
        state.heightAllocationsList = 'auto'
      } else {
        state.heightAllocationsList = 'height: 270px'
      }
    }

    const apiSelect = async () => {
      const data = await Promise.all([
        $api.inventory.FetchAPIINV('storeRequestPrepare', {
          userInit: '01',
        }),
      ]);
      state.header.department = mapGroup(
        data[0].tParameters['t-parameters'],
        'vstring',
        'varname'
      );
      state.header.fromStore = mapGroup(
        data[0].tLLager['t-l-lager'],
        'bezeich',
        'lager-nr'
      );
      state.transdate = data[0].transdate;
      if (state.group == '1') {
        state.header.toStore1 = mapGroup(
          data[0].tLLager['t-l-lager'],
          'bezeich',
          'lager-nr'
        );
      } else {
        state.header.toStore1 = [];
      }
    };

    const apiClickStockArticel = async () => {
        state.header.articelNumber = state.dataRowStockArticel.artnr;
        state.header.unitAndContent = state.dataRowStockArticel.bezeich;
        const [GET_DATA, GET_DATA2] = await Promise.all([
            $api.inventory.FetchAPIINV('storeRequestStockOH', {
            currLager: state.tab2 == 'mails' ?
            state.header.fromStore1['value'] :
            state.header.fromStore1.substr(0,state.header.fromStore1.indexOf('.')),
            sArtnr: state.dataRowStockArticel.artnr,
          }),
          $api.inventory.FetchAPIINV('storeRequestPrepare', {
            userInit: '01',
          }),
        ]);
        if (state.header.articelNumber !== '' && state.header.unitAndContent !== '') {          
          state.stockOnhand = GET_DATA.stockOh;
          const [price] = GET_DATA2.tempLArtikel['temp-l-artikel'].filter(
            (items) => {
              return items.artnr
                .toString()
                .includes(state.header.articelNumber.toString());
            }
          );
            state.dataPrice = formatterMoney(price['vk-preis']);
            state.bilanganPrice = price;
        }
    }

    // lifecycle component


    onMounted(async () => {
      const [GET_DATA, GET_DATA2] = await Promise.all([
        $api.inventory.FetchCommon('selectCostDept1'),
        $api.inventory.FetchAPIINV('storeRequestChgPrepare',{
          userInit: "01"
        })
      ])
      state.dataCostCenterList = GET_DATA.costList['cost-list'].map((items) => ({
        name: items.name,
        num: items.num,
        ['rec-id'] : items['rec-id'],
        selected : false
      }))
      if (state.dataCostCenterList.length < 9 ) {      
        state.heightCostAllecations = 'auto'
      } else{
        state.heightCostAllecations = 'height: 270px'
      }

      if (GET_DATA2.showPrice == 'true') {
        state.tableDialog = tableDialogNew
        } else {
          state.tableDialog = tableDialogNew.filter((col : any) => ![
            'amount',
            'unitPrice'].includes(col.field))
      }
    })


    watch(
      () => state.quantityMessUnit,
      (quantityMessUnit, prev) => {
        if (quantityMessUnit && quantityMessUnit !== prev) {
          if (quantityMessUnit == '0') {
            notyfyCreate('Wrong Quantity', 'red')
          } else if (quantityMessUnit <= state.stockOnhand) {
            if(state.bilanganPrice['vk-preis'].toString().includes('.') == true){
              console.log('sukses',formatterMoney(state.bilanganPrice['vk-preis']))
              const bilangan = state.bilanganPrice['vk-preis'].toString().substr(0,
                    state.bilanganPrice['vk-preis'].toString().lastIndexOf('.') + 3
                  ).replace('.', ''),
                  hasil = parseInt(bilangan) * parseInt(state.quantityMessUnit),
                  hasil2 = hasil.toString().split('').reverse()
                  hasil2.splice(2, 0, '.')
              const hasil3 = hasil2.reverse().join('')
              state.dataAmount = formatterMoney(hasil3);
            } else {
              const hasil = state.bilanganPrice['vk-preis'] * parseInt(state.quantityMessUnit)
              state.dataAmount = formatterMoney(hasil)
            }
          } else {
            notyfyCreate('Wrong Quantity', 'red')
          }
        }
        if (quantityMessUnit == '') {
          state.dataAmount = '';
        }
      }
    );

    watch(
      () => state.inputselectStockArticel,
      async (groupStockArticel, prev) => {
        if (groupStockArticel && groupStockArticel !== prev) {
          const [GET_DATA] = await Promise.all([
            $api.inventory.FetchCommon('getHelpInvArticle', {
              currLager: state.tab2 == 'mails' ?
              state.header.fromStore1['value'] :
              state.header.fromStore1.substr(0,state.header.fromStore1.indexOf('.')),
              recipe: false,
              sorttype: '0',
              sArtnr: '0',
              sBezeich: ' ',
            }),
          ]);
          const data = GET_DATA.sartnrList['sartnr-list'].map(
            (items, index) => ({
              artnr: items.artnr,
              bezeich: items.bezeich,
              onhand:
                items['anz-anf-best'] +
                items['anz-eingang'] -
                items['anz-ausgang'],
              selected: false
            })
          );
          state.dataStockArticel = data.filter((items: any) => {
            if (state.groupStockArticel == '2') {
              return items.bezeich
                .toLowerCase()
                .includes(state.inputselectStockArticel.toLowerCase());
            }
            if (state.groupStockArticel == '1') {
              return items.artnr
                .toString()
                .includes(state.inputselectStockArticel.toString());
            }
          });
          if (state.dataStockArticel.length < 8) {
            state.heightSelectStockArticel = 'auto';
          } else {
            state.heightSelectStockArticel = 'height: 250px';
          }
        }
      }
    );



    watch(() => state.valApprove,
        async (valApprove, prev) => {
          if(valApprove && valApprove !== prev){
            const [GET_DATA] = await Promise.all([
              $api.inventory.FetchCommon('checkPermission', {
                arrayNr: '41',
                expectedNr: '2',
                userInit: '01'
              })
            ])
            if (GET_DATA.zugriff == 'true') {
              state.valApprove = true
            } else {
              state.valApprove = false
              notyfyCreate('Sorry, No Access Right', 'red')
            }
          }
        })
    watch(() => props.editKey,
          (editKey, prev) => {
            if(editKey && editKey !== prev){
              if (editKey == '1') {
                state.group = '1'
              } else {
                state.group = '2'
              }
              apiSelect()
            }
          }
    )

    watch(() => props.insertData, 
          (insertData, prev) => {
            if(insertData && insertData !== prev){
              state.disable = false
              state.tableData = false
              state.tab = 'alarms'
              state.tab2 = 'alarms'
              helperData(insertData)
              state.dataStockArticel = []
              state.dataAllocationsList = []
            }
          }
    )
    watch(() => props.editData, 
          (editData, prev) => {
            if(editData && editData !== prev){
              state.tab = 'mails'
              state.tab2 = 'alarms'
              state.tableData = true
              state.disable = true
              helperData(editData)
              state.dataStockArticel = []
              state.dataAllocationsList = []
            }
          }
    )

    watch(() => props.dialog,
          (dialog, prev) => {
            if(dialog && dialog !== prev) {
              state.group = '1'
            }
          } 
    )

    watch(
      () => state.deliveryNumber,
      async (deliveryNumber, prev) => {
        if (deliveryNumber && deliveryNumber !== prev) {
          const [GET_DATA] = await Promise.all([
            $api.inventory.FetchAPIINV('storeRequestReturnLscheinnr', {
              lscheinnr: state.deliveryNumber,
            }),
          ]);
          if (GET_DATA.outputOkFlag == 'false') {
          notyfyCreate('Delivery Note already exists', 'red')
          }
        }
      }
    );

    watch(() => state.groupAlecations,
        async  (groupAlecations, prev) => {
            if (groupAlecations && groupAlecations !== prev) {
              if (groupAlecations == '1') {
                state.dataAllocationsList = state.dataAllocationsList.sort((a, b) => {
                  return parseInt(a.fibu) - parseInt(b.fibu)
                })
                } else {
                const dataAllocationsList = state.dataAllocationsList.sort((a, b) => {
                  if (a.bezeich.toUpperCase() < b.bezeich.toUpperCase()) {
                    return -1
                  }
                })
              }
            }
          }
    )

    watch(
      () => state.header.fromStore1,
      (fromStore1, prev) => {
        if (fromStore1 && fromStore1 !== prev) {
          GET_TRANSCODE();
        }
      }
    );


    // triger

      const clickArticelNumber = () => {
        GET_TRANSCODE()
        costAlications()
        state.selectStockArticel = true;
      };

      const onClickStockArticel = () => {
        state.selectStockArticel = false;
        apiClickStockArticel()
      };

      const clickAdd = async () => {
        const [GET_DATA] = await Promise.all([
          $api.inventory.FetchCommon('getBediener', {
            userNo: '',
            userInit: '01',
          }),
        ]);
        if (state.bilanganPrice['betriebsnr'] == 0) {
          const [getData] = await Promise.all([
            $api.inventory.FetchAPIINV('storeRequestCreateOpList1', {
              opListArtnr: state.header.articelNumber,
              opListFuellflag: GET_DATA.tBediener['t-bediener'][0]['nr'],
              opListStornogrund: '00000000000000000000',
              currLager: state.tab2 == 'mails' ?
              state.header.fromStore1['value'] :
              state.header.fromStore1.substr(0,state.header.fromStore1.indexOf('.')),
            }),
          ]);
          if (state.header.articelNumber !== '' && state.quantityMessUnit !== '') {
            state.dataTableStore.push({
              storageNumber: state.tab2 == 'mails' ?
              `0${state.header.fromStore1['value'].toString()}` :
              `0${state.header.fromStore1.substr(0,state.header.fromStore1.indexOf('.'))}`,
              sUsername: getData.sUsername,
              sBezeich: getData.sBezeich,
              articelNumber: state.header.articelNumber,
              unitPrice: state.dataPrice,
              onhand: `${getData.sOnhand}00`,
              quantity: `${state.quantityMessUnit}00`,
              amount: state.dataAmount,
              date: date.formatDate(state.dataDate, 'DD/MM/YY'),
              time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
              type: state.group == '1' ? 'Transfer Out' : 'Outgoing',
              acctNo: state.group == '1' ? '000000' : state.header.account,
            });
          }
          state.header.articelNumber = '',
          state.header.unitAndContent = '',
          state.stockOnhand = '',
          state.quantityMessUnit = '',
          state.dataPrice = '',
          state.dataAmount = '';
        }
  
        if (state.dataTableStore.length < 10) {
          state.heightTableStoreTransfer = '';
        } else {
          state.heightTableStoreTransfer = 'height: 325px;';
        }
        let hasilTotalAmount = 0
        for(const i in state.dataTableStore){
            hasilTotalAmount += parseInt(state.dataTableStore[i].amount
            .replace(/,/g,'').replace('.',''))
        }     
        const totalAmount1 = hasilTotalAmount.toString().split('').reverse()
        totalAmount1.splice(2, 0, '.')
        const totalAmount2 = totalAmount1.reverse().join('') 
        state.header.totalAmount = formatterMoney(totalAmount2)
        state.dataStockArticel = []      
      };

    const onRowClicktableStockArticel = (dataRow) => {
        for(const i in state.dataStockArticel){
          state.dataStockArticel[i]['selected'] = false
        }
        dataRow['selected'] = true;
        state.dataRowStockArticel = dataRow
    };

    const select = () => {
      state.tab = 'mails'
      state.tab2 = 'mails'
      state.tableData = false
      state.disable = false
      emit('select', false);
      state.dataStockArticel = []
      state.dataAllocationsList = []
      apiSelect(); 
    };

    const close = () => {
      Notify.create({
        message: state.dataTableStore.length !== 0 ? 
        'The created records are still in temporary buffer Do you really want to leave WITHOUT updating?'
        : 'Do you want to interrupt?',
          type: 'warning',
          color: 'white',
          position: 'center',
          timeout: 0,
          actions: [
          { label: 'No', color: 'black', handler: () => { /* ... */ } },
          { label: 'Yes', color: 'primary', handler: () => {
            emit('close', false)
            deleteData()
            state.valApprove = false
            }}
        ]
        });
    };

    const close1 = () => {
      emit('close', false)
    }
    const select1 = () => {
      state.loading1 = true
        apiSaveData(
          state.dataTableStore,
          state.header.fromStore1,
          state.valApprove
        )
    };
    const clickQuestion = () => {
      emit('close', false)
    }

    const clickAccount = () => {
      state.dialogAccount = true;
      if (state.header.account == '') {
        for(const i in state.dataCostCenterList){
          state.dataCostCenterList[i]['selected'] = false
        }
        for(const i in state.dataAllocationsList){
          state.dataAllocationsList[i]['selected'] = false
        }
      }
    };

    const clickCostAllecations = (val) => {
      for(const i in state.dataCostCenterList){
        state.dataCostCenterList[i]['selected'] = false
      }
      val['selected'] = true
      dataAlecations = val
      costAlications()
    }

    
    const clickCostAllecations2 = (val) => {
      for(const i in state.dataAllocationsList){
        state.dataAllocationsList[i]['selected'] = false
      }
      val['selected'] = true
      headerAcoount = val.fibu
    }

    const rowEditQty = (val) => {
      for(const i in state.dataTableStore){
        state.dataTableStore[i]['selection'] = false
      }
      val['selection'] = true
    }

    const accountDialog = () => {
      state.header.account = headerAcoount
      state.dialogAccount = false
    }

    const validateQty = (val) => {
      val['selection'] = false
    }

    return {
      accountDialog,
      clickQuestion,
      validateQty,
      clickAccount,
      clickAdd,
      onClickStockArticel,
      onRowClicktableStockArticel,
      clickArticelNumber,
      tableDialogStockArticel,
      select1,
      select,
      close,
      close1,
      tableCostCenterList,
      tableAllocationsList,
      clickCostAllecations,
      clickCostAllecations2,
      rowEditQty,
      ...toRefs(state),
      pagination: {
        rowsPerPage: 0,
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.q-toolbar {
  background: $primary-grad;
}
#select-articel-input {
  margin-right: 10px
}
#select-articel-table {
  margin-left: 20px
}
#table-store-requisition {
  margin-left: -100px
}
#right-cost-alecations {
  margin-right: 10px
}
.actualQuantity {
  margin-left: 28px;
}
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
::v-deep .table-accounting-date2 {
  max-height: 75vh;
  margin-left: -30px;
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
