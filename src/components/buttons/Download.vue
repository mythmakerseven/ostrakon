<script setup lang="ts">
import { BIconArrowRepeat, BIconFileEarmarkArrowDown } from 'bootstrap-icons-vue'
import { ref } from 'vue'
import { downloadChart } from '../../helpers/chart'

const loading = ref(false)

async function saveChart() {
  loading.value = true

  await downloadChart()

  loading.value = false
}
</script>

<template>
  <button
    id="home-button"
    type="button"
    class="toggle-button"
  >
    <BIconFileEarmarkArrowDown
      v-if="!loading"
      @click="saveChart"
    />
    <BIconArrowRepeat
      v-else
      id="loading-icon"
    />
  </button>
</template>

<style scoped>
#loading-icon {
  animation: rotation 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

svg {
  height: 15px;
  width: 15px;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
