<script setup lang="ts">
import type { Ref } from 'vue'
import {
  BIcon2CircleFill,
  BIconArrowDownSquare,
  BIconArrowUpSquare,
} from 'bootstrap-icons-vue'
import { ref } from 'vue'
import {
  exportCurrentChart,
  importChart,
  importTopsters2,
} from '../../../helpers/imports'
import LastFmImport from './LastFmImport.vue'

const topsters2ImportRef: Ref<HTMLInputElement> = ref(null)
const uploadRef: Ref<HTMLInputElement> = ref(null)

function uploadPicked(e) {
  e.preventDefault()
  uploadRef.value.click()
}

function importTopsters2ChartsPicked(e) {
  e.preventDefault()
  topsters2ImportRef.value.click()
}

function importTopsters2Charts(event) {
  importTopsters2(event)
}

async function callImportCharts(event) {
  await importChart(event)
}
</script>

<template>
  <div class="container">
    <div id="import-export">
      <button
        @click="exportCurrentChart"
      >
        <BIconArrowDownSquare />
        <span>Export chart data</span>
      </button>
      <button
        @click="uploadPicked"
      >
        <BIconArrowUpSquare />
        <span>Import chart data</span>
      </button>
      <button
        class="import-button"
        @click="importTopsters2ChartsPicked"
      >
        <BIcon2CircleFill />
        <span>Import from Topsters 2</span>
      </button>
    </div>
    <LastFmImport />
    <input
      ref="topsters2ImportRef"
      type="file"
      style="display: none"
      accept="application/json"
      @change="importTopsters2Charts"
    >
    <input
      ref="uploadRef"
      type="file"
      style="display: none"
      accept=".topster"
      @change="callImportCharts"
    >
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  display: flex;
  gap: 20px;
  flex-flow: column;
}

p {
  margin: 0;
  text-align: center;
  font-size: 0.8rem;
}

#import-export {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

#import-export button {
  height: 80px;
  background: #393939;
  border: none;
  font-size: 0.8rem;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  gap: 6px;
  color: white;
}

#import-export button:hover {
  cursor: pointer;
  color: var(--accent);
  text-decoration: underline;
}

#import-export button svg {
  width: 26px;
  height: 26px;
}

#topsters2ImportForm {
  text-align: center;
}

.form-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}
</style>
