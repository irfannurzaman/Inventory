<template>
  <div>
  <div class="column justify-between">
    <div class="col-7" style="height: 565px">
        <div class="row">
      <div style="marginLeft: 10px" class="col-4">
        <div class="q-pa-lg">
          <div class="row">
            <SInput
              :key="i.name"
              v-for="i in use_input"
              :label-text="i.name"
              :style="{width: i.width, marginTop: i.top, marginRight: i.right}"
              :disable="i.disable"
              v-modal="i.value"
            />
          </div>
        </div>
          <div class="q-pa-md">
            <q-input
              style="max-width: 375px"
              filled
              type="textarea"
            />
          </div>
      </div>
      <div style="marginLeft: -20px" class="col-8">
        <div class="q-pa-lg">
          <div class="row">
            <SInput
              :key="i.name"
              :label-text="i.name"
              v-for="i in use_input2"
              :style="{width: i.width, marginRight: i.right}"
              @click.prevent="dialogDeliveryNumber(i.onClick)"
              @blur="unitQuantity(i.blur)"
              :disable="i.disable"
            >
            <q-icon 
              v-if="i.icon"
              color="primary" 
              name="mdi-magnify" 
              style="
              font-size: 20px; 
              marginRight: -10px; 
              backroundColor: red; 
              marginTop: 3px"/>
            </SInput>
            <q-btn
              size="sm"
              color="primary"
              max-height="10"
              label="Return"
              style="width: 80px; marginTop: 25px; height: 25px;"
              @click="Clickreturn"
              :disable="typeDisable"
            />
          </div>
          <q-card-actions align="right">
              <span style="marginRight: 100px">
                Total Amount Return:
              </span>
              <span>
                1.000.000
              </span>
          </q-card-actions>
          <STable
            @row-click="onRowClick2"
            dense
            class="my-sticky-virtscroll-table"
            :columns="tableHeaders"
            :data="data"
            separator="cell"
            :rows-per-page-options="[0]"
            :pagination.sync="pagination"
            :hide-bottom="false"
            row-key="index"
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
      </div>
    </div>
    </div>
    <div class="col-1">
    <q-separator />
      <q-card-actions align="right">
         <q-btn
         size="sm"
          outline
          color="primary"
          label="Cancel"
          style="width: 100px; height: 25px; marginRight: 20px; marginTop: -4px"
        />
        <q-btn
         size="sm"
          color="primary"
          label="save"
          style="width: 100px; height: 25px; marginRight: 20px; marginTop: -4px"
          @click="saveReturn"
        />
      </q-card-actions>
  
    </div>
    </div>
    <div>
      <q-dialog v-model="dialogModel">
        <q-card style="width: 500px;">
            <q-toolbar>
                <q-toolbar-title 
                  class="text-white text-weight-medium">
                  Select Delivery Number
                </q-toolbar-title>
             </q-toolbar>
                <q-card-section>
                  <q-table
                    dense
                    class="my-sticky-virtscroll-table"
                    :columns="DeliveryNumber"
                    :data="dataDeliveryNumber"
                    separator="cell"
                    :rows-per-page-options="[0]"
                    :pagination.sync="pagination"
                    :virtual-scroll-sticky-size-start="48"
                    hide-bottom
                    @row-click="onRowClick"
                    row-key="index"
                  />
                </q-card-section>
                <q-separator />
                <q-card-actions align="right">
                  <q-btn size="sm" label="Cancel" style="height: 30px" color="primary" @click="onClickCencelDeliveryNumber"/>
                  <q-btn size="sm" unelevated color="primary" label="OK" style="height: 30px" @click="onClickDeliveryNumber" />
                </q-card-actions>
          </q-card>
      </q-dialog>
    </div>
    <div>
      <q-dialog v-model="modalReturn" persistent>
        <q-card style="min-width: 350px">
           <q-toolbar>
                <q-toolbar-title 
                  class="text-white text-weight-medium">
                  Stock Return
                </q-toolbar-title>
             </q-toolbar>
          <q-card-section>
            <div class="text-h8">Enter Cencel Reason</div>
          </q-card-section>
  
          <q-card-section class="q-pt-none">
            <q-input dense v-model="reasson" autofocus @keyup.enter="prompt = false" />
          </q-card-section>
  
          <q-card-actions align="right" class="text-primary">
            <q-btn size="sm" flat label="Cancel" v-close-popup />
            <q-btn size="sm" flat label="Ok" v-close-popup @click="enterCencelReason"/>
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
  watch
} from '@vue/composition-api';
import { Notify } from 'quasar';
import { tableHeaders, DeliveryNumber, use_input, use_input2 } from './tables/IncomingStock.tables';
export default defineComponent({
  setup(_, { root: { $api } }) {
    let charts;

    const state = reactive({
      isFetching: false,
      data: [],
      dataDeliveryNumber: [],
      searches: {
        departments: [],
        store: [],
      },
      checkPermission: false,
      prepare: {},
      dialogModel: false,
      storageNumber: '',
      deliveryNumber: '',
      documentNumber: '',
      itemSelected : '',
      deliveryUnit: '',
      tLOrderhdr: [],
      content: '',
      popUp: false,
      dataPopup: '',
      dataTable: [],
      modalReturn: false,
      DeliveryUnitQuantity: '',
      messUnitQuantity: '',
      typeDisable: true,
      reasson: ''
    });

    const FETCH_API = async (api, body) => {
      const GET_DATA = await $api.inventory.FetchAPIINV(api, body)
      console.log('sukses', GET_DATA)
    }

    onMounted(() => {
      FETCH_API('checkPermission', {
        arrayNr: '39',
        expectedNr: '2'
      })
    });


    watch(() => state.prepare, 
      async () => {
              const [GET_DATA] = await Promise.all([
                $api.inventory.apiStoredwithPO('poDeliverNote', {
                  docuNr: state.tLOrderhdr[0]['docu-nr']
                })
              ])
              state.dataDeliveryNumber = GET_DATA.delivernoteList['delivernote-list']  
        }
    )

    const dialogDeliveryNumber = () => {
      state.dialogModel = true
    }

    const onClickDeliveryNumber = async () => {
      state.dialogModel = false
      const [GET_DATA] = await Promise.all([
        $api.inventory.apiStoredwithPO('pchaseStockInReturnLscheinnr', {
          docuNr: state.documentNumber,
          lscheinnr: state.deliveryNumber
        })])
        if (GET_DATA.errCode == 1) {
          Notify.create({
          message: 'No such document number',
          color: 'red',
        })
        }
    }

    const onClickCencelDeliveryNumber = () => {
      state.dialogModel = false
      state.deliveryNumber = ''
      state.storageNumber = ''
    }
    
    const storageNumber = async (rowClick) => {
        const [GET_DATA] = await Promise.all([
          $api.inventory.apiStoredwithPO('pchaseStockInReturnSelectSchein', {
          lOrderhdrDocuNr: state.tLOrderhdr[0]['docu-nr'],
          lOrderhdrLiefNr: state.tLOrderhdr[0]['lief-nr'],
          docuNr: rowClick['docu-nr'],
          lscheinnr : rowClick.lscheinnr
        })])
        state.storageNumber = GET_DATA.currLager+"." +GET_DATA.lagerBezeich
        state.deliveryNumber = rowClick.lscheinnr
        state.documentNumber = rowClick['docu-nr']
    }

    const onRowClick = (e, rowClick) => {
        storageNumber(rowClick)  
      }
    
    const onRowClick2 = (p, val) => {
        if (state.deliveryNumber !== '') {
        state.typeDisable = false
        state.dataTable = val
        state.deliveryUnit = val['lief-fax'][2]
        state.itemSelected = val.artnr + ' - ' + val.bezeich
        }
      };


    const returnBarang = async () => {
        const [GET_DATA] = await Promise.all([
          $api.inventory.apiStoredCommon('getHTParam0', {
            casetype: 1,
            inpParam: 232
          })
        ])
        if (GET_DATA.flogical == "false") {
            state.modalReturn = true
        } else {
          Notify.create({
          message: 'Inventory is running, posting not possible',
          color: 'red',
        })
        }
    }
    const Clickreturn = () => {
      returnBarang()
    }

    const cencelReason = async () => {
     const closeDate = state.dataTable['endkum'] <= 2 ? state.prepare['p224'] : state.prepare['p221']
      const [GET_DATA, GET_DATA2] = await Promise.all([
        $api.inventory.apiStoredwithPO('pchaseStockInReturnQty', {
            transdate: state.prepare['p474'],
            closedate: closeDate,
            sArtnr: state.dataTable['artnr'],
            currLager: state.storageNumber.substring(0, state.storageNumber.indexOf('.')),
            qty: state.DeliveryUnitQuantity
        }),
        $api.inventory.apiStoredwithPO('pchaseStockInReturnSave', {
          lOrderRecId: state.tLOrderhdr[0]['rec-id'],
          sArtnr: state.dataTable['artnr'],
          docuNr: state.tLOrderhdr[0]['docu-nr'],
          exchgRate: state.prepare['exchgRate'],
          priceDecimal: state.prepare['priceDecimal'],
          liefNr: state.tLOrderhdr[0]['lief-nr'],
          currLager: state.storageNumber.substring(0, state.storageNumber.indexOf('.')),
          lscheinnr: state.deliveryNumber,
          fEndkum: state.prepare['fEndkum'],
          bEndkum: state.prepare['bEndkum'],
          mEndkum: state.prepare['mEndkum'],
          billdate: state.prepare['billdate'],
          fbClosedate: state.prepare['fbClosedate'],
          mClosedate: state.prepare['mClosedate'],
          reason: state.reasson,
          userInit: "01",
          qty: state.DeliveryUnitQuantity,
          price: state.DeliveryUnitQuantity,
          amount: state.dataTable['rechnungspreis'],
          tAmount: state.dataTable['warenwert']
        })
      ])
    }

    const unitQuantity = () => {
       if(state.dataTable['anzahl'] < state.DeliveryUnitQuantity) {
        state.popUp = true
        state.dataPopup = 'Wrong quantity'
         Notify.create({
          message: 'Wrong quantity',
          color: 'red',
         })
      }
    }

    const enterCencelReason = () => {
      cencelReason()
    }
    const saveData = async () => {
      const [GET_DATA, GET_DATA2] = await Promise.all([
        $api.inventory.apiStoredwithPO('pchaseStockInReturnUpdateAP', {
          docuNr: state.tLOrderhdr[0]['docu-nr'],
          tAmount: state.dataTable['rechnungspreis'],
          liefNr: state.tLOrderhdr[0]['lief-nr'],
          billdate: state.prepare['billdate'],
          lscheinnr: state.deliveryNumber,
          bedienerNr: "01"
        }),
        $api.inventory.apiStoredwithPO('pchaseStockInReturnReactiveOrder', {
          caseType: 0,
          docuNr: state.tLOrderhdr[0]['docu-nr']
        })
      ])
    }
    const saveReturn = () => {
      saveData()
    }
    return {
      ...toRefs(state),
      Clickreturn,
      enterCencelReason,
      use_input,
      use_input2,
      unitQuantity,
      tableHeaders,
      onClickDeliveryNumber,
      onClickCencelDeliveryNumber,
      onRowClick,
      onRowClick2,
      dialogDeliveryNumber,
      DeliveryNumber,
      saveReturn,
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
  max-height: 10px;
  height: 10px
  
}
::v-deep .table-accounting-date {
  max-height: 50vh;
  height: 500px;
  thead tr {
    th {
      position: sticky;
      z-index: 3;
    }

    &:first-child th {
      top: 0;
    }
  }
  #input {
    width: 20px;
  }
}
</style>
