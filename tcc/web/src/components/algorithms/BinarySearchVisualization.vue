<template>
  <div class="binary-search-viz">
    <div class="controls">
      <label>
        Buscar valor:
        <input v-model.number="target" type="number" />
      </label>
      <button @click="startSearch" :disabled="isSearching" class="btn-search">
        Buscar
      </button>
      <button @click="reset" class="btn-reset">Reset</button>
    </div>

    <div class="info">
      <div v-if="!isSearching && found !== null">
        <span v-if="found">
          ✓ Elemento {{ target }} encontrado no índice {{ foundIndex }}
        </span>
        <span v-else class="not-found">✗ Elemento {{ target }} não encontrado</span>
      </div>
      <div v-if="isSearching">
        <span>Iteração: {{ iteration }}</span>
        <span>Espaço de busca: {{ searchSpace }} elementos</span>
      </div>
    </div>

    <div class="visualization">
      <div class="array-container">
        <div
          v-for="(value, index) in array"
          :key="index"
          class="array-cell"
          :class="{
            left: index === left && isSearching,
            right: index === right && isSearching,
            mid: index === mid && isSearching,
            found: index === foundIndex && !isSearching,
            eliminated: (index < left || index > right) && isSearching
          }"
        >
          <div class="index">{{ index }}</div>
          <div class="value">{{ value }}</div>
          <div v-if="index === left && isSearching" class="pointer left-pointer">L</div>
          <div v-if="index === right && isSearching" class="pointer right-pointer">R</div>
          <div v-if="index === mid && isSearching" class="pointer mid-pointer">M</div>
        </div>
      </div>

      <div v-if="isSearching" class="step-explanation">
        <strong>Passo {{ iteration }}:</strong>
        <div>left = {{ left }}, right = {{ right }}, mid = {{ mid }}</div>
        <div>array[{{ mid }}] = {{ array[mid] }}</div>
        <div>
          {{ array[mid] === target ? '✓ Encontrado!' :
             array[mid] < target ? `${array[mid]} < ${target} → buscar na direita` :
             `${array[mid]} > ${target} → buscar na esquerda` }}
        </div>
      </div>
    </div>

    <div class="complexity-info">
      <h4>Complexidade</h4>
      <p><strong>Tempo:</strong> O(log n) - Cada iteração reduz o espaço pela metade</p>
      <p><strong>Espaço:</strong> O(1) - Apenas variáveis para índices</p>
      <p>
        Para n = {{ array.length }}, são necessárias no máximo
        {{ Math.ceil(Math.log2(array.length)) }} comparações
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const array = ref([2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78, 89, 95])
const target = ref(23)
const left = ref(0)
const right = ref(array.value.length - 1)
const mid = ref(0)
const isSearching = ref(false)
const found = ref(null)
const foundIndex = ref(-1)
const iteration = ref(0)
const searchSpace = ref(array.value.length)

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const startSearch = async () => {
  reset()
  isSearching.value = true
  found.value = null
  foundIndex.value = -1

  left.value = 0
  right.value = array.value.length - 1

  while (left.value <= right.value) {
    iteration.value++
    mid.value = Math.floor((left.value + right.value) / 2)
    searchSpace.value = right.value - left.value + 1

    await delay(1500)

    if (array.value[mid.value] === target.value) {
      found.value = true
      foundIndex.value = mid.value
      isSearching.value = false
      return
    }

    if (array.value[mid.value] < target.value) {
      left.value = mid.value + 1
    } else {
      right.value = mid.value - 1
    }

    await delay(500)
  }

  found.value = false
  isSearching.value = false
}

const reset = () => {
  isSearching.value = false
  found.value = null
  foundIndex.value = -1
  iteration.value = 0
  left.value = 0
  right.value = array.value.length - 1
  mid.value = 0
  searchSpace.value = array.value.length
}
</script>

<style scoped>
.binary-search-viz {
  padding: 1rem;
}

.controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.controls label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.controls input {
  padding: 0.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  width: 100px;
}

.controls button {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.btn-search {
  background: #42b883;
  color: white;
}

.btn-search:hover:not(:disabled) {
  background: #35a372;
}

.btn-search:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.btn-reset {
  background: #95a5a6;
  color: white;
}

.btn-reset:hover {
  background: #7f8c8d;
}

.info {
  margin-bottom: 1.5rem;
  min-height: 30px;
  font-family: monospace;
}

.info span {
  background: #e8f5e9;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-right: 1rem;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.not-found {
  background: #ffebee !important;
  color: #c62828;
}

.visualization {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.array-container {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding: 3rem 1rem;
}

.array-cell {
  min-width: 60px;
  height: 80px;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: white;
  transition: all 0.4s;
}

.array-cell.eliminated {
  opacity: 0.3;
  background: #f5f5f5;
}

.array-cell.left {
  border-color: #3498db;
  background: #ebf5fb;
}

.array-cell.right {
  border-color: #e74c3c;
  background: #fadbd8;
}

.array-cell.mid {
  border-color: #f39c12;
  background: #fef5e7;
  transform: scale(1.1);
}

.array-cell.found {
  border-color: #42b883;
  background: #d4edda;
  transform: scale(1.15);
  animation: found 0.6s ease;
}

@keyframes found {
  0%, 100% { transform: scale(1.15); }
  50% { transform: scale(1.25); }
}

.index {
  position: absolute;
  top: -25px;
  font-size: 0.75rem;
  color: #999;
}

.value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  font-family: monospace;
}

.pointer {
  position: absolute;
  bottom: -30px;
  font-size: 0.85rem;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.left-pointer {
  color: #3498db;
  background: #ebf5fb;
}

.right-pointer {
  color: #e74c3c;
  background: #fadbd8;
}

.mid-pointer {
  color: #f39c12;
  background: #fef5e7;
}

.step-explanation {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 6px;
  border-left: 4px solid #42b883;
  line-height: 1.8;
}

.step-explanation div {
  font-family: monospace;
  margin: 0.5rem 0;
}

.complexity-info {
  background: #e8f5e9;
  padding: 1.5rem;
  border-radius: 6px;
}

.complexity-info h4 {
  color: #2c3e50;
  margin-bottom: 0.75rem;
}

.complexity-info p {
  margin: 0.5rem 0;
  line-height: 1.6;
}
</style>
