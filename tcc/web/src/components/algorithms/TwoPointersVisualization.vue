<template>
  <div class="two-pointers-viz">
    <div class="controls">
      <label>
        Soma alvo:
        <input v-model.number="targetSum" type="number" />
      </label>
      <button @click="findPair" :disabled="isSearching" class="btn-search">
        Buscar Par
      </button>
      <button @click="reset" class="btn-reset">Reset</button>
    </div>

    <div class="info">
      <div v-if="!isSearching && found !== null">
        <span v-if="found" class="found-msg">
          ✓ Par encontrado: {{ array[foundLeft] }} + {{ array[foundRight] }} = {{ targetSum }}
        </span>
        <span v-else class="not-found">
          ✗ Nenhum par com soma {{ targetSum }}
        </span>
      </div>
      <div v-if="isSearching">
        <span>Soma atual: {{ array[left] }} + {{ array[right] }} = {{ array[left] + array[right] }}</span>
      </div>
    </div>

    <div class="visualization">
      <div class="pattern-selector">
        <h4>Padrão:</h4>
        <button
          @click="pattern = 'convergence'"
          :class="{ active: pattern === 'convergence' }"
        >
          Convergência
        </button>
        <button
          @click="pattern = 'chase'"
          :class="{ active: pattern === 'chase' }"
        >
          Perseguição
        </button>
      </div>

      <div class="array-container">
        <div
          v-for="(value, index) in array"
          :key="index"
          class="array-cell"
          :class="{
            left: index === left && isSearching,
            right: index === right && isSearching,
            found: (index === foundLeft || index === foundRight) && !isSearching,
            eliminated: (index < left || index > right) && isSearching && pattern === 'convergence'
          }"
        >
          <div class="index">{{ index }}</div>
          <div class="value">{{ value }}</div>
          <div v-if="index === left && isSearching" class="pointer left-pointer">
            {{ pattern === 'convergence' ? 'LEFT' : 'i' }}
          </div>
          <div v-if="index === right && isSearching" class="pointer right-pointer">
            {{ pattern === 'convergence' ? 'RIGHT' : 'j' }}
          </div>
        </div>
      </div>

      <div v-if="isSearching" class="step-explanation">
        <strong>Estado atual:</strong>
        <div>left = {{ left }}, right = {{ right }}</div>
        <div>array[{{ left }}] + array[{{ right }}] = {{ array[left] }} + {{ array[right] }} = {{ array[left] + array[right] }}</div>
        <div>
          {{ array[left] + array[right] === targetSum ? '✓ Soma igual ao alvo!' :
             array[left] + array[right] < targetSum ? `Soma muito pequena → mover LEFT para a direita` :
             `Soma muito grande → mover RIGHT para a esquerda` }}
        </div>
      </div>
    </div>

    <div class="explanation-section">
      <div class="explanation">
        <h4>Padrão de Convergência</h4>
        <p>
          Ponteiros começam nas extremidades e se movem em direção ao centro.
          Ideal para problemas em arrays ordenados.
        </p>
        <p><strong>Exemplo:</strong> Encontrar par com soma específica</p>
      </div>

      <div class="explanation">
        <h4>Padrão de Perseguição</h4>
        <p>
          Ambos os ponteiros se movem na mesma direção, mantendo uma janela válida.
        </p>
        <p><strong>Exemplo:</strong> Remover duplicatas, subarrays com soma específica</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const array = ref([2, 5, 8, 12, 16, 23, 38, 45, 56])
const targetSum = ref(50)
const left = ref(0)
const right = ref(array.value.length - 1)
const isSearching = ref(false)
const found = ref(null)
const foundLeft = ref(-1)
const foundRight = ref(-1)
const pattern = ref('convergence')

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const findPair = async () => {
  reset()
  isSearching.value = true
  found.value = null

  left.value = 0
  right.value = array.value.length - 1

  while (left.value < right.value) {
    await delay(1200)

    const sum = array.value[left.value] + array.value[right.value]

    if (sum === targetSum.value) {
      found.value = true
      foundLeft.value = left.value
      foundRight.value = right.value
      isSearching.value = false
      return
    }

    if (sum < targetSum.value) {
      left.value++
    } else {
      right.value--
    }

    await delay(400)
  }

  found.value = false
  isSearching.value = false
}

const reset = () => {
  isSearching.value = false
  found.value = null
  foundLeft.value = -1
  foundRight.value = -1
  left.value = 0
  right.value = array.value.length - 1
}
</script>

<style scoped>
.two-pointers-viz {
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
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
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
}

.info span {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 0.5rem;
  font-family: monospace;
}

.found-msg {
  background: #d4edda;
  color: #155724;
}

.not-found {
  background: #ffebee;
  color: #c62828;
}

.visualization {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.pattern-selector {
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.pattern-selector h4 {
  margin: 0;
}

.pattern-selector button {
  padding: 0.5rem 1rem;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.pattern-selector button.active {
  background: #42b883;
  color: white;
  border-color: #42b883;
}

.array-container {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding: 3rem 1rem;
}

.array-cell {
  min-width: 70px;
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
  transform: scale(1.1);
}

.array-cell.right {
  border-color: #e74c3c;
  background: #fadbd8;
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
  bottom: -35px;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  white-space: nowrap;
}

.left-pointer {
  color: #3498db;
  background: #ebf5fb;
}

.right-pointer {
  color: #e74c3c;
  background: #fadbd8;
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

.explanation-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.explanation {
  background: #e8f5e9;
  padding: 1.5rem;
  border-radius: 6px;
}

.explanation h4 {
  color: #2c3e50;
  margin-bottom: 0.75rem;
}

.explanation p {
  margin: 0.5rem 0;
  line-height: 1.6;
}
</style>
