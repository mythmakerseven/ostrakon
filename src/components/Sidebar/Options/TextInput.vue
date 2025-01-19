<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '../../../store'

interface Props {
  label: string
  property: string
  value?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['handleChange'])

const store = useStore()
const propertyValue = computed(() => typeof props.value !== 'undefined' ? props.value : store.chart[props.property])

function updateValue(event: Event) {
  const val = (event.target as HTMLInputElement).value
  return emit('handleChange', val)
}
</script>

<template>
  <div class="text-input-container">
    <label :for="props.property">
      {{ props.label }}
    </label>
    <input
      :id="props.property"
      :name="props.property"
      type="text"
      :value="propertyValue"
      @input="updateValue"
    >
  </div>
</template>

<style scoped>
.text-input-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

input {
  font-size: 16px;
  height: 28px;
}
</style>
