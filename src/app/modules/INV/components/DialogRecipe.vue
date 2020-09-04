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
                  v-for="col in useInputModal.filter(cols => ![ 'Category Number',
                  'content', 'Quantity', 'Loss Factor', 'Recipe Cost'].includes(cols.label))"
                  :style="{width: col.width, marginRight: col.marginRight}"
                  :label-text="col.label"
                  v-model="col.value"
                />
                <SInput
                  :style="{width: '130px', marginRight: '10px'}"
                  label-text='Articel Number'
                  @click="onClickAN"
                />
                <SInput
                  :key="col.label"
                  v-for="col in useInputModal.filter(cols => [
                  'content', 'Quantity', 'Loss Factor', 'Recipe Cost'].includes(cols.label))"
                  :style="{width: col.width, marginRight: col.marginRight}"
                  :label-text="col.label"
                  v-model="col.value"
                />
            </div>
            <q-btn
              :style="{marginTop: '-7px', height: '25px', width: '330px'}"
              dense
              icon="mdi-plus"
              color="primary"
              max-height="10"
              label="ADD"
              @click="add"
              size="sm"
            />
          </div>
          <div class="col">
           <STable
           :loading="isLoading"
           :columns="tableHeaders"
           :data="data"
           :rows-per-page-options="[0]"
           :pagination.sync="pagination"
           :hide-bottom="hide_bottom"
           class="table-accounting-date"
           >
              <template #header-cell-fibukonto="props">
                <q-th :props="props" class="fixed-col left">
                  {{
                  props.col.label
                  }}
                </q-th>
              </template>  
              <template #body-cell-fibukonto="props">
                <q-td :props="props" class="fixed-col left">
                  {{
                  props.row.fibukonto
                  }}
                </q-td>
              </template>  
              <template #header-cell-actions="props">
                <q-th :props="props" class="fixed-col right">
                  {{
                  props.col.label
                  }}
                </q-th>
              </template>  
              <template #body-cell-actions="props">
                <q-td :props="props" class="fixed-col right">
                  <q-icon name="more_vert" size="16px">
                    <q-menu auto-close anchor="bottom right" self="top right">
                      <q-list>
                        <q-item clickable v-ripple>
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
        <q-btn @click="$emit('cencel')" flat label="Cancel" />
        <q-btn @click="saveData" label="OK" />
      </q-card-actions>
    </q-card>
    <DialogChildRecip 
    :dialogChildRecipe="dialogChildRecipe" 
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
  tableHeaders,
  stockArticle,
  Recipe,
  modalAdd,
  useInputModal
} from '../tables/recipe.table';
export default defineComponent({
  props: {
    dialogRecipe: { type: Object, required: true },
  },

  setup(props, { emit, root: { $api } }) {
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

    return {
      onClickAN,
      useInputModal,
      tableHeaders,
      ...toRefs(state),
      pagination: { page: 1, rowsPerPage: 10 },
    };
  },

  components: {
    ModalRecipeNumber: () => import('./ModalRecipeNumber.vue'),
    DialogChildRecip: () => import('./DialogChildRecip.vue'),
  },
});
</script>

<style lang="scss" scoped>
.q-toolbar {
  background: $primary-grad;
}
.mystickyvirtscrolltable {
  height: 410px;
}

.verticalTable {
  height: 405px;
}

.widthModalArrt {
  width: 700px;
  max-width: 90vw;
}

.my-sticky-virtscroll-table thead tr:first-child th {
  background-color: #fff;
}

.my-sticky-virtscroll-table thead tr th {
  position: sticky;
  // z-index: 1
}
.my-sticky-virtscroll-table thead tr:last-child th {
  top: 48px;
}

.my-sticky-virtscroll-table thead tr:first-child th {
  top: 0;
}
</style>
