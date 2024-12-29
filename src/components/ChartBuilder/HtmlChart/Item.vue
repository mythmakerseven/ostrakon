<script setup lang="ts">
import { useStore } from '../../../store'

const props = defineProps(['item', 'index'])

const store = useStore()

function allowDrop(ev: DragEvent) {
  ev.preventDefault()
}

function handleDragStart(ev: DragEvent) {
  const dragData = JSON.stringify({
    item: props.item,
    originalIndex: props.index,
  })

  if (ev.dataTransfer) {
    ev.dataTransfer.setData('application/json', dragData)
  }
}

function handleDrop(ev: DragEvent) {
  const dragData = JSON.parse(ev.dataTransfer?.getData('application/json') || 'null')

  if (dragData) {
    if (dragData.originalIndex) {
      store.moveItem({ item: dragData.item, oldIndex: dragData.originalIndex, newIndex: props.index })
    }
    else {
      store.addItem({ item: dragData.item, index: props.index })
    }
  }
}
</script>

<template>
  <div
    class="item"
    :data-index="props.index"
    @dragstart="handleDragStart"
    @dragover="allowDrop"
    @drop="handleDrop"
  >
    <img v-if="props.item" :alt="props.item.title" :src="props.item.coverURL">
    <img v-else src="/placeholder.svg">
  </div>
</template>

<style scoped>
.item {
  height: 260px;
  width: 260px;
  min-height: 260px;
  min-width: 260px;
}

img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}

img:hover {
  cursor: pointer;
}
</style>
