<template>
  <div class="binary-search-enhanced">
    <!-- Casos de Teste Rápidos -->
    <div class="quick-tests">
      <h4>🧪 Casos de Teste Rápidos</h4>
      <button @click="loadTest('simple')" class="test-btn">
        📌 Simples (13 elem)
      </button>
      <button @click="loadTest('empty')" class="test-btn">
        📭 Array Vazio
      </button>
      <button @click="loadTest('single')" class="test-btn">
        1️⃣ Um Elemento
      </button>
      <button @click="loadTest('large')" class="test-btn">
        📊 Grande (100 elem)
      </button>
      <button @click="loadTest('notfound')" class="test-btn">
        ❌ Não Encontrado
      </button>
    </div>

    <!-- Controles Principais -->
    <div class="main-controls">
      <div class="input-group">
        <label>
          Buscar valor:
          <input v-model.number="target" type="number" :disabled="isPlaying" />
        </label>
        <button @click="initialize" :disabled="isPlaying" class="btn-start">
          🚀 Iniciar
        </button>
      </div>

      <!-- Player Controls -->
      <div v-if="initialized" class="player-controls">
        <button @click="previousStep" :disabled="currentStep === 0" class="btn-step">
          ⏮ Anterior
        </button>
        <button @click="togglePlay" class="btn-play">
          {{ isPlaying ? '⏸ Pausar' : '▶ Play' }}
        </button>
        <button @click="nextStep" :disabled="currentStep >= steps.length - 1" class="btn-step">
          Próximo ⏭
        </button>
        <button @click="reset" class="btn-reset-prominent">
          🔄 Resetar
        </button>
      </div>
    </div>

    <!-- Speed Control -->
    <div v-if="initialized" class="speed-control">
      <label>
        ⚡ Velocidade:
        <input
          v-model.number="speed"
          type="range"
          min="200"
          max="2000"
          step="200"
          class="speed-slider"
        />
        <span class="speed-label">{{ getSpeedLabel() }}</span>
      </label>
    </div>

    <!-- Progress Bar / Timeline -->
    <div v-if="initialized && steps.length > 0" class="timeline">
      <div class="timeline-header">
        <span>Passo {{ currentStep + 1 }} de {{ steps.length }}</span>
        <span>{{ getStepDescription() }}</span>
      </div>
      <input
        v-model.number="currentStep"
        type="range"
        min="0"
        :max="steps.length - 1"
        class="timeline-slider"
        @input="onTimelineChange"
      />
      <div class="timeline-markers">
        <div
          v-for="(step, idx) in steps"
          :key="idx"
          class="marker"
          :class="{ active: idx === currentStep, completed: idx < currentStep }"
          :style="{ left: (idx / (steps.length - 1)) * 100 + '%' }"
        ></div>
      </div>
    </div>

    <!-- Status Info -->
    <div v-if="initialized" class="status-info">
      <div class="stat-card">
        <div class="stat-label">Comparações</div>
        <div class="stat-value">{{ currentStep }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Espaço de Busca</div>
        <div class="stat-value">{{ getCurrentSearchSpace() }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Complexidade</div>
        <div class="stat-value">O(log n)</div>
      </div>
      <div v-if="currentStepData" class="stat-card" :class="getResultClass()">
        <div class="stat-label">Status</div>
        <div class="stat-value">{{ getStatus() }}</div>
      </div>
    </div>

    <!-- Visualization -->
    <div class="visualization">
      <div class="array-container">
        <div
          v-for="(value, index) in array"
          :key="index"
          class="array-cell"
          :class="getCellClass(index)"
          @click="explainCell(index)"
        >
          <div class="index">{{ index }}</div>
          <div class="value">{{ value }}</div>
          <div v-if="showPointer(index, 'left')" class="pointer left-pointer">
            L
          </div>
          <div v-if="showPointer(index, 'right')" class="pointer right-pointer">
            R
          </div>
          <div v-if="showPointer(index, 'mid')" class="pointer mid-pointer">
            M
          </div>
        </div>
      </div>

      <!-- Contextual Explanation -->
      <div v-if="currentStepData" class="contextual-explanation">
        <div class="explanation-header">
          <strong>💡 O que está acontecendo:</strong>
        </div>
        <div class="explanation-content" v-html="currentStepData.explanation"></div>
        <div v-if="currentStepData.tip" class="explanation-tip">
          <strong>💭 Dica:</strong> {{ currentStepData.tip }}
        </div>
      </div>
    </div>

    <!-- Code View -->
    <div class="code-view">
      <h4>📝 Código (linha atual destacada)</h4>
      <pre><code><span v-for="(line, idx) in codeLines" :key="idx" :class="{ highlighted: idx === currentCodeLine }">{{ line }}</span></code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// State
const array = ref([2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78, 89, 95])
const target = ref(45)
const speed = ref(1000)
const initialized = ref(false)
const isPlaying = ref(false)
const currentStep = ref(0)
const steps = ref([])
const playInterval = ref(null)

// Code lines for highlighting
const codeLines = [
  'int buscaBinaria(vector<int>& v, int alvo) {',
  '    int esq = 0;',
  '    int dir = v.size() - 1;',
  '    ',
  '    while (esq <= dir) {',
  '        int meio = esq + (dir - esq) / 2;',
  '        ',
  '        if (v[meio] == alvo) {',
  '            return meio;  // Encontrado!',
  '        }',
  '        ',
  '        if (v[meio] < alvo) {',
  '            esq = meio + 1;  // Buscar à direita',
  '        } else {',
  '            dir = meio - 1;  // Buscar à esquerda',
  '        }',
  '    }',
  '    ',
  '    return -1;  // Não encontrado',
  '}'
]

const currentCodeLine = computed(() => {
  if (!currentStepData.value) return -1
  return currentStepData.value.codeLine
})

const currentStepData = computed(() => {
  return steps.value[currentStep.value]
})

// Quick test presets
const loadTest = (testType) => {
  reset()
  switch (testType) {
    case 'simple':
      array.value = [2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78, 89, 95]
      target.value = 45
      break
    case 'empty':
      array.value = []
      target.value = 5
      break
    case 'single':
      array.value = [42]
      target.value = 42
      break
    case 'large':
      array.value = Array.from({ length: 100 }, (_, i) => i * 2)
      target.value = 84
      break
    case 'notfound':
      array.value = [1, 3, 5, 7, 9, 11, 13, 15]
      target.value = 10
      break
  }
}

// Initialize and generate steps
const initialize = () => {
  if (array.value.length === 0) {
    alert('Array está vazio! Escolha um caso de teste.')
    return
  }

  steps.value = generateSteps()
  currentStep.value = 0
  initialized.value = true
}

const generateSteps = () => {
  const stepsArray = []
  let left = 0
  let right = array.value.length - 1
  let iteration = 0

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    const searchSpace = right - left + 1

    stepsArray.push({
      left,
      right,
      mid,
      iteration: iteration + 1,
      searchSpace,
      found: array.value[mid] === target.value,
      comparison: array.value[mid] < target.value ? 'menor' : array.value[mid] > target.value ? 'maior' : 'igual',
      explanation: generateExplanation(left, right, mid, array.value[mid], target.value),
      tip: generateTip(searchSpace, iteration),
      codeLine: array.value[mid] === target.value ? 8 : (array.value[mid] < target.value ? 12 : 14)
    })

    if (array.value[mid] === target.value) {
      break
    }

    if (array.value[mid] < target.value) {
      left = mid + 1
    } else {
      right = mid - 1
    }

    iteration++
  }

  // Add final state if not found
  if (left > right && !stepsArray[stepsArray.length - 1]?.found) {
    stepsArray.push({
      left,
      right,
      mid: -1,
      iteration: iteration + 1,
      searchSpace: 0,
      found: false,
      comparison: 'notfound',
      explanation: `<p>O espaço de busca foi esgotado!</p>
                    <p>left (${left}) > right (${right})</p>
                    <p>❌ O elemento <strong>${target.value}</strong> não está no array.</p>`,
      tip: 'Quando left > right, sabemos que o elemento não existe.',
      codeLine: 18
    })
  }

  return stepsArray
}

const generateExplanation = (left, right, mid, midValue, targetValue) => {
  if (midValue === targetValue) {
    return `
      <p>✅ <strong>Encontramos o elemento!</strong></p>
      <p>array[${mid}] = ${midValue} = ${targetValue}</p>
      <p>O elemento foi encontrado no índice <strong>${mid}</strong>.</p>
    `
  }

  if (midValue < targetValue) {
    return `
      <p>Comparando: array[${mid}] = <strong>${midValue}</strong> com alvo = <strong>${targetValue}</strong></p>
      <p>Como ${midValue} < ${targetValue}, sabemos que o elemento deve estar <strong>à DIREITA</strong>.</p>
      <p>➡️ Atualizamos: <code>left = mid + 1 = ${mid + 1}</code></p>
      <p>Isso elimina ${mid + 1} elementos do espaço de busca!</p>
    `
  } else {
    return `
      <p>Comparando: array[${mid}] = <strong>${midValue}</strong> com alvo = <strong>${targetValue}</strong></p>
      <p>Como ${midValue} > ${targetValue}, sabemos que o elemento deve estar <strong>à ESQUERDA</strong>.</p>
      <p>⬅️ Atualizamos: <code>right = mid - 1 = ${mid - 1}</code></p>
      <p>Isso elimina ${array.value.length - mid} elementos do espaço de busca!</p>
    `
  }
}

const generateTip = (searchSpace, iteration) => {
  if (iteration === 0) {
    return 'Na primeira iteração, analisamos o elemento do meio do array completo.'
  }
  if (searchSpace <= 2) {
    return 'Com poucos elementos restantes, estamos próximos da resposta!'
  }
  return `A cada iteração, reduzimos o espaço pela metade. Restam ${searchSpace} elementos.`
}

// Player controls
const togglePlay = () => {
  isPlaying.value = !isPlaying.value

  if (isPlaying.value) {
    playInterval.value = setInterval(() => {
      if (currentStep.value < steps.value.length - 1) {
        currentStep.value++
      } else {
        isPlaying.value = false
        clearInterval(playInterval.value)
      }
    }, speed.value)
  } else {
    clearInterval(playInterval.value)
  }
}

const nextStep = () => {
  if (currentStep.value < steps.value.length - 1) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const onTimelineChange = () => {
  if (isPlaying.value) {
    isPlaying.value = false
    clearInterval(playInterval.value)
  }
}

const reset = () => {
  isPlaying.value = false
  initialized.value = false
  currentStep.value = 0
  steps.value = []
  clearInterval(playInterval.value)
}

// Helper functions
const getSpeedLabel = () => {
  if (speed.value <= 400) return '2x'
  if (speed.value <= 800) return '1.5x'
  if (speed.value <= 1200) return '1x'
  return '0.5x'
}

const getStepDescription = () => {
  if (!currentStepData.value) return ''
  if (currentStepData.value.found) return '✓ Encontrado!'
  if (currentStepData.value.comparison === 'notfound') return '❌ Não encontrado'
  return `Comparando... (espaço: ${currentStepData.value.searchSpace})`
}

const getCurrentSearchSpace = () => {
  return currentStepData.value?.searchSpace || 0
}

const getStatus = () => {
  if (!currentStepData.value) return '-'
  if (currentStepData.value.found) return '✓ Encontrado'
  if (currentStepData.value.comparison === 'notfound') return '❌ Não encontrado'
  return '🔍 Buscando...'
}

const getResultClass = () => {
  if (!currentStepData.value) return ''
  if (currentStepData.value.found) return 'success'
  if (currentStepData.value.comparison === 'notfound') return 'failure'
  return ''
}

const getCellClass = (index) => {
  if (!currentStepData.value) return ''

  const classes = []

  if (currentStepData.value.found && index === currentStepData.value.mid) {
    classes.push('found')
  }

  if (index === currentStepData.value.left) classes.push('left')
  if (index === currentStepData.value.right) classes.push('right')
  if (index === currentStepData.value.mid && !currentStepData.value.found) classes.push('mid')

  if (index < currentStepData.value.left || index > currentStepData.value.right) {
    classes.push('eliminated')
  }

  return classes.join(' ')
}

const showPointer = (index, type) => {
  if (!currentStepData.value) return false
  if (type === 'left') return index === currentStepData.value.left
  if (type === 'right') return index === currentStepData.value.right
  if (type === 'mid') return index === currentStepData.value.mid && !currentStepData.value.found
  return false
}

const explainCell = (index) => {
  // Future: could show tooltip with cell details
  console.log(`Cell ${index}: value = ${array.value[index]}`)
}

// Watch speed changes
watch(speed, (newSpeed) => {
  if (isPlaying.value) {
    clearInterval(playInterval.value)
    playInterval.value = setInterval(() => {
      if (currentStep.value < steps.value.length - 1) {
        currentStep.value++
      } else {
        isPlaying.value = false
        clearInterval(playInterval.value)
      }
    }, newSpeed)
  }
})
</script>

<style scoped>
.binary-search-enhanced {
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Quick Tests */
.quick-tests {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.quick-tests h4 {
  margin: 0 0 0.75rem 0;
  color: #2c3e50;
  font-size: 1rem;
}

.test-btn {
  padding: 0.5rem 0.75rem;
  background: var(--color-surface);
  color: var(--color-text-primary);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all var(--transition-base);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
}

.test-btn:hover {
  border-color: var(--color-primary-600);
  background: var(--color-primary-50);
  transform: translateY(-1px);
}

/* Main Controls */
.main-controls {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.input-group {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.input-group label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 500;
}

.input-group input {
  padding: 0.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  width: 120px;
}

.btn-start {
  padding: 0.5rem 1.5rem;
  background: var(--color-primary-600);
  color: var(--color-text-inverse);
  border: none;
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-base);
}

.btn-start:hover:not(:disabled) {
  background: var(--color-primary-700);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-start:disabled {
  background: var(--color-neutral-300);
  color: var(--color-neutral-600);
  cursor: not-allowed;
}

/* Player Controls */
.player-controls {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.btn-step, .btn-play {
  padding: 0.75rem 1.5rem;
  background: var(--color-surface);
  color: var(--color-text-primary);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
  font-weight: var(--font-weight-semibold);
  font-size: var(--text-sm);
}

.btn-step:hover:not(:disabled), .btn-play:hover {
  border-color: var(--color-secondary-600);
  background: var(--color-secondary-50);
}

.btn-step:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-play {
  background: var(--color-secondary-600);
  color: var(--color-text-inverse);
  border-color: var(--color-secondary-600);
  min-width: 120px;
}

.btn-reset-prominent {
  padding: 0.75rem 1.5rem;
  background: var(--color-error-600);
  color: var(--color-text-inverse);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: var(--font-weight-semibold);
}

.btn-reset-prominent:hover {
  background: var(--color-error-700);
  box-shadow: var(--shadow-md);
}

/* Speed Control */
.speed-control {
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.speed-control label {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 500;
}

.speed-slider {
  flex: 1;
  max-width: 300px;
}

.speed-label {
  min-width: 50px;
  font-weight: 700;
  color: #42b883;
}

/* Timeline */
.timeline {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-weight: 500;
  color: #666;
}

.timeline-slider {
  width: 100%;
  margin-bottom: 0.5rem;
}

.timeline-markers {
  position: relative;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
}

.marker {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #ccc;
  border-radius: 50%;
  transform: translate(-50%, -2px);
  transition: all 0.3s;
}

.marker.active {
  background: #42b883;
  width: 16px;
  height: 16px;
  transform: translate(-50%, -4px);
}

.marker.completed {
  background: #95d5b2;
}

/* Status Info */
.status-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.stat-card {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  border: 2px solid #e0e0e0;
}

.stat-card.success {
  border-color: #42b883;
  background: #e8f5e9;
}

.stat-card.failure {
  border-color: #e74c3c;
  background: #ffebee;
}

.stat-label {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
}

/* Visualization */
.visualization {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 1rem;
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
  cursor: pointer;
}

.array-cell:hover {
  transform: scale(1.05);
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

/* Contextual Explanation */
.contextual-explanation {
  background: #e8f5e9;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #42b883;
}

.explanation-header {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.explanation-content {
  line-height: 1.6;
  color: #333;
}

.explanation-content p {
  margin: 0.5rem 0;
}

.explanation-content code {
  background: #f0f0f0;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: monospace;
}

.explanation-tip {
  margin-top: 1rem;
  padding: 1rem;
  background: #fff3cd;
  border-radius: 6px;
  border-left: 4px solid #ffc107;
}

/* Code View */
.code-view {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
}

.code-view h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.code-view pre {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 1.5rem;
  border-radius: 6px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  line-height: 1.6;
}

.code-view code span {
  display: block;
  padding: 0.25rem 0.5rem;
  border-left: 3px solid transparent;
}

.code-view code span.highlighted {
  background: #ffd70080;
  border-left-color: #ffc107;
  font-weight: 600;
}
</style>
