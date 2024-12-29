<script setup lang="ts">
import type { ChartItem } from '../../../types'
import { ref, watch } from 'vue'
import { useStore } from '../../../store'

const props = defineProps(['row'])

const store = useStore()

const buildTitle = (item: ChartItem) => `${[item.creator, item.title].filter(Boolean).join(' - ')}`

function getData() {
  const start = (props.row - 1) * store.chart.size.x
  const items = store.chart.items.slice(
    start,
    start + store.chart.size.x,
  )

  const titles = []

  for (const item of items) {
    if (item) {
      titles.push(buildTitle(item))
    }
  }

  return {
    items,
    titles,
  }
}

const data = ref(getData())
const titleListRef = ref<HTMLOListElement>(null)

watch(() => [store.chart.items, store.chart.size], () => {
  data.value = getData()
})
</script>

<template>
  <div class="item-row" :style="{ gap: `${store.chart.gap}px`, gridTemplateColumns: `repeat(${store.chart.size.y + 1}, 1fr)` }">
    <template
      v-for="(item, _idx) in data.items" :key="_idx"
    >
      <div class="item">
        <img v-if="item" :alt="item.title" :src="item.coverURL">
        <img v-else src="/placeholder.svg">
      </div>
    </template>
    <ol v-if="store.chart.showTitles && data.titles.length > 0" ref="titleListRef" class="title-list" :style="{ listStyleType: store.chart.showNumbers ? 'decimal' : 'none' }">
      <li v-for="(title, idx) in data.titles" :key="idx">
        {{ title }}
      </li>
    </ol>
  </div>
</template>

<style scoped>
.item-row {
  display: flex;
  justify-content: flex-start;
}

.item {
  height: 260px;
  width: 260px;
  min-height: 260px;
  min-width: 260px;
}

img {
  max-height: 100%;
  max-width: 100%;
}

.title-list {
  text-wrap-mode: nowrap;
  text-align: left;
  margin: 8px;
  padding: 0;
  font-size: 20px;
  line-height: 1;
}
</style>
