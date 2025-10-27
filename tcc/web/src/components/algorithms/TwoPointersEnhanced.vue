<template>
  <div class="two-pointers-enhanced">
    <div class="controls-section">
      <div class="main-controls">
        <h4>🎮 Controles</h4>
        <div class="player-controls">
          <button @click="reset" class="btn-reset" title="Reiniciar">🔄 Reset</button>
          <button @click="previousStep" :disabled="currentStep === 0" title="Passo anterior">⏮ Anterior</button>
          <button @click="togglePlay" :disabled="steps.length === 0" class="btn-play">
            {{ isPlaying ? '⏸ Pausar' : '▶ Play' }}
          </button>
          <button @click="nextStep" :disabled="currentStep >= steps.length - 1" title="Próximo passo">Próximo ⏭</button>
        </div>
      </div>

      <div class="speed-control">
        <h4>⚡ Velocidade</h4>
        <input
          v-model.number="speed"
          type="range"
          min="200"
          max="2000"
          step="200"
          class="speed-slider"
        />
        <span class="speed-label">{{ (2200 - speed) / 1000 }}x</span>
      </div>

      <div class="input-controls">
        <h4>🎯 Configuração</h4>
        <label>
          Soma alvo:
          <input v-model.number="targetSum" type="number" @change="generateNewSteps" />
        </label>
        <button @click="editArray" class="btn-edit">✏️ Editar Array</button>
      </div>
    </div>

    <div class="quick-tests">
      <h4>🧪 Testes Rápidos</h4>
      <button @click="loadTest1" class="btn-test">Caso 1: Encontrado no início</button>
      <button @click="loadTest2" class="btn-test">Caso 2: Encontrado no fim</button>
      <button @click="loadTest3" class="btn-test">Caso 3: Não encontrado</button>
      <button @click="loadTest4" class="btn-test">Caso 4: Array grande</button>
    </div>

    <div class="timeline-section" v-if="steps.length > 0">
      <div class="timeline-header">
        <h4>📊 Timeline</h4>
        <span class="step-counter">Passo {{ currentStep + 1 }} de {{ steps.length }}</span>
      </div>
      <input
        v-model.number="currentStep"
        type="range"
        :max="steps.length - 1"
        class="timeline-slider"
      />
      <div class="timeline-markers">
        <div
          v-for="(step, idx) in steps"
          :key="idx"
          class="timeline-marker"
          :class="{
            active: idx === currentStep,
            completed: idx < currentStep,
            found: step.found
          }"
          @click="currentStep = idx"
          :title="`Passo ${idx + 1}`"
        ></div>
      </div>
    </div>

    <div class="visualization-area">
      <div class="array-display">
        <h4>📋 Array e Ponteiros</h4>
        <div class="array-container">
          <div
            v-for="(value, index) in array"
            :key="index"
            class="array-cell"
            :class="{
              left: currentStepData && index === currentStepData.left,
              right: currentStepData && index === currentStepData.right,
              eliminated: currentStepData && (index < currentStepData.left || index > currentStepData.right),
              found: currentStepData && currentStepData.found && (index === currentStepData.left || index === currentStepData.right)
            }"
            @click="highlightCell(index)"
          >
            <div class="index">{{ index }}</div>
            <div class="value">{{ value }}</div>
            <div v-if="currentStepData && index === currentStepData.left" class="pointer left-pointer">
              LEFT
            </div>
            <div v-if="currentStepData && index === currentStepData.right" class="pointer right-pointer">
              RIGHT
            </div>
          </div>
        </div>
      </div>

      <div class="info-panel">
        <div class="statistics" v-if="currentStepData">
          <h4>📈 Estatísticas</h4>
          <div class="stat-item">
            <span class="stat-label">Iteração:</span>
            <span class="stat-value">{{ currentStepData.iteration }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">left:</span>
            <span class="stat-value">{{ currentStepData.left }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">right:</span>
            <span class="stat-value">{{ currentStepData.right }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Soma atual:</span>
            <span class="stat-value">{{ array[currentStepData.left] }} + {{ array[currentStepData.right] }} = {{ currentStepData.currentSum }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Espaço de busca:</span>
            <span class="stat-value">{{ currentStepData.searchSpace }} elementos</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Status:</span>
            <span class="stat-value" :class="{ success: currentStepData.found }">
              {{ currentStepData.found ? '✓ Encontrado!' : currentStepData.searchSpace === 0 ? '✗ Não encontrado' : '🔍 Buscando...' }}
            </span>
          </div>
        </div>

        <div class="contextual-explanation" v-if="currentStepData">
          <h4>💡 O que está acontecendo</h4>
          <div v-html="currentStepData.explanation"></div>
        </div>

        <div class="educational-tip" v-if="currentStepData">
          <h4>🎯 Dica Educacional</h4>
          <div>{{ currentStepData.tip }}</div>
        </div>
      </div>
    </div>

    <div class="code-section">
      <h4>💻 Código C++ (Two Pointers - Convergência)</h4>
      <pre><code><span v-for="(line, idx) in codeLines" :key="idx" :class="{ highlighted: idx === currentCodeLine }">{{ line }}</span></code></pre>
    </div>

    <div class="pattern-explanation">
      <h3>📚 Padrão de Convergência</h3>
      <p>
        Este padrão utiliza dois ponteiros que começam nas <strong>extremidades opostas</strong> do array
        e se movem em direção ao centro, baseando-se em alguma condição.
      </p>
      <div class="pattern-use-cases">
        <div class="use-case">
          <h4>✅ Quando usar</h4>
          <ul>
            <li>Array está ordenado</li>
            <li>Procurar par de elementos com soma específica</li>
            <li>Encontrar triplas ou pares com propriedades específicas</li>
            <li>Container With Most Water problem</li>
          </ul>
        </div>
        <div class="use-case">
          <h4>⚡ Vantagens</h4>
          <ul>
            <li>Reduz complexidade de O(n²) para O(n)</li>
            <li>Elimina espaço de busca em cada iteração</li>
            <li>Evita uso de estruturas auxiliares</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const array = ref([2, 5, 8, 12, 16, 23, 38, 45, 56])
const targetSum = ref(50)
const steps = ref([])
const currentStep = ref(0)
const isPlaying = ref(false)
const speed = ref(1000)
let playInterval = null

const codeLines = [
  'bool findPair(vector<int>& arr, int target) {',
  '  int left = 0;',
  '  int right = arr.size() - 1;',
  '  ',
  '  while (left < right) {',
  '    int sum = arr[left] + arr[right];',
  '    ',
  '    if (sum == target) {',
  '      return true;  // Par encontrado',
  '    }',
  '    else if (sum < target) {',
  '      left++;  // Precisamos de soma maior',
  '    }',
  '    else {',
  '      right--;  // Precisamos de soma menor',
  '    }',
  '  }',
  '  ',
  '  return false;  // Nenhum par encontrado',
  '}'
]

const currentCodeLine = ref(-1)

const currentStepData = computed(() => {
  if (steps.value.length === 0) return null
  return steps.value[currentStep.value]
})

const generateSteps = () => {
  const stepsArray = []
  let left = 0
  let right = array.value.length - 1
  let iteration = 0

  stepsArray.push({
    left,
    right,
    iteration: 0,
    currentSum: array.value[left] + array.value[right],
    searchSpace: right - left + 1,
    found: false,
    explanation: `<strong>Inicialização:</strong><br>- LEFT aponta para o primeiro elemento (índice 0)<br>- RIGHT aponta para o último elemento (índice ${right})<br>- Soma alvo: ${targetSum.value}`,
    tip: 'Em arrays ordenados, podemos usar dois ponteiros para reduzir a complexidade',
    codeLine: 1
  })

  while (left < right) {
    iteration++
    const currentSum = array.value[left] + array.value[right]

    stepsArray.push({
      left,
      right,
      iteration,
      currentSum,
      searchSpace: right - left + 1,
      found: false,
      explanation: `<strong>Iteração ${iteration}:</strong><br>- LEFT = ${left}, RIGHT = ${right}<br>- Soma atual: ${array.value[left]} + ${array.value[right]} = ${currentSum}<br>- Soma alvo: ${targetSum.value}<br>- ${currentSum === targetSum.value ? '✓ Soma igual!' : currentSum < targetSum.value ? 'Soma muito pequena' : 'Soma muito grande'}`,
      tip: `${currentSum < targetSum.value ? 'Como array está ordenado, aumentar LEFT aumenta a soma' : currentSum > targetSum.value ? 'Como array está ordenado, diminuir RIGHT diminui a soma' : 'Par encontrado!'}`,
      codeLine: 5
    })

    if (currentSum === targetSum.value) {
      stepsArray.push({
        left,
        right,
        iteration,
        currentSum,
        searchSpace: right - left + 1,
        found: true,
        explanation: `<strong>✓ Par Encontrado!</strong><br>- ${array.value[left]} + ${array.value[right]} = ${targetSum.value}<br>- Índices: [${left}, ${right}]<br>- Total de iterações: ${iteration}`,
        tip: `Complexidade: O(n) - muito melhor que O(n²) da busca de força bruta`,
        codeLine: 8
      })
      return stepsArray
    }

    if (currentSum < targetSum.value) {
      stepsArray.push({
        left: left + 1,
        right,
        iteration,
        currentSum,
        searchSpace: right - left,
        found: false,
        explanation: `<strong>Movendo LEFT para a direita:</strong><br>- Soma atual (${currentSum}) < Soma alvo (${targetSum.value})<br>- Incrementamos LEFT de ${left} para ${left + 1}<br>- Novo valor: ${array.value[left + 1]}`,
        tip: 'Aumentar LEFT aumenta a soma porque o array está ordenado',
        codeLine: 11
      })
      left++
    } else {
      stepsArray.push({
        left,
        right: right - 1,
        iteration,
        currentSum,
        searchSpace: right - left,
        found: false,
        explanation: `<strong>Movendo RIGHT para a esquerda:</strong><br>- Soma atual (${currentSum}) > Soma alvo (${targetSum.value})<br>- Decrementamos RIGHT de ${right} para ${right - 1}<br>- Novo valor: ${array.value[right - 1]}`,
        tip: 'Diminuir RIGHT diminui a soma porque o array está ordenado',
        codeLine: 14
      })
      right--
    }
  }

  stepsArray.push({
    left,
    right,
    iteration,
    currentSum: 0,
    searchSpace: 0,
    found: false,
    explanation: `<strong>✗ Par Não Encontrado</strong><br>- LEFT e RIGHT se cruzaram<br>- Exploramos todo o array<br>- Nenhum par soma ${targetSum.value}<br>- Total de iterações: ${iteration}`,
    tip: 'Se os ponteiros se cruzam sem encontrar, não existe solução',
    codeLine: 18
  })

  return stepsArray
}

const generateNewSteps = () => {
  currentStep.value = 0
  isPlaying.value = false
  if (playInterval) {
    clearInterval(playInterval)
    playInterval = null
  }
  steps.value = generateSteps()
}

const reset = () => {
  generateNewSteps()
}

const togglePlay = () => {
  if (isPlaying.value) {
    isPlaying.value = false
    if (playInterval) {
      clearInterval(playInterval)
      playInterval = null
    }
  } else {
    isPlaying.value = true
    playInterval = setInterval(() => {
      if (currentStep.value < steps.value.length - 1) {
        currentStep.value++
      } else {
        isPlaying.value = false
        clearInterval(playInterval)
        playInterval = null
      }
    }, speed.value)
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

const loadTest1 = () => {
  array.value = [1, 3, 5, 7, 9, 11]
  targetSum.value = 8
  generateNewSteps()
}

const loadTest2 = () => {
  array.value = [2, 5, 8, 12, 16, 23, 38, 45, 56]
  targetSum.value = 101
  generateNewSteps()
}

const loadTest3 = () => {
  array.value = [1, 2, 3, 4, 5]
  targetSum.value = 100
  generateNewSteps()
}

const loadTest4 = () => {
  array.value = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80]
  targetSum.value = 95
  generateNewSteps()
}

const editArray = () => {
  const input = prompt('Digite o array (separado por vírgulas):', array.value.join(', '))
  if (input) {
    const newArray = input.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x))
    if (newArray.length > 0) {
      newArray.sort((a, b) => a - b)
      array.value = newArray
      generateNewSteps()
    }
  }
}

const highlightCell = (index) => {
  console.log(`Célula ${index}: ${array.value[index]}`)
}

watch(speed, () => {
  if (isPlaying.value) {
    clearInterval(playInterval)
    playInterval = setInterval(() => {
      if (currentStep.value < steps.value.length - 1) {
        currentStep.value++
      } else {
        isPlaying.value = false
        clearInterval(playInterval)
        playInterval = null
      }
    }, speed.value)
  }
})

watch(currentStepData, (newData) => {
  if (newData) {
    currentCodeLine.value = newData.codeLine
  }
})

// Initialize
steps.value = generateSteps()
</script>

<style scoped>
.two-pointers-enhanced {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
}

.controls-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.main-controls,
.speed-control,
.input-controls {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
}

.main-controls h4,
.speed-control h4,
.input-controls h4 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
  font-size: 1rem;
}

.player-controls {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.player-controls button,
.btn-test,
.btn-edit {
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s;
  white-space: nowrap;
}

.btn-play {
  background: #42b883;
  color: white;
  flex: 1;
}

.btn-play:hover:not(:disabled) {
  background: #35a372;
  transform: translateY(-2px);
}

.btn-reset {
  background: #95a5a6;
  color: white;
}

.btn-reset:hover {
  background: #7f8c8d;
}

.player-controls button:disabled {
  background: #ccc;
  cursor: not-allowed;
  opacity: 0.6;
}

.speed-control {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.speed-slider {
  width: 100%;
}

.speed-label {
  text-align: center;
  font-weight: 600;
  color: #42b883;
}

.input-controls {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.input-controls label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 500;
}

.input-controls input {
  padding: 0.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
}

.btn-edit {
  background: var(--color-primary-600);
  color: var(--color-text-inverse);
}

.btn-edit:hover {
  background: var(--color-primary-700);
  box-shadow: var(--shadow-md);
}

.quick-tests {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  margin-bottom: 1.5rem;
}

.quick-tests h4 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
}

.quick-tests {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.btn-test {
  background: var(--color-primary-600);
  color: var(--color-text-inverse);
  text-align: left;
}

.btn-test:hover {
  background: var(--color-primary-700);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.timeline-section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  border: 2px solid #e0e0e0;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.timeline-header h4 {
  margin: 0;
  color: #2c3e50;
}

.step-counter {
  font-weight: 600;
  color: #42b883;
}

.timeline-slider {
  width: 100%;
  margin-bottom: 0.5rem;
}

.timeline-markers {
  display: flex;
  gap: 2px;
  height: 8px;
}

.timeline-marker {
  flex: 1;
  background: #e0e0e0;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 2px;
}

.timeline-marker:hover {
  background: #42b883;
  transform: scaleY(1.5);
}

.timeline-marker.completed {
  background: #95a5a6;
}

.timeline-marker.active {
  background: #42b883;
  transform: scaleY(2);
}

.timeline-marker.found {
  background: #f39c12;
}

.visualization-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.array-display {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
}

.array-display h4 {
  margin: 0 0 1.5rem 0;
  color: #2c3e50;
}

.array-container {
  display: flex;
  gap: 0.25rem;
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
  cursor: pointer;
}

.array-cell:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

.info-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.statistics,
.contextual-explanation,
.educational-tip {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
}

.statistics h4,
.contextual-explanation h4,
.educational-tip h4 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
  font-size: 1rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.stat-item:last-child {
  border-bottom: none;
}

.stat-label {
  color: #666;
}

.stat-value {
  font-weight: 700;
  color: #42b883;
  font-family: monospace;
}

.stat-value.success {
  color: #27ae60;
}

.contextual-explanation {
  border-left: 4px solid #42b883;
  line-height: 1.8;
}

.educational-tip {
  background: var(--color-primary-50);
  border: 2px solid var(--color-primary-300);
  color: var(--color-text-primary);
  font-style: italic;
}

.code-section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  margin-bottom: 2rem;
}

.code-section h4 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
}

.code-section pre {
  background: #2c3e50;
  padding: 1.5rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 0;
}

.code-section code {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #ecf0f1;
}

.code-section code span {
  display: block;
  padding: 0.1rem 0;
  transition: all 0.3s;
}

.code-section code span.highlighted {
  background: #42b88330;
  border-left: 3px solid #42b883;
  padding-left: 0.5rem;
  margin-left: -0.5rem;
}

.pattern-explanation {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
}

.pattern-explanation h3 {
  color: #2c3e50;
  margin: 0 0 1rem 0;
}

.pattern-explanation p {
  line-height: 1.8;
  color: #555;
  margin-bottom: 1.5rem;
}

.pattern-use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.use-case {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 6px;
}

.use-case h4 {
  color: #2c3e50;
  margin: 0 0 0.75rem 0;
}

.use-case ul {
  margin: 0;
  padding-left: 1.5rem;
  line-height: 1.8;
}

@media (max-width: 1200px) {
  .visualization-area {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .controls-section {
    grid-template-columns: 1fr;
  }

  .player-controls {
    flex-direction: column;
  }

  .player-controls button {
    width: 100%;
  }

  .quick-tests {
    grid-template-columns: 1fr;
  }
}
</style>
