<!-- eslint-disable no-alert -->
<script setup lang="ts">
import type { Ref } from 'vue'
import type { StoredChart } from '../../types'
import { BIconArrowRepeat, BIconFileEarmarkArrowDown } from 'bootstrap-icons-vue'
import { ref } from 'vue'
import { downloadChart, initializeFirstRun } from '../../helpers/chart'
import { appendChart, destroyChart, getActiveChartUuid, getNewestChartUuid, getStoredCharts, setActiveChart } from '../../helpers/localStorage'
import { initialState, useStore } from '../../store'
import Switcher from './Switcher.vue'

const store = useStore()

// Keep track of loading so the user knows why it's taking a while.
// Also, we can prevent the user from spamming the button to generate multiple requests.
const loading: Ref<boolean> = ref(false)

async function saveChart() {
  loading.value = true
  await downloadChart()
  loading.value = false
}

function startNewChart() {
  const newChart: StoredChart = {
    timestamp: new Date().getTime(),
    data: initialState.chart,
  }

  const newUuid = appendChart(newChart)
  setActiveChart(newUuid)

  store.reset()
}

function deleteChart() {
  const activeChartUuid = getActiveChartUuid()

  if (window.confirm('Are you sure you want to delete this chart? There\'s no way to recover it!')) {
    destroyChart(activeChartUuid)

    const newStoredCharts = getStoredCharts()

    if (Object.keys(newStoredCharts).length < 1) {
      // We've just deleted the only saved chart, so let's re-initialize.
      initializeFirstRun()
      store.reset()
    }
    else {
      // If there are other charts, pick the most recently created one.
      const chart = setActiveChart(getNewestChartUuid())

      store.setEntireChart(chart.data)
    }
  }
}
</script>

<template>
  <div id="top-bar">
    <div class="switcher-menu">
      <button
        @click="deleteChart"
      >
        -
      </button>
      <Switcher />
      <button
        @click="startNewChart"
      >
        +
      </button>
    </div>
    <button
      v-if="!loading"
      class="download-button"
      @click="saveChart"
    >
      <BIconFileEarmarkArrowDown id="save-icon" />
      Download
    </button>
    <button
      v-else
      class="download-button"
    >
      <BIconArrowRepeat id="loading-icon" />
      loading...
    </button>
  </div>
</template>

<style>
#top-bar {
  width: calc(100% - 500px);
  height: 40px;
  background: var(--ui-bg);
  display: block;
  top: 0;
  left: 450px;
  border-radius: 0 0 6px 6px;
  margin: 0 auto;
  padding: 0;
  gap: 50px;
  color: white;
  z-index: 2;
  position: fixed;
}

.download-button {
  height: 30px;
  margin-right: 20px;
  width: 120px;
  bottom: 35px;
  float: right;
  position: relative;
}

#save-icon {
  position: relative;
  top: 2px;
}

#loading-icon {
  position: relative;
  top: 2px;
  animation: rotation 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.switcher-menu {
  width: auto;
  height: 40px;
  color: black;
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

@media screen and (max-width: 1000px) {
  #top-bar {
    width: 100%;
    border-radius: 0;
    left: 0;
    margin: none;
    z-index: 1;
  }

  .switcher-menu {
    max-width: 60%;
    gap: 8px;
  }

}
</style>
