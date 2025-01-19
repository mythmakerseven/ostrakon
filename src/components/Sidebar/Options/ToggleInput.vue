<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '../../../store'

interface Props {
  label: string
  property: string
}

const props = defineProps<Props>()
const emit = defineEmits(['handleChange'])

const store = useStore()
const propertyValue = computed(() => store.chart[props.property])

function toggle() {
  return emit('handleChange', !propertyValue.value)
}
</script>

<template>
  <label :for="props.property">
    {{ props.label }}
    <input
      :id="props.property"
      :name="props.property"
      type="checkbox"
      :checked="propertyValue"
      @change="toggle"
    >
    <span class="switch">
      <span class="slider" />
    </span>
  </label>
</template>

<style scoped>
label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

label:hover {
  cursor: pointer;
}

input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch {
  width: 48px;
  height: 24px;
  position: relative;
  display: inline-block;
  background-color: var(--input-bg);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s ease-out;
}

.slider {
  width: 22px;
  height: 22px;
  position: absolute;
  left: 0;
  left: calc(50% - 22px/2 - 11px);
  top: calc(50% - 22px/2);
  border-radius: 50%;
  background: #FFFFFF;
  transition: all 0.2s ease-out;
}

input:checked + .switch {
  background-color: var(--accent);
}

input:checked + .switch .slider {
  left: calc(50% - 22px/2 + 11px);
  top: calc(50% - 22px/2);
}
</style>
