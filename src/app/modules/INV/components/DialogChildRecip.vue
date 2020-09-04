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
          :options="options" color="primary" />
          <STable
          v-if="group == '1'"
          :loading="isFetching"
          :columns="columns1"
          :data="data1"
          :rows-per-page-options="[0]"
          :pagination.sync="pagination"
          :hide-bottom="hide_bottom"
          class="table-accounting-date"
          />
          <STable
          v-else
          :loading="isFetching"
          :columns="columns2"
          :data="data2"
          :rows-per-page-options="[0]"
          :pagination.sync="pagination"
          :hide-bottom="hide_bottom"
          class="table-accounting-date"
          />
       </q-card-section>
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
export default defineComponent({
    props: {
        dialogChildRecipe : {
        type: Object, required: true}
    },
    setup(){
      const state = reactive({
            dialog: true,
            group: '1',
            isFetching: false,
            columns1: [],
            data1: [],
            columns2: [],
            data2: [],
            hide_bottom: false,
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

      onMounted(() => {
          state.columns1 = stockArticle
      })

      watch(() => state.group,
      (group) => {
          if (group == '1') {
              state.columns1 = stockArticle
              state.columns2 = []
          } else {
              state.columns1 = []
              state.columns2 = Recipe
          }
      })
    return {
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
</style>