<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'

const emit = defineEmits([
  'updateResults',
])

const urlInput: Ref<HTMLInputElement> = ref(null)
const titleInput: Ref<HTMLInputElement> = ref(null)
const creatorInput: Ref<HTMLInputElement> = ref(null)

function buildResultItem() {
  if (urlInput.value.value) {
    const item = {
      title: titleInput.value.value,
      creator: creatorInput.value.value,
      imageURL: urlInput.value.value,
      type: 'custom',
    }

    emit('updateResults', [item])
  }
}
</script>

<template>
  <div id="custom-form">
    <div class="custom-form-item">
      <label for="custom-image-url">
        Image Link
      </label>
      <input
        id="custom-image-url"
        ref="urlInput"
        required
        type="text"
      >
    </div>
    <div class="custom-form-item">
      <label for="custom-image-title">
        Title
      </label>
      <input
        id="custom-image-title"
        ref="titleInput"
        type="text"
      >
    </div>
    <div class="custom-form-item">
      <label for="custom-image-creator">
        Creator (Optional)
      </label>
      <input
        id="custom-image-creator"
        ref="creatorInput"
        type="text"
      >
    </div>
    <button
      @click="buildResultItem"
    >
      Generate chart item
    </button>
  </div>
</template>

<style scoped>
#custom-form {
  display: flex;
  flex-flow: column;
  gap: 10px;
}

#custom-form button {
  margin: auto;
  font-size: 1rem;
}

.custom-form-item label {
  display: block;
  font-size: 0.8rem;
}

.custom-form-item input {
  width: 100%;
}
</style>
