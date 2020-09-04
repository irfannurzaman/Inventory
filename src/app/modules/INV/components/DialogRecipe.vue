<template>
  <q-dialog v-model="dialogRecipe.openDialog">
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
              v-for="col in useInputModal.filter(cols => [
              'Category Number'].includes(cols.label))"
              :options="dialogRecipe.selectCatNo" 
              v-model="col.value"
              :style="{
                width: col.width, 
                marginRight: col.marginRight}"
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
        <q-btn color="primary" @click="onClick" label="OK" />
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
export default defineComponent({
  props: {
    dialogRecipe: { type: Object, required: true },
  },

  setup(props, { emit, root: { $api } }) {
    let articelNumber
    const state = reactive({
      isLoading: false,
      hide_bottom: false,
      data: [],
      dialogChildRecipe: {
        openModalChild: false,
        dataChildRecipe: [] as any
      },
    });

        //   FETCH_API

    const FETCH_API = async (api, body?) => {
        const GET_DATA = await $api.inventory.FetchAPIINV(api, body)
        state.dialogChildRecipe.dataChildRecipe = GET_DATA
    }

    onMounted(() => {
      FETCH_API('addRecipePrepare')
    })

    const onClickAN = () => {
      state.dialogChildRecipe.openModalChild = true
    }

    const onClickDataAN = (dataRow) => {
      state.dialogChildRecipe.openModalChild = false
      const data = useInputModal.filter(cols => {
        return ['Articel Number'].includes(cols.label)
      })
      for(const i in data){
        data[i].value = dataRow.artnr
      }
      articelNumber = dataRow
    }

    const addDataRecipe = () => {
      const x = useInputModal

      console.log('sukses', x)
      const art = articelNumber
      state.data.push({
        artnr: art.artnr,
        bezeich: art.bezeich,
        's-unit': art.herkunft,
        menge: useInputModal[6].value,
        cost: '',
        masseinheit: art.masseinheit,
        inhalt: art.inhalt,
        'vk-preis': art['vk-preis'],
        lostfact: useInputModal[7].value
      })
      state.hide_bottom = true
      const data = useInputModal.filter(col => {
        return [
        'content', 'Quantity', 
        'Loss Factor', 'Recipe Cost'
        ].includes(col.label)
      })
      for(const i in data){
        data[i].value = ''
      }
      // state.articelNumber.artnr = ''
    }

    const deleteDataTable = (dataRow) => {
      state.data = state.data.filter(items => {
        return items.artnr !== dataRow.artnr
      })
      if (state.data.length == 0) {
          state.hide_bottom = false
      }
    }

    return {
      onClickAN,
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
