<template>
  <q-dialog v-model="dialogChildRecipe.openModalChild">
    <q-card style="width: 500px; max-width: 90vw;">
       <q-toolbar>
           <q-toolbar-title 
           class="text-white text-weight-medium">
              Recipe
           </q-toolbar-title>
       </q-toolbar>
       <q-card-section>
        <q-option-group 
          inline
          size="xs" 
          v-model="group" 
          :options="options" color="primary" 
          />
          <STable
          v-if="group == '1'"
          :loading="isFetching"
          :columns="columns1"
          :data="data1"
          :rows-per-page-options="[0]"
          :pagination.sync="pagination"
          :hide-bottom="hide_bottom"
          class="table-accounting-date"
          >
         <template v-slot:body="props">
           <q-tr :props="props" @click="selection(props.row)" 
            :class="{
              selected : props.row.selected
            }">
            <q-td :props="props" key="artnr">
                {{props.row.artnr}}
            </q-td>
            <q-td :props="props" key="bezeich">
                <span v-if="props.row.bezeich.length < 10">
                  {{props.row.bezeich}}
                </span>
                <span v-else>
                  {{props.row.bezeich.substring(0, 10) + '...'}}
                  <q-tooltip 
                    content-class="bg-indigo" 
                    :offset="[10, 10]">
                      {{props.row.bezeich}}
                  </q-tooltip>
                </span>
            </q-td>
             <q-td 
             :props="props" 
             v-for="col in props.cols.filter(col =>![
                 'artnr', 'bezeich'].includes(col.name))" :key="col.name">
               {{col.value}}
             </q-td>
           </q-tr>
         </template>
          </STable>
        <STable
        v-else
        :loading="isFetching"
        :columns="columns2"
        :data="data2"
        :rows-per-page-options="[0]"
        :pagination.sync="pagination"
        :hide-bottom="hide_bottom"
        class="table-accounting-date"
        >
          <template v-slot:body="props">
            <q-tr :props="props" @click="selection(props.row)" 
            :class="{
              selected : props.row.selected
            }">
             <q-td 
             :key="col.name" 
             :props="props" 
             v-for="col in props.cols">
                {{col.value}} 
             </q-td>
            </q-tr>
          </template>
        </STable>
       </q-card-section>
        <q-separator />
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn v-close-popup color="primary" flat label="Cancel" />
        <q-btn color="primary" @click="onClickDataAN" label="OK" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  watch,
  onMounted,
} from '@vue/composition-api';
import {stockArticle, Recipe} from '../tables/recipe.table'
import {formatterMoney} from '~/app/helpers/formatterMoney.helper'
export default defineComponent({
    props: {
        dialogChildRecipe: { type: Object, required: true },
    },
    setup(props,{emit}){
    let dataRecipe = props.dialogChildRecipe.dataChildRecipe
    let dataChild
      const state = reactive({
        dialog: true,
        group: '1',
        isFetching: false,
        columns1: [],
        data1: [],
        columns2: [],
        data2: [],
        hide_bottom: true,
        options: [
            {
            label: 'Stock Article',
            value: '1',
          },
          {
              label: 'Recipe',
            value: '2',
          },
        ],
      })

    const dataRepetitionRecipe = (GET_DATA) => {
        return GET_DATA.map(items => ({
            artnrrezept: items.artnrrezept,
            bezeich1: items.bezeich.substring(0, 24),
            portion: items.portion,
            bezeich2: items.bezeich.substring(24),
            selected: false
          }))
    }
    const dataRepetitionArticelNumber = (GET_DATA) => {
        return GET_DATA.map(items => ({
            artnr: items.artnr,
            bezeich: items.bezeich,
            masseinheit: items.masseinheit,
            inhalt: items.inhalt,
            herkunft: items.herkunft.replace(/;/g, ''),
            'vk-preis': formatterMoney(items['vk-preis']),
            selected: false
        }))
    }
    let recipeData = dataRepetitionRecipe(dataRecipe.tHRezept['t-h-rezept'])
    let dataArticel = dataRepetitionArticelNumber(dataRecipe.tLArtikel['t-l-artikel'])

      onMounted(() => {
          state.columns1 = stockArticle
          state.data1 = dataArticel
      })

      watch(() => state.group,
      (group) => {
          if (group == '1') {
              state.columns1 = stockArticle
              state.data1 = dataArticel
              state.columns2 = []
              state.data2 = []
          } else {
              state.columns1 = []
              state.columns2 = Recipe
              state.data1 = []
              state.data2 = recipeData
          }
      })

    const selection = (dataRow) => {  
      for(const i in state.data1){
        state.data1[i]['selected'] = false
      }
      for(const i in state.data2){
        state.data2[i]['selected'] = false
      }
      dataRow['selected'] = true;
      dataChild = dataRow
    }

    const onClickDataAN = () => {
        emit('onClickDataAN', dataChild)
    }

    return {
     selection,
     onClickDataAN,
     ...toRefs(state),
     pagination: {
        rowsPerPage: 0,
      },
    }
    }
})
</script>


<style lang="scss" scoped>
.q-toolbar {
  background: $primary-grad;
}
::v-deep .table-accounting-date {
  max-height: 40vh;

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
  tr.selected td {
    background-color: #2d00e2 !important;
    color: #fff;
  }

</style>