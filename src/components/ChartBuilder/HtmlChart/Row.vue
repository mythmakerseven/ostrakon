<script setup lang="ts">
import type { ChartItem } from '../../../types'
import { ref, watch } from 'vue'
import { useStore } from '../../../store'
import Item from './Item.vue'

const props = defineProps(['row'])

const store = useStore()

const buildTitle = (item: ChartItem) => `${[item.creator, item.title].filter(Boolean).join(' - ')}`

interface ItemWithIndex {
  item: ChartItem
  index: number
  title: string | null
}

function getData() {
  const start = (props.row - 1) * store.chart.size.x
  const data: ItemWithIndex[] = []

  for (let i = start; i < start + store.chart.size.x; i++) {
    const item = store.chart.items[i]
    data.push({
      item,
      index: i,
      title: item ? buildTitle(item) : null,
    })
  }

  return data
}

const data = ref(getData())
const titleListRef = ref<HTMLOListElement>(null)

watch(() => [store.chart.items, store.chart.size], () => {
  data.value = getData()

  if (titleListRef.value) {
    if (store.chart.size.x > 10) {
      titleListRef.value.style.lineHeight = '1'
    }
    else {
      titleListRef.value.style.lineHeight = '1.2'
    }
  }
})
</script>

<template>
  <div class="item-row" :style="{ gap: `${store.chart.gap}px`, gridTemplateColumns: `repeat(${store.chart.size.y + 1}, 1fr)` }">
    <template
      v-for="(d) in data" :key="d.index"
    >
      <Item :item="d.item" :index="d.index" :title="d.title" />
    </template>
    <ol v-if="store.chart.showTitles && data.some(i => i.title)" ref="titleListRef" class="title-list">
      <li v-for="(d, idx) in data.filter(i => i && i.title)" :key="idx">
        {{ store.chart.showNumbers ? `${d.index + 1}.` : '' }}
        {{ d.title }}
      </li>
    </ol>
  </div>
</template>

<style scoped>
.item-row {
  display: flex;
  justify-content: flex-start;
}

.title-list {
  text-wrap-mode: nowrap;
  text-align: left;
  padding: 0;
  margin: 0;
  font-size: 20px;
  line-height: 1;
  list-style: none;
}
</style>
