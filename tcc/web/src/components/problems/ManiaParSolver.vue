<template>
  <div class="mania-par-solver">
    <div class="problem-statement">
      <h4>Mania de Par (2015)</h4>
      <p>
        Patrícia só viaja por estradas onde o número de pedágios seja PAR.
        Encontre o menor custo para ir da cidade 1 até a cidade C com um número par de pedágios.
      </p>
    </div>

    <div class="input-section">
      <h4>Configuração do Grafo</h4>

      <div class="preset-buttons">
        <button @click="loadPreset('example1')" class="btn-preset">
          Exemplo 1 (Resposta: 5)
        </button>
        <button @click="loadPreset('example2')" class="btn-preset">
          Exemplo 2 (Resposta: -1)
        </button>
        <button @click="loadPreset('example3')" class="btn-preset">
          Exemplo 3 (Resposta: 7)
        </button>
      </div>

      <div class="graph-input">
        <div class="input-row">
          <label>
            C (cidades):
            <input v-model.number="C" type="number" min="2" max="10" />
          </label>
          <label>
            V (estradas):
            <input v-model.number="V" type="number" min="1" max="20" />
          </label>
        </div>

        <div class="edges-input">
          <h5>Estradas (u v custo):</h5>
          <div v-for="(edge, index) in edges" :key="index" class="edge-input">
            <input v-model.number="edge.u" type="number" placeholder="u" min="1" :max="C" />
            <input v-model.number="edge.v" type="number" placeholder="v" min="1" :max="C" />
            <input v-model.number="edge.cost" type="number" placeholder="custo" min="1" />
            <button @click="removeEdge(index)" class="btn-remove-edge">×</button>
          </div>
          <button @click="addEdge" class="btn-add-edge">+ Adicionar Estrada</button>
        </div>

        <button @click="solve" :disabled="!isValidInput" class="btn-solve">
          Resolver com Dijkstra
        </button>
        <p v-if="!isValidInput" class="warning">
          ⚠ Verifique que todas as estradas estão preenchidas corretamente
        </p>
      </div>
    </div>

    <div v-if="solved" class="solution-section">
      <h4>Solução com Dijkstra + Estado de Paridade</h4>

      <div class="concept-explanation">
        <h5>💡 Conceito: Duplicação de Estados</h5>
        <p>
          Como o Dijkstra tradicional não rastreia o número de arestas, precisamos
          <strong>duplicar o espaço de estados</strong>:
        </p>
        <div class="state-explanation">
          <div class="state-box par">
            <strong>Estado (v, PAR)</strong>
            <p>Menor custo para chegar em v com número PAR de pedágios</p>
          </div>
          <div class="state-box impar">
            <strong>Estado (v, ÍMPAR)</strong>
            <p>Menor custo para chegar em v com número ÍMPAR de pedágios</p>
          </div>
        </div>
        <p>
          <strong>Transição:</strong> Uma aresta de u para v com custo w:
          <br>
          • (u, PAR) → (v, ÍMPAR) com custo w
          <br>
          • (u, ÍMPAR) → (v, PAR) com custo w
        </p>
      </div>

      <div class="visualization">
        <h5>Grafo e Distâncias</h5>
        <div class="graph-display">
          <svg :width="graphWidth" :height="graphHeight" class="graph-svg">
            <!-- Edges -->
            <g>
              <line
                v-for="(edge, idx) in visualEdges"
                :key="`edge-${idx}`"
                :x1="nodePositions[edge.u].x"
                :y1="nodePositions[edge.u].y"
                :x2="nodePositions[edge.v].x"
                :y2="nodePositions[edge.v].y"
                class="edge"
                :class="{ 'in-path': edge.inPath }"
              />
              <!-- Edge labels -->
              <text
                v-for="(edge, idx) in visualEdges"
                :key="`label-${idx}`"
                :x="(nodePositions[edge.u].x + nodePositions[edge.v].x) / 2"
                :y="(nodePositions[edge.u].y + nodePositions[edge.v].y) / 2 - 5"
                class="edge-label"
              >
                {{ edge.cost }}
              </text>
            </g>

            <!-- Nodes -->
            <g>
              <g v-for="city in C" :key="city">
                <circle
                  :cx="nodePositions[city].x"
                  :cy="nodePositions[city].y"
                  :r="30"
                  class="node"
                  :class="{
                    start: city === 1,
                    end: city === C,
                    'in-path': isInPath(city)
                  }"
                />
                <text
                  :x="nodePositions[city].x"
                  :y="nodePositions[city].y"
                  text-anchor="middle"
                  dominant-baseline="middle"
                  class="node-label"
                >
                  {{ city }}
                </text>
              </g>
            </g>
          </svg>
        </div>

        <div class="distances-table">
          <h5>Tabela de Distâncias</h5>
          <table>
            <thead>
              <tr>
                <th>Cidade</th>
                <th class="par-col">PAR</th>
                <th class="impar-col">ÍMPAR</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="city in C" :key="city">
                <td><strong>{{ city }}</strong></td>
                <td class="par-col">
                  {{ dist[city][0] === Infinity ? '∞' : dist[city][0] }}
                </td>
                <td class="impar-col">
                  {{ dist[city][1] === Infinity ? '∞' : dist[city][1] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="result">
        <div class="result-value" :class="{ impossible: result === -1 }">
          <strong>Resposta:</strong>
          {{ result === -1 ? 'Impossível (-1)' : `${result} reais` }}
        </div>
        <div v-if="result !== -1" class="result-explanation">
          Patrícia chegará à cidade {{ C }} com {{ result }} reais,
          passando por um número PAR de pedágios.
        </div>
      </div>

      <div class="code-section">
        <h5>Implementação em C++:</h5>
        <pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;queue&gt;
#include &lt;tuple&gt;

using ll = long long;
using state = std::tuple&lt;ll, int, int&gt;; // {custo, vertice, paridade}

const int MAXC = 10005;
const ll INFINITO = 1e18;

int C, V;
std::vector&lt;std::pair&lt;int, int&gt;&gt; adj[MAXC];
ll dist[MAXC][2]; // dist[v][0] -> par, dist[v][1] -> impar

void dijkstra() {
    for (int i = 1; i &lt;= C; ++i) {
        dist[i][0] = dist[i][1] = INFINITO;
    }

    std::priority_queue&lt;state, std::vector&lt;state&gt;, std::greater&lt;state&gt;&gt; pq;

    // Inicia na cidade 1 (paridade 0 - par) com custo 0
    dist[1][0] = 0;
    pq.emplace(0, 1, 0);

    while (!pq.empty()) {
        auto [d_u, u, paridade_u] = pq.top();
        pq.pop();

        if (d_u &gt; dist[u][paridade_u]) {
            continue;
        }

        for (auto& edge : adj[u]) {
            int v = edge.first;
            int w = edge.second;
            int nova_paridade = !paridade_u;

            if (dist[u][paridade_u] + w &lt; dist[v][nova_paridade]) {
                dist[v][nova_paridade] = dist[u][paridade_u] + w;
                pq.emplace(dist[v][nova_paridade], v, nova_paridade);
            }
        }
    }
}

int main() {
    std::cin &gt;&gt; C &gt;&gt; V;
    for (int i = 0; i &lt; V; ++i) {
        int u, v, g;
        std::cin &gt;&gt; u &gt;&gt; v &gt;&gt; g;
        adj[u].push_back({v, g});
        adj[v].push_back({u, g});
    }

    dijkstra();

    ll resultado = dist[C][0];
    if (resultado == INFINITO) {
        std::cout &lt;&lt; -1 &lt;&lt; std::endl;
    } else {
        std::cout &lt;&lt; resultado &lt;&lt; std::endl;
    }

    return 0;
}</code></pre>
      </div>

      <div class="complexity-analysis">
        <h5>Análise de Complexidade</h5>
        <p><strong>Tempo:</strong> O(V log C) - Dijkstra com 2×C vértices e 2×V arestas</p>
        <p><strong>Espaço:</strong> O(C + V) - Lista de adjacência e array de distâncias</p>
        <p>
          Para C ≤ 10.000 e V ≤ 50.000, a solução é eficiente o suficiente
          para os limites da competição.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const C = ref(4)
const V = ref(4)
const edges = ref([
  { u: 1, v: 2, cost: 3 },
  { u: 2, v: 4, cost: 2 },
  { u: 1, v: 3, cost: 4 },
  { u: 3, v: 4, cost: 1 }
])

const solved = ref(false)
const dist = ref({})
const result = ref(0)
const path = ref([])

const graphWidth = 600
const graphHeight = 400

const Infinity = Number.POSITIVE_INFINITY

const isValidInput = computed(() => {
  return edges.value.length > 0 &&
         edges.value.every(e => e.u && e.v && e.cost && e.u <= C.value && e.v <= C.value)
})

const nodePositions = computed(() => {
  const positions = {}
  const centerX = graphWidth / 2
  const centerY = graphHeight / 2
  const radius = Math.min(centerX, centerY) - 50

  for (let i = 1; i <= C.value; i++) {
    const angle = (2 * Math.PI * (i - 1)) / C.value - Math.PI / 2
    positions[i] = {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    }
  }

  return positions
})

const visualEdges = computed(() => {
  return edges.value.map(e => ({
    u: e.u,
    v: e.v,
    cost: e.cost,
    inPath: false // Poderia implementar destaque do caminho
  }))
})

const isInPath = (city) => {
  return path.value.includes(city)
}

const addEdge = () => {
  edges.value.push({ u: null, v: null, cost: null })
}

const removeEdge = (index) => {
  edges.value.splice(index, 1)
}

const loadPreset = (preset) => {
  if (preset === 'example1') {
    C.value = 4
    V.value = 4
    edges.value = [
      { u: 1, v: 2, cost: 3 },
      { u: 2, v: 4, cost: 2 },
      { u: 1, v: 3, cost: 4 },
      { u: 3, v: 4, cost: 1 }
    ]
  } else if (preset === 'example2') {
    C.value = 2
    V.value = 0
    edges.value = []
  } else if (preset === 'example3') {
    C.value = 5
    V.value = 5
    edges.value = [
      { u: 1, v: 2, cost: 2 },
      { u: 2, v: 3, cost: 1 },
      { u: 3, v: 4, cost: 1 },
      { u: 4, v: 5, cost: 3 },
      { u: 1, v: 5, cost: 10 }
    ]
  }
  solved.value = false
}

const solve = () => {
  // Construir lista de adjacência
  const adj = {}
  for (let i = 1; i <= C.value; i++) {
    adj[i] = []
  }

  for (const edge of edges.value) {
    adj[edge.u].push({ v: edge.v, cost: edge.cost })
    adj[edge.v].push({ v: edge.u, cost: edge.cost })
  }

  // Inicializar distâncias
  const distances = {}
  for (let i = 1; i <= C.value; i++) {
    distances[i] = [Infinity, Infinity]
  }

  // Dijkstra com estados (cidade, paridade)
  const pq = [] // Simular priority queue com array
  distances[1][0] = 0
  pq.push({ cost: 0, city: 1, parity: 0 })

  while (pq.length > 0) {
    // Ordenar por custo (simulação de priority queue)
    pq.sort((a, b) => a.cost - b.cost)
    const { cost: d_u, city: u, parity: parity_u } = pq.shift()

    if (d_u > distances[u][parity_u]) {
      continue
    }

    for (const { v, cost: w } of adj[u]) {
      const new_parity = 1 - parity_u
      const new_cost = distances[u][parity_u] + w

      if (new_cost < distances[v][new_parity]) {
        distances[v][new_parity] = new_cost
        pq.push({ cost: new_cost, city: v, parity: new_parity })
      }
    }
  }

  dist.value = distances

  // Resultado é dist[C][0] (paridade par)
  const finalDist = distances[C.value][0]
  result.value = finalDist === Infinity ? -1 : finalDist

  solved.value = true
}
</script>

<style scoped>
.mania-par-solver {
  padding: 1rem;
}

.problem-statement {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
}

.problem-statement h4 {
  color: #2c3e50;
  margin-bottom: 0.75rem;
}

.input-section {
  background: white;
  padding: 1.5rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
}

.input-section h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.preset-buttons {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.btn-preset {
  padding: 0.5rem 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.btn-preset:hover {
  background: #5568d3;
}

.input-row {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.input-row label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 500;
}

.input-row input {
  padding: 0.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  width: 120px;
}

.edges-input {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
}

.edges-input h5 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.edge-input {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  align-items: center;
}

.edge-input input {
  padding: 0.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  width: 80px;
}

.btn-remove-edge {
  padding: 0.25rem 0.75rem;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1;
}

.btn-add-edge {
  padding: 0.5rem 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
}

.btn-solve {
  padding: 0.75rem 2rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
}

.btn-solve:hover:not(:disabled) {
  background: #35a372;
}

.btn-solve:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.warning {
  color: #e74c3c;
  margin-top: 1rem;
  font-weight: 500;
}

.solution-section {
  background: white;
  padding: 1.5rem;
  border-radius: 6px;
}

.solution-section h4 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.solution-section h5 {
  color: #2c3e50;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.concept-explanation {
  background: #e8f5e9;
  padding: 1.5rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  border-left: 4px solid #42b883;
}

.concept-explanation p {
  margin: 0.75rem 0;
  line-height: 1.6;
}

.state-explanation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.state-box {
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
}

.state-box.par {
  background: #d4edda;
  border: 2px solid #28a745;
}

.state-box.impar {
  background: #fff3cd;
  border: 2px solid #ffc107;
}

.state-box strong {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.visualization {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
}

.graph-display {
  margin: 1rem 0;
}

.graph-svg {
  display: block;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.edge {
  stroke: #ccc;
  stroke-width: 2;
  transition: all 0.3s;
}

.edge.in-path {
  stroke: #42b883;
  stroke-width: 3;
}

.edge-label {
  font-size: 14px;
  font-weight: 600;
  fill: #666;
  background: white;
}

.node {
  fill: white;
  stroke: #2c3e50;
  stroke-width: 2;
  transition: all 0.3s;
}

.node.start {
  fill: #d4edda;
  stroke: #28a745;
  stroke-width: 3;
}

.node.end {
  fill: #cce5ff;
  stroke: #004085;
  stroke-width: 3;
}

.node.in-path {
  fill: #fff3cd;
  stroke: #ffc107;
}

.node-label {
  font-size: 16px;
  font-weight: 700;
  fill: #2c3e50;
  pointer-events: none;
}

.distances-table {
  margin-top: 1.5rem;
}

.distances-table table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 6px;
  overflow: hidden;
}

.distances-table th,
.distances-table td {
  padding: 0.75rem;
  text-align: center;
  border: 1px solid #e0e0e0;
}

.distances-table th {
  background: #2c3e50;
  color: white;
  font-weight: 600;
}

.par-col {
  background: #d4edda;
}

.impar-col {
  background: #fff3cd;
}

.result {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  border-radius: 8px;
  margin: 1.5rem 0;
  text-align: center;
  color: white;
}

.result.impossible {
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
}

.result-value {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.result-explanation {
  font-size: 1rem;
  opacity: 0.9;
}

.code-section {
  margin-top: 2rem;
}

.code-section pre {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 1.5rem;
  border-radius: 6px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.complexity-analysis {
  background: #e8f5e9;
  padding: 1.5rem;
  border-radius: 6px;
  margin-top: 1.5rem;
}

.complexity-analysis p {
  margin: 0.5rem 0;
  line-height: 1.6;
}
</style>
