<template>
  <q-dialog v-model="dialogChildRecipe.openModalChild">
    <q-toolbar>
        <q-toolbar-title 
        class="text-white text-weight-medium">
           Recipe
        </q-toolbar-title>
    </q-toolbar>
  </q-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
} from '@vue/composition-api';
export default defineComponent({
    props: {
        dialogChildRecipe : {
        type: Object, required: true}
    },
    setup(){
      const state = reactive({
            dialog: true
      })
    return {
     ...toRefs(state),
    }
    }
})
</script>


<style lang="scss" scoped>
.q-toolbar {
  background: $primary-grad;
}
</style>