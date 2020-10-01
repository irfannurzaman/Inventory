<template>
  <section class="mt-7">
    <div id="input" class="q-pa-md">
      <q-form @submit="onSearch">
        <SInput 
        label-text="Reciving Date" 
        v-model="inputan"/>
        <SInput 
        label-text="Delevery Note" 
        v-model="inputan"/>
        <div id="radio">
        <q-option-group
        size="xs"
        v-model="group"
        :options="options"
        color="primary"
        />
        </div>
        <q-btn
        size="sm"
        block
        color="primary"
        max-height="10"
        style="height: 25px"
        icon="mdi-magnify"
        label="Search"
        type="submit"
        class="q-mt-md full-width"
        />
      </q-form>
    </div>
    <q-separator style="border-width: 1px;" class="q-my-md" />
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from '@vue/composition-api';
export default defineComponent({
  props: {},
  setup(_, { emit }) {
    const state = reactive({
      inputan: ref(null),
      group: '1',
      options: [
        {
          label: 'Today recieved',
          value: '1',
        },
        {
          label: 'Closed',
          value: '2',
        },
      ],
    });
    const onSearch = () => {
      emit('onSearch');
    };
    return {
      onSearch,
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss" scoped>
#input {
  width: 200px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

#radio {
  margin-left: -9px;
}
</style>
