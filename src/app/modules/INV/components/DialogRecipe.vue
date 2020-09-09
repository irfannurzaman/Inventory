<template>
  <q-dialog v-model="dialogRecipe.openDialog" persistent>
    <q-card style="width: 730px; max-width: 90vw;">
      <q-toolbar>
        <q-toolbar-title class="text-white text-weight-medium">Recipe</q-toolbar-title>
      </q-toolbar>
      <q-card-section style="height: auto; marginTop: -10px">
        <div class="row">
          <div class="col">
            <div class="row">
              <SSelect
              :key="col.label" 
              :label-text="col.label"
              @input="onValueChange"
              v-for="col in useInputModal.filter(cols => [
              'Category Number'].includes(cols.label))"
              :options="dialogRecipe.selectCatNo" 
              v-model="col.value"
              :style="{
                width: col.width, 
                marginRight: col.marginRight}"
              :disable="col.disable"
              />
              <SInput
              :key="col.label"
              v-for="col in useInputModal.filter(cols => ![ 
              'Category Number',
              'content', 'Quantity', 'Loss Factor', 
              'Recipe Cost', 'Articel Number'].includes(cols.label))"
              :style="{width: col.width, marginRight: col.marginRight}"
              :label-text="col.label"
              v-model="col.value"
              :disable="col.disable"
              />
              <SInput
              :key="col.label"
              v-for="col in useInputModal.filter(cols => [
              'Articel Number'].includes(cols.label))"
              :style="{width: col.width, marginRight: col.marginRight}"
              :label-text='col.label'
              @click="onClickAN"
              v-model="col.value"
              :disable="col.disable"
              />
              <SInput
              :key="col.label"
              v-for="col in useInputModal.filter(cols => [
              'content', 'Quantity', 'Loss Factor', 'Recipe Cost'].includes(cols.label))"
              :style="{width: col.width, marginRight: col.marginRight}"
              :label-text="col.label"
              v-model="col.value"
              :disable="col.disable"   
              />
            </div>
            <q-btn
              :style="{marginTop: '-7px', height: '25px', width: '330px'}"
              dense
              icon="mdi-plus"
              color="primary"
              max-height="10"
              label="ADD"
              @click="addDataRecipe"
              size="sm"
            />
          </div>
          <div class="col">
           <STable
           :loading="isLoading"
           :columns="tableDialogRecipe"
           :data="data"
           :rows-per-page-options="[0]"
           :pagination.sync="pagination"
           :hide-bottom="hide_bottom"
           class="table-accounting-date"
           >
            <template #header-cell-fibukonto="props">
              <q-th :props="props" class="fixed-col left">{{ props.col.label }}</q-th>
            </template>

            <template #body-cell-fibukonto="props">
              <q-td :props="props" class="fixed-col left">{{ props.row.fibukonto }}</q-td>
            </template>
    
            <template #header-cell-actions="props">
              <q-th style="z-index : 4" :props="props" class="fixed-col right">{{ props.col.label }}</q-th>
            </template>
    
            <template #body-cell-actions="props">
              <q-td :props="props" class="fixed-col right">
                <q-icon name="mdi-dots-vertical" size="16px">
                  <q-menu auto-close anchor="bottom right" self="top right">
                    <q-list>
                      <q-item clickable v-ripple @click="deleteDataTable(props.row)">
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
      </q-card-section>
      <q-separator />
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn v-close-popup color="primary" flat label="Cancel" />
        <q-btn color="primary" @click="onSaveData" label="OK" />
      </q-card-actions>
    </q-card>
    <DialogChildRecip 
    :dialogChildRecipe="dialogChildRecipe" 
    @onClickDataAN="onClickDataAN"
    />
  </q-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  computed,
  reactive,
  watch,
  toRefs,
} from '@vue/composition-api';
import {
  tableDialogRecipe,
  stockArticle,
  Recipe,
  useInputModal
} from '../tables/recipe.table';
import {Notify} from 'quasar'
import { Console } from 'console';
export default defineComponent({
  props: {
    dialogRecipe: { type: Object, required: true },
  },

  setup(props, { emit, root: { $api } }) {
    let articelNumber, resultRecipt, groupRecipe
    const state = reactive({
      isLoading: false,
      hide_bottom: false,
      data: [],
      dialogChildRecipe: {
        openModalChild: false,
        dataChildRecipe: [] as any
      },
    });

    const NotifyCreate = (mess, col?) => Notify
      .create({
          message: mess,
          color: col,
          group: false
    });

    // FETCH API

    const FETCH_API = async (api, body) => {
      const GET_DATA = await $api.inventory.FetchAPIINV(api, body)
        console.log('sukses12', api)
        console.log('sukses13', body)
        console.log('sukses14', GET_DATA)
      switch (api) {
        case 'addRecipeCreateRezlin':
          state.data.push(GET_DATA.sRezlin['s-rezlin'][0])
          state.hide_bottom = true
          break;
        default:
          break;
      }
    }

    const filterDataUseInput = (value) => {
      for(const i in useInputModal.filter(items => [
        'Category Number', 'Category Name',
        'Recipe Number', 'Description', 'Portion']
        .includes(items.label)
      )){
        if (value == 'disable') {
          return useInputModal[i].disable
        } else {
          return useInputModal[i].label
        }
      }
    }

    watch(() => props.dialogRecipe.dataEdit,
         (dataEdit) => {
      const x = dataEdit
      useInputModal[0].value = x.katnr
      useInputModal[1].value = x.katbezeich
      useInputModal[2].value = x.tHRezept['t-h-rezept'][0].artnrrezept
      useInputModal[3].value = x.hBezeich 
      state.data = x.sRezlin['s-rezlin']
      if(x.sRezlin['s-rezlin'].length !== 0){
        state.hide_bottom = true
      }
    })

    const onValueChange = () => {
      const value = useInputModal[0].value as any
      useInputModal[1].value = value.label
      .substring(value.label.indexOf('-')+2)
      useInputModal[0].value = value.value
      useInputModal[2].value = props.dialogRecipe.max_result + 1
    }

    const onClickAN = () => {
      state.dialogChildRecipe.openModalChild = true
    }

    const onClickDataAN = (dataRow, group) => {
      state.dialogChildRecipe.openModalChild = false 
      articelNumber = dataRow
      groupRecipe = group
      if (dataRow.artnr) {
        useInputModal[9].value = dataRow.artnr
        useInputModal[5].value = dataRow.herkunft
      } else {
        const x = dataRow.artnrrezept
        let result = '0'
        for (let i = 0; i < 6-x.
        toString().length; i++) {
          result += '0'
        }
        resultRecipt = `${result}${x}`
        useInputModal[9].value = `${result}${x}`
      }
    }

    const addDataRecipe = () => {
      if (filterDataUseInput('label') && filterDataUseInput('disable')) {
        let dataKey, dataKey1
          for(const i in state.data){
            if (articelNumber.artnr) {
              if (state.data[i].artnr == articelNumber.artnr) {
                NotifyCreate('Article already selected!', 'red')
                dataKey = state.data[i].artnr
              }
            } else {
              if (state.data[i].artnr == resultRecipt) {
                NotifyCreate('Article already selected!', 'red')
                dataKey1 = state.data[i].artnr
              }
            }
          }
          if (articelNumber.artnr) {            
            if(dataKey !== articelNumber.artnr){
              const data = {
                "sArtnr" : articelNumber.artnr,
                "qty" : useInputModal[6].value,
                "recipetype" : parseInt(groupRecipe),
                "price-type" : 0,
                "DESCRIPT" : articelNumber.bezeich,
                "inhalt" :  articelNumber.inhalt,
                "lostfact" : useInputModal[7].value,
                "vk-preis" : articelNumber['vk-preis']
              }
              // PushDataTableRecipe(1)
              FETCH_API('addRecipeCreateRezlin', data)
              for(const i in useInputModal)
              {
                if (!useInputModal[i].disable) {
                  useInputModal[i].value = ''
                }
              }
                useInputModal[5].value = ''
            }
          } else {
              if(dataKey1 !== useInputModal[9].value){
                PushDataTableRecipe(2)
                for(const i in useInputModal)
                {
                  if (!useInputModal[i].disable) {
                  useInputModal[i].value = ''
                  }
                }
                  useInputModal[5].value = ''
              }
          }
      } else {
          if (
            useInputModal[1].value == '' || 
            useInputModal[0].value == null){
            NotifyCreate('Recipe category / name not yet defined', 'red')
          } else if (useInputModal[2].value == '' || useInputModal[3].value == '') {
            NotifyCreate('Recipe number / name not yet defined', 'red')
          } else {
              for(const i in useInputModal){
                if (['Category Number', 'Category Name', 
                    'Recipe Number', 'Description', 'Portion', 'content']
                    .includes(useInputModal[i].label)) {
                  useInputModal[i].disable = true
                } else {
                  useInputModal[i].disable = false
                }
              }
          }
      }
    }

    const PushDataTableRecipe = (val) => {
      state.data.push({
        artnr: val == 1? articelNumber.artnr: resultRecipt,
        bezeich: val == 1? articelNumber.bezeich: articelNumber.bezeich1,
        's-unit':val ==1? articelNumber.herkunft: '',
        menge: useInputModal[6].value == ''? '0.00' :useInputModal[6].value + '.00',
        cost: '',
        masseinheit: val == 1?articelNumber.masseinheit: '',
        inhalt: val == 1? articelNumber.inhalt: '0.00',
        'vk-preis': val == 1? articelNumber['vk-preis']: '0.00',
        lostfact: useInputModal[7].value
      })
      state.hide_bottom = true
    }

    const deleteDataTable = (dataRow) => {
      state.data = state.data.filter(items => {
        return items.artnr !== dataRow.artnr
      })
      if (state.data.length == 0) {
          state.hide_bottom = false
      }
    }

    const onSaveData = () => {
      const data = {
        "hArtnr" : useInputModal[2].value,
        "hBezeich": useInputModal[3].value,
        "katbezeich": useInputModal[1].value,
        "katnr" :useInputModal[0].value,
        "portion" : useInputModal[4].value,
        "sRezlin": {
          's-Rezlin': state.data
		    }
      }
      FETCH_API('addRecipeSave', data)
    }

    return {
      onClickAN,
      onSaveData,
      onValueChange,
      onClickDataAN,
      deleteDataTable,
      useInputModal,
      addDataRecipe,
      tableDialogRecipe,
      ...toRefs(state),
      pagination: { page: 1, rowsPerPage: 10 },
    };
  },

  components: {
    DialogChildRecip: () => import('./DialogChildRecip.vue'),
  },
});
</script>

<style lang="scss" scoped>
.q-toolbar {
  background: $primary-grad;
}

</style>
