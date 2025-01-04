<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { BIconX } from 'bootstrap-icons-vue'
import { ref, watch } from 'vue'
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
    dragImg.style.filter = 'opacity(0.9)'

    const container = document.createElement('div')
    container.style.height = '80px'
    container.style.width = '80px'
    container.style.position = 'fixed'
    container.style.left = '10000px'
    container.appendChild(dragImg)

    const appEl = document.querySelector('#app')
    appEl.appendChild(container)

    ev.dataTransfer.effectAllowed = 'move'
    ev.dataTransfer.setData('application/json', dragData)
    ev.dataTransfer.setDragImage(container, 40, 40)
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

const imgStyle = ref<CSSProperties>({})

watch(() => [store.chart.shadows, store.chart.roundCorners], () => {
  imgStyle.value = {
    borderRadius: store.chart.roundCorners ? '10px' : '',
    boxShadow: store.chart.shadows ? '2px 2px 4px rgba(0,0,0,0.6)' : '',
  }
})

function deleteItem() {
  store.addItem({ item: null, index: props.index })
}
</script>

<template>
  <div
    :key="props.item ? props.item.coverURL : undefined"
    :class="`item ${props.item ? '' : 'placeholder'}`"
    :data-index="props.index"
    :title="props.item ? props.title : undefined"
    :draggable="!!props.item"
    :data-html2canvas-ignore="props.item ? undefined : true"
    @dragstart="handleDragStart"
    @dragover="allowDrop"
    @drop="handleDrop"
  >
    <button
      v-if="props.item"
      class="delete-button"
      data-html2canvas-ignore
      title="Delete item"
      @click="deleteItem"
    >
      <BIconX />
    </button>
    <img
      v-if="item"
      :src="item.coverURL"
      class="item-img"
      :style="imgStyle"
    >
  </div>
</template>

<style scoped>
.item {
  height: 260px;
  width: 260px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-img {
  max-height: 100%;
  max-width: 100%;
  height: inherit;
}

.item-img:hover {
  cursor: pointer;
}

.delete-button {
  display: none;
  position: absolute;
  top: 10px;
  right: 10px;
  height: 60px;
  width: 60px;
  appearance: none;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  color: #ffffff;
  border: none;
}

.delete-button:hover {
  cursor: pointer;
}

.delete-button svg {
  height: 100%;
  width: 100%;
}

.item:hover .delete-button {
  display: initial;
}

.placeholder {
  background-color: rgba(90, 90, 90, 0.6);
}

@media (hover: none) {
  .delete-button {
    display: initial;
  }
}
</style>
