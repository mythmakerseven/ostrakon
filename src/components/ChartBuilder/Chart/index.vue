<script setup lang="ts">
import type { ComputedRef, CSSProperties } from 'vue'
import type { Chart } from '../../../types'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useStore } from '../../../store'
import { BackgroundTypes } from '../../../types'
import Row from './Row.vue'

const store = useStore()

const chartRef = ref<HTMLDivElement>(null)

function onResize() {
  if (chartRef.value) {
    const windowWidth = chartRef.value.parentElement.offsetWidth
    // add 100 to factor in the 50px X margins
    // plus another 50 for some reason because it looks right
    const chartWidth = chartRef.value.offsetWidth + 150

    const ratio = windowWidth / chartWidth

    chartRef.value.style.transform = `scale(${ratio})`
    chartRef.value.style.marginLeft = `${40 * ratio}px`
    chartRef.value.style.marginRight = `${40 * ratio}px`

    // set the parent container's height so you can scroll vertically
    // to see the whole chart on mobile
    const parentEl = chartRef.value.parentElement
    parentEl.style.height = `${Math.floor(chartRef.value.offsetHeight * ratio + 90)}px`
  }
}

// re-scale the chart when the state changes
watch(store, () => {
  onResize()
  // { flush: 'post' } tells Vue to wait until the state is finished changing
  // before running the watcher function. otherwise, onResize runs before the
  // chart is finished updating and gets stuck one state update behind.
}, { flush: 'post' })

function getBackgroundStyle(chart: Chart): CSSProperties {
  if (chart.backgroundType === BackgroundTypes.Color) {
    return ({
      backgroundColor: store.chart.backgroundColor,
    })
  }

  // default to black background when no image URL has been entered
  if (!chart.backgroundUrl) {
    return ({
      backgroundColor: '#000000',
    })
  }

  return ({
    backgroundImage: `url("${store.chart.backgroundUrl}")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  })
}

const chartTitleStyle: ComputedRef<CSSProperties> = computed(() => ({
  marginTop: `${store.chart.gap / 2}px`,
}))

const chartStyle: ComputedRef<CSSProperties> = computed(() => ({
  fontFamily: store.chart.font || 'monospace',
  textShadow: store.chart.shadows ? '2px 2px 4px rgba(0,0,0,0.6)' : 'none',
  borderRadius: store.chart.roundCorners ? '10px' : '0',
  color: store.chart.textColor,
  ...getBackgroundStyle(store.chart),
}))

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
    :style="chartStyle"
  >
    <div v-if="store.chart.title">
      <p class="chart-title" :style="chartTitleStyle">
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
  margin: 50px 20px;
  display: inline-block;
  position: absolute;
  transform-origin: top left;
  top: 0;
  left: 420px;
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
    left: 0;
  }
}
</style>
