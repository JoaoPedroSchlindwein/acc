<template>
  <div class="queue-viz">
    <div class="controls">
      <input
        v-model.number="newValue"
        type="number"
        placeholder="Valor"
        @keyup.enter="push"
      />
      <button @click="push" class="btn-add">push()</button>
      <button @click="pop" class="btn-remove" :disabled="queue.length === 0">
        pop()
      </button>
      <button @click="clear" class="btn-clear">clear</button>
    </div>

    <div class="info">
      <span>size(): {{ queue.length }}</span>
      <span>empty(): {{ queue.length === 0 ? 'true' : 'false' }}</span>
      <span v-if="queue.length > 0">front(): {{ queue[0] }}</span>
      <span v-if="queue.length > 0">back(): {{ queue[queue.length - 1] }}</span>
    </div>

    <div class="visualization">
      <div class="queue-label">FRONT (saída)</div>
      <div class="queue-container">
        <transition-group name="queue">
          <div
            v-for="(value, index) in queue"
            :key="value.id"
            class="queue-cell"
            :class="{ first: index === 0, last: index === queue.length - 1 }"
          >
            {{ value.val }}
          </div>
        </transition-group>
      </div>
      <div class="queue-label">BACK (entrada)</div>

      <div class="fifo-explanation">
        <strong>FIFO:</strong> First In, First Out
        <br />
        O primeiro elemento inserido é o primeiro a sair
      </div>
    </div>

    <div class="code-display">
      <pre><code>{{ currentCode }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const queue = ref([
  { id: 1, val: 10 },
  { id: 2, val: 20 },
  { id: 3, val: 30 }
])
const newValue = ref(40)
const currentCode = ref('// Queue FIFO inicializada com [10, 20, 30]')
let nextId = 4

const push = () => {
  if (newValue.value !== null && newValue.value !== '') {
    queue.value.push({ id: nextId++, val: newValue.value })
    currentCode.value = `q.push(${newValue.value}); // O(1)\n// Inserido no BACK\n// size: ${queue.value.length}`
    newValue.value = newValue.value + 10
  }
}

const pop = () => {
  if (queue.value.length > 0) {
    const removed = queue.value.shift()
    currentCode.value = `q.pop(); // Removeu ${removed.val} do FRONT\n// size: ${queue.value.length}`
  }
}

const clear = () => {
  queue.value = []
  currentCode.value = '// Queue esvaziada'
}
</script>

<style scoped>
.queue-viz {
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
  flex-wrap: wrap;
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

.queue-label {
  text-align: center;
  font-weight: 600;
  color: #666;
  margin: 0.5rem 0;
  font-size: 0.9rem;
}

.queue-container {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  min-height: 100px;
  align-items: center;
  overflow-x: auto;
}

.queue-cell {
  min-width: 80px;
  height: 80px;
  background: #42b883;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 600;
  font-family: monospace;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.queue-cell.first {
  background: #e74c3c;
  animation: pulse 1.5s infinite;
}

.queue-cell.last {
  background: #3498db;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.queue-enter-active {
  transition: all 0.5s ease;
}

.queue-leave-active {
  transition: all 0.5s ease;
}

.queue-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.queue-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.fifo-explanation {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #e8f5e9;
  border-left: 4px solid #42b883;
  border-radius: 4px;
  line-height: 1.6;
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
