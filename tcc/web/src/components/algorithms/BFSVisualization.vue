<template>
  <div class="bfs-viz">
    <div class="controls">
      <button @click="startBFS" :disabled="isRunning" class="btn-start">
        Iniciar BFS
      </button>
      <button @click="reset" class="btn-reset">Reset</button>
      <label>
        Velocidade:
        <input v-model.number="speed" type="range" min="100" max="2000" step="100" />
        {{ 2100 - speed }}ms
      </label>
    </div>

    <div class="info">
      <span v-if="!isRunning && visited.size > 0">
        Visitados: {{ visited.size }} nós
      </span>
      <span v-if="isRunning">
        Processando nó: {{ currentNode }}
      </span>
      <span v-if="isRunning">
        Fila: [{{ queue.join(', ') }}]
      </span>
    </div>

    <div class="visualization">
      <svg width="600" height="400" class="graph-svg">
        <!-- Edges -->
        <g>
          <line
            v-for="edge in edges"
            :key="`${edge.from}-${edge.to}`"
            :x1="nodes[edge.from].x"
            :y1="nodes[edge.from].y"
            :x2="nodes[edge.to].x"
            :y2="nodes[edge.to].y"
            class="edge"
          />
        </g>

        <!-- Nodes -->
        <g>
          <g v-for="(node, id) in nodes" :key="id">
            <circle
              :cx="node.x"
              :cy="node.y"
              :r="25"
              class="node"
              :class="{
                visited: visited.has(id),
                current: currentNode === id,
                inQueue: queue.includes(id)
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
              v-if="distance[id] !== Infinity && distance[id] !== undefined"
              :x="node.x"
              :y="node.y - 40"
              text-anchor="middle"
              class="distance-label"
            >
              d={{ distance[id] }}
            </text>
          </g>
        </g>
      </svg>

      <div class="legend">
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

    <div class="explanation">
      <h4>Como funciona</h4>
      <ol>
        <li>Inicia no nó 0 e o marca como visitado</li>
        <li>Adiciona o nó inicial na fila</li>
        <li>Enquanto a fila não estiver vazia:
          <ul>
            <li>Remove um nó da frente da fila</li>
            <li>Processa todos os vizinhos não visitados</li>
            <li>Marca vizinhos como visitados e adiciona na fila</li>
          </ul>
        </li>
        <li>A distância de cada nó é calculada automaticamente</li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const isRunning = ref(false)
const currentNode = ref(null)
const queue = ref([])
const visited = ref(new Set())
const distance = ref({})
const speed = ref(1000)

const nodes = reactive({
  0: { x: 300, y: 50 },
  1: { x: 150, y: 150 },
  2: { x: 450, y: 150 },
  3: { x: 100, y: 300 },
  4: { x: 250, y: 300 },
  5: { x: 400, y: 300 },
  6: { x: 550, y: 300 }
})

const edges = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 1, to: 3 },
  { from: 1, to: 4 },
  { from: 2, to: 5 },
  { from: 2, to: 6 },
  { from: 3, to: 4 }
]

const adjacencyList = reactive({
  0: [1, 2],
  1: [0, 3, 4],
  2: [0, 5, 6],
  3: [1, 4],
  4: [1, 3],
  5: [2],
  6: [2]
})

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const startBFS = async () => {
  reset()
  isRunning.value = true

  const startNode = 0
  queue.value = [startNode]
  visited.value.add(startNode)
  distance.value[startNode] = 0

  while (queue.value.length > 0) {
    await delay(2100 - speed.value)

    currentNode.value = queue.value.shift()
    await delay(2100 - speed.value)

    for (const neighbor of adjacencyList[currentNode.value]) {
      if (!visited.value.has(neighbor)) {
        visited.value.add(neighbor)
        distance.value[neighbor] = distance.value[currentNode.value] + 1
        queue.value.push(neighbor)
        await delay(2100 - speed.value)
      }
    }

    currentNode.value = null
  }

  isRunning.value = false
}

const reset = () => {
  isRunning.value = false
  currentNode.value = null
  queue.value = []
  visited.value = new Set()
  distance.value = {}
}
</script>

<style scoped>
.bfs-viz {
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
}

.controls input[type="range"] {
  width: 150px;
}

.controls button {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-start {
  background: #42b883;
  color: white;
}

.btn-start:hover:not(:disabled) {
  background: #35a372;
}

.btn-start:disabled {
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
  background: #f0f0f0;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-right: 1rem;
  font-family: monospace;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.visualization {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.graph-svg {
  display: block;
  margin: 0 auto;
  background: #fafafa;
  border-radius: 8px;
}

.edge {
  stroke: #ccc;
  stroke-width: 2;
}

.node {
  fill: white;
  stroke: #2c3e50;
  stroke-width: 2;
  transition: all 0.3s;
}

.node.inQueue {
  fill: #fff3cd;
  stroke: #ffc107;
  stroke-width: 3;
}

.node.current {
  fill: #ffeb3b;
  stroke: #f57c00;
  stroke-width: 4;
  animation: pulse 1s infinite;
}

.node.visited {
  fill: #42b883;
  stroke: #2c3e50;
}

@keyframes pulse {
  0%, 100% {
    r: 25;
  }
  50% {
    r: 28;
  }
}

.node-label {
  font-size: 16px;
  font-weight: 600;
  fill: #2c3e50;
  pointer-events: none;
}

.node.visited + .node-label {
  fill: white;
}

.distance-label {
  font-size: 12px;
  font-weight: 600;
  fill: #42b883;
}

.legend {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-box {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #2c3e50;
}

.legend-box.unvisited {
  background: white;
}

.legend-box.in-queue {
  background: #fff3cd;
  border-color: #ffc107;
}

.legend-box.current-node {
  background: #ffeb3b;
  border-color: #f57c00;
}

.legend-box.visited-node {
  background: #42b883;
}

.explanation {
  background: #e8f5e9;
  padding: 1.5rem;
  border-radius: 6px;
}

.explanation h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.explanation ol {
  margin-left: 1.5rem;
  line-height: 1.8;
}

.explanation ul {
  margin-left: 1.5rem;
  margin-top: 0.5rem;
}
</style>
