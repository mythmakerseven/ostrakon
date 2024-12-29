<script setup lang="ts">
import { useStore } from '../../../store'

const props = defineProps(['item', 'index', 'title'])

const store = useStore()

function allowDrop(ev: DragEvent) {
  ev.preventDefault()
}

function handleDragStart(ev: DragEvent) {
  // don't allow the user to drag and drop placeholders
  if (!props.item) {
    return null
  }

  const dragData = JSON.stringify({
    item: props.item,
    originalIndex: props.index,
  })

  if (ev.dataTransfer) {
    // create a 100px image to show at the cursor. if we don't do this, the browser will show the
    // original image without scaling applied, which can be gigantic when on a smaller screen
    // or on a large chart.
    const dragImg = new Image()
    dragImg.src = props.item.coverURL
    dragImg.style.height = '100%'
    dragImg.style.width = '100%'
    dragImg.style.objectFit = 'contain'

    const container = document.createElement('div')
    container.style.height = '100px'
    container.style.width = '100px'
    container.style.position = 'absolute'
    container.style.left = '10000px'
    container.appendChild(dragImg)

    document.body.appendChild(container)

    ev.dataTransfer.effectAllowed = 'move'
    ev.dataTransfer.setData('application/json', dragData)
    ev.dataTransfer.setDragImage(container, 0, 0)
  }
}

function handleDrop(ev: DragEvent) {
  const dragData = JSON.parse(ev.dataTransfer?.getData('application/json') || 'null')

  if (dragData) {
    if (Number.isInteger(dragData.originalIndex)) {
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
    :class="`item ${item ? '' : 'placeholder'}`"
    :data-index="props.index"
    :title="props.item ? props.title : undefined"
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

.placeholder img:hover {
  cursor: initial
}
</style>
