<template>
  <div class="bfs-enhanced">
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

      <div class="quick-tests">
        <h4>🧪 Testes Rápidos</h4>
        <button @click="loadSmallGraph" class="btn-test">Grafo Pequeno (4 nós)</button>
        <button @click="loadMediumGraph" class="btn-test">Grafo Médio (7 nós)</button>
        <button @click="loadLargeGraph" class="btn-test">Grafo Grande (10 nós)</button>
      </div>
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
            'queue-step': step.action === 'enqueue',
            'process-step': step.action === 'process',
            'complete-step': step.action === 'complete'
          }"
          @click="currentStep = idx"
          :title="`Passo ${idx + 1}: ${step.action}`"
        ></div>
      </div>
    </div>

    <div class="visualization-area">
      <div class="graph-container">
        <svg width="700" height="500" class="graph-svg">
          <!-- Edges -->
          <g>
            <line
              v-for="edge in currentEdges"
              :key="`${edge.from}-${edge.to}`"
              :x1="currentNodes[edge.from].x"
              :y1="currentNodes[edge.from].y"
              :x2="currentNodes[edge.to].x"
              :y2="currentNodes[edge.to].y"
              class="edge"
              :class="{
                explored: currentStepData && isEdgeExplored(edge.from, edge.to),
                active: currentStepData && isEdgeActive(edge.from, edge.to)
              }"
            />
          </g>

          <!-- Nodes -->
          <g>
            <g v-for="(node, id) in currentNodes" :key="id">
              <circle
                :cx="node.x"
                :cy="node.y"
                :r="30"
                class="node"
                :class="{
                  visited: currentStepData && currentStepData.visited.has(parseInt(id)),
                  current: currentStepData && currentStepData.currentNode === parseInt(id),
                  inQueue: currentStepData && currentStepData.queue.includes(parseInt(id)),
                  start: parseInt(id) === 0
                }"
              />
              <text
                :x="node.x"
                :y="node.y"
                text-anchor="middle"
                dominant-baseline="middle"
                class="node-label"
              >
                {{ id }}
              </text>
              <text
                v-if="currentStepData && currentStepData.distance[id] !== undefined && currentStepData.distance[id] !== Infinity"
                :x="node.x"
                :y="node.y - 45"
                text-anchor="middle"
                class="distance-label"
              >
                d={{ currentStepData.distance[id] }}
              </text>
            </g>
          </g>
        </svg>

        <div class="legend">
          <div class="legend-item">
            <div class="legend-box start"></div>
            <span>Início (nó 0)</span>
          </div>
          <div class="legend-item">
            <div class="legend-box unvisited"></div>
            <span>Não visitado</span>
          </div>
          <div class="legend-item">
            <div class="legend-box in-queue"></div>
            <span>Na fila</span>
          </div>
          <div class="legend-item">
            <div class="legend-box current-node"></div>
            <span>Processando</span>
          </div>
          <div class="legend-item">
            <div class="legend-box visited-node"></div>
            <span>Visitado</span>
          </div>
        </div>
      </div>

      <div class="info-panel">
        <div class="statistics" v-if="currentStepData">
          <h4>📈 Estatísticas</h4>
          <div class="stat-item">
            <span class="stat-label">Nós visitados:</span>
            <span class="stat-value">{{ currentStepData.visited.size }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Nós na fila:</span>
            <span class="stat-value">{{ currentStepData.queue.length }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Nó atual:</span>
            <span class="stat-value">{{ currentStepData.currentNode !== null ? currentStepData.currentNode : '-' }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Fila:</span>
            <span class="stat-value">{{ currentStepData.queue.length > 0 ? '[' + currentStepData.queue.join(', ') + ']' : '[]' }}</span>
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
      <h4>💻 Código C++ (STL)</h4>
      <pre><code><span v-for="(line, idx) in codeLines" :key="idx" :class="{ highlighted: idx === currentCodeLine }">{{ line }}</span></code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Graph configurations
const graphConfigs = {
  small: {
    nodes: {
      0: { x: 200, y: 100 },
      1: { x: 100, y: 250 },
      2: { x: 300, y: 250 },
      3: { x: 200, y: 350 }
    },
    edges: [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 3 }
    ],
    adjacency: {
      0: [1, 2],
      1: [0, 3],
      2: [0, 3],
      3: [1, 2]
    }
  },
  medium: {
    nodes: {
      0: { x: 350, y: 80 },
      1: { x: 200, y: 180 },
      2: { x: 500, y: 180 },
      3: { x: 120, y: 320 },
      4: { x: 280, y: 320 },
      5: { x: 420, y: 320 },
      6: { x: 560, y: 320 }
    },
    edges: [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 1, to: 3 },
      { from: 1, to: 4 },
      { from: 2, to: 5 },
      { from: 2, to: 6 },
      { from: 3, to: 4 }
    ],
    adjacency: {
      0: [1, 2],
      1: [0, 3, 4],
      2: [0, 5, 6],
      3: [1, 4],
      4: [1, 3],
      5: [2],
      6: [2]
    }
  },
  large: {
    nodes: {
      0: { x: 350, y: 50 },
      1: { x: 200, y: 150 },
      2: { x: 500, y: 150 },
      3: { x: 100, y: 280 },
      4: { x: 250, y: 280 },
      5: { x: 450, y: 280 },
      6: { x: 600, y: 280 },
      7: { x: 150, y: 410 },
      8: { x: 350, y: 410 },
      9: { x: 550, y: 410 }
    },
    edges: [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 1, to: 3 },
      { from: 1, to: 4 },
      { from: 2, to: 5 },
      { from: 2, to: 6 },
      { from: 3, to: 7 },
      { from: 4, to: 7 },
      { from: 4, to: 8 },
      { from: 5, to: 8 },
      { from: 6, to: 9 }
    ],
    adjacency: {
      0: [1, 2],
      1: [0, 3, 4],
      2: [0, 5, 6],
      3: [1, 7],
      4: [1, 7, 8],
      5: [2, 8],
      6: [2, 9],
      7: [3, 4],
      8: [4, 5],
      9: [6]
    }
  }
}

const currentNodes = ref({ ...graphConfigs.medium.nodes })
const currentEdges = ref([...graphConfigs.medium.edges])
const currentAdjacency = ref({ ...graphConfigs.medium.adjacency })

const steps = ref([])
const currentStep = ref(0)
const isPlaying = ref(false)
const speed = ref(1000)
let playInterval = null

const codeLines = [
  'void bfs(int start) {',
  '  queue<int> q;',
  '  vector<bool> visited(n, false);',
  '  vector<int> dist(n, INF);',
  '  ',
  '  q.push(start);',
  '  visited[start] = true;',
  '  dist[start] = 0;',
  '  ',
  '  while (!q.empty()) {',
  '    int u = q.front();',
  '    q.pop();',
  '    ',
  '    for (int v : adj[u]) {',
  '      if (!visited[v]) {',
  '        visited[v] = true;',
  '        dist[v] = dist[u] + 1;',
  '        q.push(v);',
  '      }',
  '    }',
  '  }',
  '}'
]

const currentCodeLine = ref(-1)

const currentStepData = computed(() => {
  if (steps.value.length === 0) return null
  return steps.value[currentStep.value]
})

const isEdgeExplored = (from, to) => {
  if (!currentStepData.value) return false
  const visited = currentStepData.value.visited
  return visited.has(from) && visited.has(to)
}

const isEdgeActive = (from, to) => {
  if (!currentStepData.value) return false
  const current = currentStepData.value.currentNode
  return current === from || current === to
}

const generateSteps = () => {
  const stepsArray = []
  const visited = new Set()
  const queue = []
  const distance = {}

  const startNode = 0
  queue.push(startNode)
  visited.add(startNode)
  distance[startNode] = 0

  stepsArray.push({
    action: 'start',
    visited: new Set([startNode]),
    queue: [startNode],
    distance: { ...distance },
    currentNode: null,
    explanation: `<strong>Inicialização:</strong><br>- Começamos no nó 0<br>- Marcamos como visitado e adicionamos na fila<br>- Distância do nó 0 para ele mesmo é 0`,
    tip: 'BFS sempre visita nós em ordem crescente de distância da origem',
    codeLine: 5
  })

  while (queue.length > 0) {
    const current = queue.shift()

    stepsArray.push({
      action: 'process',
      visited: new Set(visited),
      queue: [...queue],
      distance: { ...distance },
      currentNode: current,
      explanation: `<strong>Processando nó ${current}:</strong><br>- Removemos o nó ${current} da frente da fila<br>- Vamos explorar seus vizinhos: ${currentAdjacency.value[current].join(', ')}`,
      tip: `Fila atual tem ${queue.length} nó(s). BFS usa FIFO (First In, First Out)`,
      codeLine: 10
    })

    for (const neighbor of currentAdjacency.value[current]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        distance[neighbor] = distance[current] + 1
        queue.push(neighbor)

        stepsArray.push({
          action: 'enqueue',
          visited: new Set(visited),
          queue: [...queue],
          distance: { ...distance },
          currentNode: current,
          exploringNeighbor: neighbor,
          explanation: `<strong>Descobrindo vizinho ${neighbor}:</strong><br>- Nó ${neighbor} não foi visitado<br>- Marcamos como visitado<br>- Distância = ${distance[neighbor]} (distância do nó ${current} + 1)<br>- Adicionamos ${neighbor} na fila`,
          tip: `A distância ${distance[neighbor]} é a menor possível, pois BFS explora por camadas`,
          codeLine: 15
        })
      }
    }
  }

  stepsArray.push({
    action: 'complete',
    visited: new Set(visited),
    queue: [],
    distance: { ...distance },
    currentNode: null,
    explanation: `<strong>BFS Completo!</strong><br>- Fila vazia, todos os nós alcançáveis foram visitados<br>- Total de nós visitados: ${visited.size}<br>- Todas as distâncias mínimas foram calculadas`,
    tip: 'Complexidade: O(V + E) onde V = nós e E = arestas',
    codeLine: 21
  })

  return stepsArray
}

const loadSmallGraph = () => {
  currentNodes.value = { ...graphConfigs.small.nodes }
  currentEdges.value = [...graphConfigs.small.edges]
  currentAdjacency.value = { ...graphConfigs.small.adjacency }
  reset()
  steps.value = generateSteps()
}

const loadMediumGraph = () => {
  currentNodes.value = { ...graphConfigs.medium.nodes }
  currentEdges.value = [...graphConfigs.medium.edges]
  currentAdjacency.value = { ...graphConfigs.medium.adjacency }
  reset()
  steps.value = generateSteps()
}

const loadLargeGraph = () => {
  currentNodes.value = { ...graphConfigs.large.nodes }
  currentEdges.value = [...graphConfigs.large.edges]
  currentAdjacency.value = { ...graphConfigs.large.adjacency }
  reset()
  steps.value = generateSteps()
}

const reset = () => {
  currentStep.value = 0
  isPlaying.value = false
  if (playInterval) {
    clearInterval(playInterval)
    playInterval = null
  }
  steps.value = generateSteps()
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
.bfs-enhanced {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
}

.controls-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.main-controls,
.speed-control,
.quick-tests {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
}

.main-controls h4,
.speed-control h4,
.quick-tests h4 {
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
.btn-test {
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

.quick-tests {
  display: flex;
  flex-direction: column;
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

.timeline-marker.process-step {
  background: #ffc107;
}

.timeline-marker.enqueue-step {
  background: #3498db;
}

.visualization-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.graph-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
}

.graph-svg {
  display: block;
  width: 100%;
  height: auto;
  background: #fafafa;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.edge {
  stroke: #ccc;
  stroke-width: 2;
  transition: all 0.3s;
}

.edge.explored {
  stroke: #42b883;
  stroke-width: 3;
}

.edge.active {
  stroke: #ffc107;
  stroke-width: 4;
}

.node {
  fill: white;
  stroke: #2c3e50;
  stroke-width: 2;
  transition: all 0.3s;
  cursor: pointer;
}

.node.start {
  stroke: #667eea;
  stroke-width: 3;
}

.node.inQueue {
  fill: #fff3cd;
  stroke: #ffc107;
  stroke-width: 3;
}

.node.current {
  fill: #ffc107;
  stroke: #f57c00;
  stroke-width: 4;
  animation: pulse 1s infinite;
}

.node.visited {
  fill: #42b883;
  stroke: #2c3e50;
}

@keyframes pulse {
  0%, 100% { r: 30; }
  50% { r: 33; }
}

.node-label {
  font-size: 18px;
  font-weight: 700;
  fill: #2c3e50;
  pointer-events: none;
}

.node.visited + .node-label {
  fill: white;
}

.distance-label {
  font-size: 13px;
  font-weight: 700;
  fill: #42b883;
  pointer-events: none;
}

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.legend-box {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #2c3e50;
}

.legend-box.start {
  background: white;
  border-color: #667eea;
  border-width: 3px;
}

.legend-box.unvisited {
  background: white;
}

.legend-box.in-queue {
  background: #fff3cd;
  border-color: #ffc107;
}

.legend-box.current-node {
  background: #ffc107;
  border-color: #f57c00;
}

.legend-box.visited-node {
  background: #42b883;
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
}
</style>
