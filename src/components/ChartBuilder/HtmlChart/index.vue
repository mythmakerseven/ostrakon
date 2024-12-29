<script setup lang="ts">
import type { CSSProperties, Ref } from 'vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useStore } from '../../../store'
import { BackgroundTypes } from '../../../types'
import Row from './Row.vue'

const store = useStore()

const backgroundStyle: Ref<CSSProperties> = ref({})
const gridStyle: Ref<CSSProperties> = ref({})
const chartRef = ref<HTMLDivElement>(null)
const chartTitleRef = ref<HTMLParagraphElement>(null)

function onResize() {
  if (chartRef.value) {
    const windowWidth = chartRef.value.parentElement.offsetWidth
    // add 100 to factor in the 50px X margins
    const chartWidth = chartRef.value.offsetWidth + 150

    const ratio = windowWidth / chartWidth

    chartRef.value.style.transform = `scale(${ratio})`
  }
}

watch(store, () => {
  backgroundStyle.value = store.chart.backgroundType === BackgroundTypes.Color
    ? { backgroundColor: store.chart.backgroundColor }
    : { backgroundImage: `url("${store.chart.backgroundUrl}")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }

  gridStyle.value = {
    gridTemplateColumns: `repeat(${store.chart.size.x}, 1fr)`,
    gridTemplateRows: `repeat(${store.chart.size.y}, 1fr)`,
  }

  if (chartTitleRef.value) {
    chartTitleRef.value.style.marginTop = `${store.chart.gap / 2}px`
  }

  if (chartRef.value) {
    if (store.chart.font) {
      chartRef.value.style.fontFamily = store.chart.font
    }
    else {
      chartRef.value.style.fontFamily = 'monospace'
    }

    if (store.chart.shadows) {
      chartRef.value.style.textShadow = '2px 2px 4px rgba(0,0,0,0.6)'
    }

    chartRef.value.style.color = store.chart.textColor
  }

  onResize()
  // { flush: 'post' } tells Vue to wait until the state is finished changing
  // before running the watcher function. otherwise, onResize runs before the
  // chart is finished updating and gets stuck one state update behind.
}, { flush: 'post' })

onMounted(() => {
  window.onresize = onResize
})

onUnmounted(() => {
  window.onresize = undefined
})
</script>

<template>
  <div
    id="chart"
    ref="chartRef"
    :style="backgroundStyle"
  >
    <div v-if="store.chart.title">
      <p ref="chartTitleRef" class="chart-title">
        {{ store.chart.title }}
      </p>
    </div>
    <div class="row-flex" :style="{ gap: `${store.chart.gap}px`, padding: `${store.chart.gap}px`, paddingTop: store.chart.title ? `${store.chart.gap / 2}px` : `${store.chart.gap}px` }">
      <Row v-for="rowNumber in store.chart.size.y" :key="rowNumber" :row="rowNumber" />
    </div>
  </div>
</template>

<style>
#chart {
  border-radius: 1%;
  margin: 50px 20px;
  display: inline-block;
  position: absolute;
  transform-origin: top left;
  top: 0;
  left: 420px;
  touch-action: pinch-zoom;
}

#chart .chart-title {
  font-size: 50px;
  padding: 0;
  margin: 0;
}

#chart .row-flex {
  display: flex;
  flex-flow: column;
  margin: 0;
  padding: 0;
  width: 100%;
}

@media screen and (max-width: 1000px) {
  #chart {
    left: 0
  }
}
</style>
