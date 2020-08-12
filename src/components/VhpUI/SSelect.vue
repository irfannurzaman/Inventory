<template>
  <div @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <label v-if="labelText" class="inline-block q-mb-xs">
      {{ labelText }}
    </label>
    <q-select
      dense
      outlined
      v-bind="$attrs"
      v-on="$listeners"
      :value="value"
      @change="onChange"
      :class="inputClasses"
      ref="selectDom"
      class="s-input"
    >
      <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot" />

      <template
        v-for="slot in Object.keys($scopedSlots)"
        :slot="slot"
        slot-scope="scope"
      >
        <slot :name="slot" v-bind="scope" />
      </template>

      <template v-if="showClearIcon && value" v-slot:append>
        <q-icon name="mdi-close" class="keke" @click="onChange(null)" />
      </template>
    </q-select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from '@vue/composition-api';

export default defineComponent({
  inheritAttrs: false,
  props: {
    value: { required: false },
    labelText: { type: String, default: null },
    clearable: { type: Boolean, default: true },
    inputClasses: { type: String, default: 'q-mb-md' },
  },
  setup(props, { emit }) {
    const selectDom = ref<any>(null);
    const arrowEl = ref<any>(null);
    const showClearIcon = ref(false);

    const onChange = (newVal) => {
      emit('input', newVal);
    };

    onMounted(() => {
      if (props.clearable) {
        arrowEl.value = selectDom.value.$el.getElementsByClassName(
          'mdi-menu-down'
        )[0].parentElement;
      }
    });

    function onMouseEnter() {
      if (props.clearable && props.value) {
        showClearIcon.value = true;
        arrowEl.value.style.display = 'none';
      }
    }

    function onMouseLeave() {
      if (props.clearable && props.value) {
        showClearIcon.value = false;
        arrowEl.value.style.display = 'flex';
      }
    }

    watch(
      () => props.value,
      (value) => {
        if (value === null) {
          arrowEl.value.style.display = 'flex';
        }
        showClearIcon.value = false;
      }
    );

    return {
      showClearIcon,
      onChange,
      selectDom,
      onMouseEnter,
      onMouseLeave,
    };
  },
});
</script>
