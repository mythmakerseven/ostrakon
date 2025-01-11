<script setup lang="ts">
import type { ComputedRef, CSSProperties } from 'vue'
import { computed } from 'vue'
import { useStore } from '../../../store'
import Item from './Item.vue'

const props = defineProps(['row'])

const store = useStore()

const rowItems = computed(() => {
  const start = (props.row - 1) * store.chart.size.x
  const end = start + store.chart.size.x
  return store.items.slice(start, end)
})

const titleListStyle: ComputedRef<CSSProperties> = computed(() => ({
  lineHeight: store.chart.size.x > 10 ? '1' : '1.2',
}))
</script>

<template>
  <div class="item-row" :style="{ gap: `${store.chart.gap}px`, gridTemplateColumns: `repeat(${store.chart.size.y + 1}, 1fr)` }">
    <template
      v-for="item in rowItems" :key="item.originalIndex"
    >
      <Item :item="item.data" :index="item.originalIndex" :title="item.title" />
    </template>
    <ol v-if="store.chart.showTitles && rowItems.some(i => i.title)" class="title-list" :style="titleListStyle">
      <li v-for="(item, idx) in rowItems" :key="idx">
        <span v-if="item.number">
          {{ store.chart.showNumbers ? `${item.number}.` : '' }}
          {{ item.title }}
        </span>
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
