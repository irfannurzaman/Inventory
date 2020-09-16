<template>
  <q-dialog v-model="dialogModel">
    <q-card style="width: 1000px; max-width: 90vw; height: 500px">
      <q-toolbar>
        <q-toolbar-title class="text-white text-weight-medium">New</q-toolbar-title>
      </q-toolbar>
      <!-- <q-form @submit="inputan"> -->
      <q-card-section style="height: auto;">
          <SInput class="inputName" label-text="Name" v-model="inputName" />
        <q-splitter v-model="splitterModel" style="height: 300px;">
          <template v-slot:before>
            <q-tabs v-model="tab" vertical active-color="primary" indicator-color="primary">
              <q-tab name="category" label="Category" />
              <q-tab name="UnitPrice" label="Unit & Price" />
              <q-tab name="Additional" label="Additional Info" />
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
              <q-tab-panel style="margintop: -10px;" name="category">
                <SSelect
                  label-text="Main Group"
                  :options="subMain.main"
                  v-model="subMain.mains"
                  style="width: 200px;"
                  @input="clickMainGrup"
                />
                <SSelect
                  label-text="Sub Group"
                  :options="subGroup.sub"
                  v-model="subGroup.subs"
                  style="width: 200px;"
                  @input="clickSubGroup"
                />
                <div class="articel-number">
                  <span>{{ totalBudget }}</span>
                  <span>0</span>
                </div>
                <q-btn-toggle
                  v-model="model"
                  class="buttonToggle"
                  toggle-color="primary"
                  :options="[
                    { label: 'No', value: 'no' },
                    { label: 'Yes', value: 'yes' },
                  ]"
                />
              </q-tab-panel>

              <q-tab-panel name="UnitPrice" style="marginTop: -20px">
                <div class="q-gutter-md row items-start">
                  <SInput
                    style="width: 150px;"
                    label-text="Delivery Unit"
                    v-model="unitPrice.DeliveryUnit"
                    unmasked-value
                    placeholder="Box"
                  />
                  <SInput
                    style="width: 150px;"
                    label-text="Mess Unit"
                    v-model="unitPrice.messUnit"
                    unmasked-value
                    placeholder="Kg"
                  />
                  <SInput
                    style="width: 150px;"
                    label-text="Recipe Unit"
                    v-model="unitPrice.recipeUnit"
                    unmasked-value
                    placeholder="Gram"
                  />
                  <SInput
                    style="width: 150px;"
                    label-text="Recipe Number"
                    v-model="modelRecipeNumber"
                    unmasked-value
                    @click.prevent="modalRecipe"
                  />
                </div>
                <div class="row">
                  <div class="col">
                    Unit Convertion
                    <SInput
                      style="width: 150px;"
                      label-text="Language.Delivery_unit_conv"
                      v-model="unitPrice.UnitConvertion1"
                      unmasked-value
                      placeholder="30"
                    />
                    <SInput
                      style="width: 150px;"
                      label-text="Language.Delivery_unit_conv"
                      v-model="unitPrice.UnitConvertion2"
                      unmasked-value
                      placeholder="100"
                    />
                  </div>
                  <div class="col">
                    Unit Price
                    <SInput
                      style="width: 150px;"
                      label-text="Actual Purchase Price"
                      v-model="unitPrice.unitPrice1"
                      unmasked-value
                    />
                    <SInput
                      style="width: 150px;"
                      label-text="Last Price"
                      v-model="unitPrice.unitPrice2"
                      unmasked-value
                    />
                    <SInput
                      style="width: 150px;"
                      label-text="Average Purchase Price"
                      v-model="unitPrice.unitPrice3"
                      unmasked-value
                    />
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="Additional">
                <SInput
                  style="width: 150px;"
                  label-text="Min Stock"
                  v-model="additional.minStock"
                  unmasked-value
                />
                <SInput
                  style="width: 150px;"
                  label-text="Max Stock"
                  v-model="additional.maxStock"
                  unmasked-value
                />
                <SInput
                  style="width: 150px;"
                  label-text="Account Number For Direct Issue Outgoing"
                  v-model="modelAccountNumber"
                  unmasked-value
                  @click.prevent="dialogAcountNumber"
                />
                <q-btn-toggle
                  v-model="model2"
                  style="buttonToggle"
                  toggle-color="primary"
                  :options="[
                    { label: 'No', value: 'no' },
                    { label: 'Yes', value: 'yes' },
                  ]"
                />
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn @click="saveData" flat label="OK" v-close-popup />
      </q-card-actions>
      <!-- </q-form> -->
    </q-card>
    <ModalRecipeNumber :dialog="dialogArticel" @onDialog="onDialog1" @onRowRecipe="onRowRecipe" />
    <dialogAcountNumber :dialog="dialogAcount" @onDialog="onDialog2" @onRowAccount="onRowAccount" />
  </q-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  computed,
  reactive,
  toRefs,
  watch,
} from '@vue/composition-api';
import { mapGroup } from '~/app/helpers/mapSelectItems.helpers';
interface State {
  isLoading: boolean;
  totalBudget: number;
  columns: { month: string; actual: string; budget: string }[];
  splitterModel: number;
  model: any;
  model2: any;
  tab: string;
  subMain: any;
  subGroup: any;
  article: any;
  dialogArticel: boolean;
  dialogAcount: boolean;
  modelRecipeNumber: any;
  modelAccountNumber: any;
  inputName: any;
  unitPrice: any;
  additional: any;
}
export default defineComponent({
  props: {
    dialog: { type: Boolean, required: true },
    selected: { type: [String, Number, Object], required: true },
    accountId: { type: Object, required: true },
    getAccountnumber: { type: Object, required: true },
  },

  setup(props, { emit, root: { $api } }) {
    const state = reactive<State>({
      isLoading: false,
      splitterModel: 20,
      totalBudget: 0,
      columns: [],
      model: 'no',
      model2: 'no',
      tab: 'category',
      modelRecipeNumber: '',
      modelAccountNumber: '',
      subMain: {
        main: '',
        mains: '',
      },
      subGroup: {
        sub: '',
        subs: '',
      },

      unitPrice: {
        DeliveryUnit: '',
        messUnit: '',
        recipeUnit: '',
        UnitConvertion1: '',
        UnitConvertion2: '',
        unitPrice1: '',
        unitPrice2: '',
        unitPrice3: '',
      },
      additional: {
        minStock: '',
        maxStock: '',
      },
      article: '',
      dialogArticel: false,
      dialogAcount: false,
      inputName: '',
    });
    const dialogModel = computed({
      get: () => props.dialog,
      set: (val) => {
        emit('onDialog', val);
      },
    });

    onMounted(async () => {
      const dataGrop = await Promise.all([
        $api.inventory.apiStockItem('getInvMainGroup'),
      ]);

      state.subMain.main = mapGroup(
        dataGrop[0].tLHauptgrp['t-l-hauptgrp'],
        'bezeich',
        'endkum'
      );
    });

    const GET_DATA = async (val) => {
      const GET_DATA = await Promise.all([
        $api.inventory.apiStockItem('chgInvArticlePrepare', {
          artnr: props.getAccountnumber,
          changed: 'no',
        }),
      ]);
      state.inputName = GET_DATA[0].lArt['l-art'][0].bezeich;
      state.subMain.mains = GET_DATA[0].endBezeich;
      state.subGroup.subs = GET_DATA[0].zwBezeich;
      state.totalBudget = GET_DATA[0].lArt['l-art'][0].artnr;
      state.unitPrice.DeliveryUnit = GET_DATA[0].lArt['l-art'][0].traubensorte;
      state.unitPrice.messUnit = GET_DATA[0].lArt['l-art'][0].masseinheit;
      state.unitPrice.recipeUnit = GET_DATA[0].sUnit;
      state.modelRecipeNumber = '000,000';
      //
      state.unitPrice.unitPrice1 = GET_DATA[0].lArt['l-art'][0]['ek-aktuell'];
      state.unitPrice.unitPrice2 = GET_DATA[0].lArt['l-art'][0]['ek-letzter'];
      state.unitPrice.unitPrice3 = GET_DATA[0].lArt['l-art'][0]['vk-preis'];
    };

    watch(
      () => props.accountId,
      (accountId, prev) => {
        if (accountId && accountId !== prev) {
          GET_DATA(accountId);
        }
      }
    );

    function clickMainGrup() {
      async function asyncCall() {
        const dataSub = await Promise.all([
          $api.inventory.apiStockItem('getInvSubGroup', {
            mainNr: state.subMain.mains.value,
          }),
        ]);

        state.subGroup.sub = mapGroup(
          dataSub[0].szwkumList['szwkum-list'],
          'bezeich',
          'zwkum'
        );
      }
      asyncCall();
    }

    function clickSubGroup() {
      async function asyncCall() {
        const dataArticle = await Promise.all([
          $api.inventory.apiStockItem('getInvArtNo', {
            pvILanguage: 1, // buat default value = 1
            caseType: 2, // buat default value = 2
            inpInt: state.subGroup.subs.value, // zwkum - SUB GROUP
            inpInt2: state.subMain.mains.value, // endkum - MAIN GROUP
            inpChar: ' ', // buat default value = “ ”
          }),
        ]);

        state.totalBudget = dataArticle[0].outInt;
      }
      asyncCall();
    }

    function saveData() {
      async function saveData() {
        const saveData = await Promise.all([
          $api.inventory.apiStockItem('addInvArticle', {
            artnr: state.totalBudget.toString(),
            bezAend: state.model,
            dmlArt: state.model2,
            fibukonto: state.modelAccountNumber,
            pvILanguage: 1,
            sUnit: state.unitPrice.recipeUnit,
            lArt: {
              'l-art': [
                {
                  alkoholgrad: undefined,
                  anzverbrauch: state.additional.maxStock,
                  artnr: state.totalBudget.toString(),
                  betriebsnr: state.modelRecipeNumber,
                  bezeich: state.inputName,
                  'ek-aktuell': state.unitPrice.unitPrice1,
                  'ek-letzter': state.unitPrice.unitPrice2,
                  endkum: state.subMain.mains.value,
                  fibukonto: state.modelAccountNumber,
                  inhalt: state.unitPrice.UnitConvertion2,
                  jahrgang: state.model == 'no' ? '0' : '1',
                  'lief-artnr[1]': '?',
                  'lief-artnr[2]': '?',
                  'lief-artnr[3]': '?',
                  'lief-einheit': state.unitPrice.UnitConvertion1,
                  'lief-nr1': '?',
                  'lief-nr2': '?',
                  'lief-nr3': '?',
                  masseinheit: state.unitPrice.messUnit,
                  'min-bestand': state.additional.minStock,
                  traubensorte: state.unitPrice.DeliveryUnit,
                  'vk-preis': state.unitPrice.unitPrice3,
                  'wert-verbrau': '0',
                  zwkum: state.subGroup.subs.value,
                },
              ],
            },
            ttArtnr: {
              'tt-artnr': [],
            },
            ttContent: {
              'tt-content': [],
            },
          }),
        ]);
      }
      saveData();
    }

    function onRowRecipe(row) {
      state.modelRecipeNumber = row.kategorie;
    }

    function onRowAccount(row) {
      state.modelAccountNumber = row.fibukonto;
    }
    function modalRecipe() {
      state.dialogArticel = true;
    }
    function dialogAcountNumber() {
      state.dialogAcount = true;
    }

    const onDialog1 = (val) => {
      state.dialogArticel = val;
    };

    const onDialog2 = (val) => {
      state.dialogAcount = val;
    };

    return {
      onDialog1,
      saveData,
      onDialog2,
      dialogModel,
      onRowRecipe,
      onRowAccount,
      clickMainGrup,
      clickSubGroup,
      modalRecipe,
      dialogAcountNumber,
      ...toRefs(state),
      pagination: { page: 1, rowsPerPage: 0 },
    };
  },

  components: {
    ModalRecipeNumber: () => import('./ModalRecipeNumber.vue'),
    dialogAcountNumber: () => import('./DialogAcountNumber.vue'),
  },
});
</script>

<style lang="scss" scoped>
.q-toolbar {
  background: $primary-grad;
}

.buttonToggle {
  margin-top: 15px;
}

.inputName {
  width: 500px;
  margin-left: 217px;
}
.articel-number {
  border-radius: 4px;
  border: 1px solid $primary;
  width: 200px;
  span {
    display: inline-block;
    padding: 3px 25px;

    &:first-child {
      border-right: 1px solid $primary;
    }

    &:last-child {
      flex: 1;
      text-align: right;
    }
  }
}

.UnitConvertion {
  border-radius: 4px;
  border: 1px solid $primary;
  width: 200px;
  span {
    display: inline-block;
    padding: 3px 25px;

    &:first-child {
      border-right: 1px solid $primary;
    }

    &:last-child {
      flex: 1;
      text-align: right;
    }
  }
}
</style>
