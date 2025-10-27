<template>
  <div class="vector-viz">
    <div class="controls">
      <input
        v-model.number="newValue"
        type="number"
        placeholder="Valor"
        @keyup.enter="pushBack"
      />
      <button @click="pushBack" class="btn-add">push_back()</button>
      <button @click="popBack" class="btn-remove" :disabled="vector.length === 0">
        pop_back()
      </button>
      <button @click="clear" class="btn-clear">clear()</button>
    </div>

    <div class="info">
      <span>size(): {{ vector.length }}</span>
      <span>capacity(): {{ capacity }}</span>
      <span v-if="vector.length > 0">front(): {{ vector[0] }}</span>
      <span v-if="vector.length > 0">back(): {{ vector[vector.length - 1] }}</span>
    </div>

    <div class="visualization">
      <div class="vector-container">
        <div
          v-for="(value, index) in capacity"
          :key="index"
          class="vector-cell"
          :class="{ filled: index < vector.length, highlighted: index === highlightIndex }"
        >
          <div class="index-label">{{ index }}</div>
          <div class="value">{{ index < vector.length ? vector[index] : '' }}</div>
        </div>
      </div>
    </div>

    <div class="code-display">
      <pre><code>{{ currentCode }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const vector = ref([10, 20, 30])
const newValue = ref(40)
const highlightIndex = ref(-1)
const currentCode = ref('// Vector inicializado com [10, 20, 30]')

const capacity = computed(() => {
  if (vector.value.length === 0) return 0
  let cap = 1
  while (cap < vector.value.length) cap *= 2
  return Math.max(cap, 8)
})

const pushBack = () => {
  if (newValue.value !== null && newValue.value !== '') {
    vector.value.push(newValue.value)
    highlightIndex.value = vector.value.length - 1
    currentCode.value = `v.push_back(${newValue.value}); // O(1) amortizado\n// size: ${vector.value.length}`

    setTimeout(() => {
      highlightIndex.value = -1
    }, 1000)

    newValue.value = newValue.value + 10
  }
}

const popBack = () => {
  if (vector.value.length > 0) {
    const removed = vector.value.pop()
    currentCode.value = `v.pop_back(); // Removeu ${removed}\n// size: ${vector.value.length}`
  }
}

const clear = () => {
  vector.value = []
  currentCode.value = 'v.clear(); // size: 0'
}
</script>

<style scoped>
.vector-viz {
  padding: 1rem;
}

.controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.controls input {
  padding: 0.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  width: 120px;
}

.controls button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-add {
  background: #42b883;
  color: white;
}

.btn-add:hover {
  background: #35a372;
}

.btn-remove {
  background: #e74c3c;
  color: white;
}

.btn-remove:hover:not(:disabled) {
  background: #c0392b;
}

.btn-remove:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.btn-clear {
  background: #95a5a6;
  color: white;
}

.btn-clear:hover {
  background: #7f8c8d;
}

.info {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  font-family: monospace;
  font-size: 0.95rem;
  color: #666;
}

.info span {
  background: #f0f0f0;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.visualization {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.vector-container {
  display: flex;
  gap: 0.25rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}

.vector-cell {
  min-width: 80px;
  height: 80px;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #fafafa;
  transition: all 0.3s;
}

.vector-cell.filled {
  background: white;
  border-color: #42b883;
}

.vector-cell.highlighted {
  background: #ffeb3b;
  border-color: #fbc02d;
  transform: scale(1.1);
}

.index-label {
  position: absolute;
  top: -20px;
  font-size: 0.75rem;
  color: #999;
}

.value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  font-family: monospace;
}

.code-display {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 1rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9rem;
}

.code-display pre {
  margin: 0;
}
</style>
