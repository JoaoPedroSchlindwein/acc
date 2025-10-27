<template>
  <div class="stack-viz">
    <div class="controls">
      <input
        v-model.number="newValue"
        type="number"
        placeholder="Valor"
        @keyup.enter="push"
      />
      <button @click="push" class="btn-add">push()</button>
      <button @click="pop" class="btn-remove" :disabled="stack.length === 0">
        pop()
      </button>
      <button @click="clear" class="btn-clear">clear</button>
    </div>

    <div class="info">
      <span>size(): {{ stack.length }}</span>
      <span>empty(): {{ stack.length === 0 ? 'true' : 'false' }}</span>
      <span v-if="stack.length > 0">top(): {{ stack[stack.length - 1] }}</span>
    </div>

    <div class="visualization">
      <div class="stack-container">
        <div class="stack-label">TOP (topo) ⬆</div>
        <transition-group name="stack" class="stack-items">
          <div
            v-for="(value, index) in [...stack].reverse()"
            :key="value.id"
            class="stack-cell"
            :class="{ top: index === 0 }"
          >
            {{ value.val }}
          </div>
        </transition-group>
        <div class="stack-base">BASE</div>
      </div>

      <div class="lifo-explanation">
        <strong>LIFO:</strong> Last In, First Out
        <br />
        O último elemento inserido é o primeiro a sair
        <br />
        <br />
        <strong>Aplicações:</strong>
        <ul>
          <li>Inversão de sequências</li>
          <li>Validação de parênteses</li>
          <li>Pilha de chamadas de funções</li>
        </ul>
      </div>
    </div>

    <div class="code-display">
      <pre><code>{{ currentCode }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stack = ref([
  { id: 1, val: 10 },
  { id: 2, val: 20 },
  { id: 3, val: 30 }
])
const newValue = ref(40)
const currentCode = ref('// Stack LIFO inicializada com [10, 20, 30]')
let nextId = 4

const push = () => {
  if (newValue.value !== null && newValue.value !== '') {
    stack.value.push({ id: nextId++, val: newValue.value })
    currentCode.value = `s.push(${newValue.value}); // O(1)\n// Inserido no TOPO\n// size: ${stack.value.length}`
    newValue.value = newValue.value + 10
  }
}

const pop = () => {
  if (stack.value.length > 0) {
    const removed = stack.value.pop()
    currentCode.value = `s.pop(); // Removeu ${removed.val} do TOPO\n// size: ${stack.value.length}`
  }
}

const clear = () => {
  stack.value = []
  currentCode.value = '// Stack esvaziada'
}
</script>

<style scoped>
.stack-viz {
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
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  align-items: start;
}

.stack-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stack-label {
  text-align: center;
  font-weight: 600;
  color: #e74c3c;
  font-size: 0.9rem;
  padding: 0.5rem;
  background: #ffebee;
  border-radius: 4px;
}

.stack-items {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-height: 200px;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.stack-cell {
  width: 100%;
  height: 60px;
  background: #42b883;
  color: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 600;
  font-family: monospace;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stack-cell.top {
  background: #e74c3c;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.stack-base {
  text-align: center;
  font-weight: 600;
  color: #666;
  font-size: 0.9rem;
  padding: 0.5rem;
  background: #e0e0e0;
  border-radius: 4px;
}

.stack-enter-active {
  transition: all 0.4s ease;
}

.stack-leave-active {
  transition: all 0.4s ease;
}

.stack-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.stack-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.lifo-explanation {
  padding: 1.5rem;
  background: #e8f5e9;
  border-left: 4px solid #42b883;
  border-radius: 4px;
  line-height: 1.6;
}

.lifo-explanation ul {
  margin-top: 0.5rem;
  margin-left: 1.5rem;
}

.lifo-explanation li {
  margin: 0.25rem 0;
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

@media (max-width: 768px) {
  .visualization {
    grid-template-columns: 1fr;
  }
}
</style>
