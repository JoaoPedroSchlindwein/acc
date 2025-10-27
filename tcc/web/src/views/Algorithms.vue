<template>
  <div class="algorithms">
    <h1>Algoritmos Fundamentais</h1>
    <p class="intro">
      Algoritmos essenciais que aparecem recorrentemente em programação competitiva.
    </p>

    <div class="algorithms-grid">
      <div
        v-for="algo in algorithms"
        :key="algo.name"
        class="algo-card"
        @click="selectAlgorithm(algo)"
      >
        <h3>{{ algo.icon }} {{ algo.name }}</h3>
        <p>{{ algo.description }}</p>
        <div class="complexity">{{ algo.complexity }}</div>
      </div>
    </div>

    <div v-if="selected" class="detail-section">
      <h2>{{ selected.icon }} {{ selected.name }}</h2>

      <div class="tabs">
        <button
          :class="{ active: activeTab === 'visual' }"
          @click="activeTab = 'visual'"
        >
          Visualização Básica
        </button>
        <button
          v-if="selected.enhancedComponent"
          :class="{ active: activeTab === 'enhanced' }"
          @click="activeTab = 'enhanced'"
          class="enhanced-tab"
        >
          🎮 Interativa Avançada
        </button>
        <button
          :class="{ active: activeTab === 'explanation' }"
          @click="activeTab = 'explanation'"
        >
          Explicação
        </button>
        <button
          :class="{ active: activeTab === 'code' }"
          @click="activeTab = 'code'"
        >
          Código
        </button>
      </div>

      <div v-if="activeTab === 'visual'" class="visualization-area">
        <component :is="selected.component" />
      </div>

      <div v-if="activeTab === 'enhanced'" class="visualization-area">
        <div class="enhanced-banner">
          <h3>🎮 Modo Interativo Avançado</h3>
          <p>
            Controle completo da execução: play/pause, navegação passo a passo,
            ajuste de velocidade, timeline navegável e explicações contextuais.
          </p>
        </div>
        <component :is="selected.enhancedComponent" />
      </div>

      <div v-if="activeTab === 'explanation'" class="explanation">
        <div v-html="selected.explanation"></div>
      </div>

      <div v-if="activeTab === 'code'" class="code-section">
        <pre><code>{{ selected.code }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, markRaw } from 'vue'
import BinarySearchVisualization from '../components/algorithms/BinarySearchVisualization.vue'
import BFSVisualization from '../components/algorithms/BFSVisualization.vue'
import TwoPointersVisualization from '../components/algorithms/TwoPointersVisualization.vue'
import BinarySearchEnhanced from '../components/algorithms/BinarySearchEnhanced.vue'
import BFSEnhanced from '../components/algorithms/BFSEnhanced.vue'
import TwoPointersEnhanced from '../components/algorithms/TwoPointersEnhanced.vue'

const activeTab = ref('visual')
const selected = ref(null)

const algorithms = [
  {
    name: 'Busca Binária',
    icon: '🔍',
    description: 'Busca eficiente em arrays ordenados',
    complexity: 'Tempo: O(log n), Espaço: O(1)',
    component: markRaw(BinarySearchVisualization),
    enhancedComponent: markRaw(BinarySearchEnhanced),
    explanation: `
      <p>A busca binária elimina metade do espaço de busca a cada comparação.</p>
      <h3>Princípio:</h3>
      <ol>
        <li>Compare o elemento do meio com o alvo</li>
        <li>Se forem iguais, encontrou</li>
        <li>Se o alvo for menor, busque na metade esquerda</li>
        <li>Se o alvo for maior, busque na metade direita</li>
        <li>Repita até encontrar ou esgotar o espaço</li>
      </ol>
      <p>Para n = 1.000.000, são necessárias apenas 20 comparações!</p>
    `,
    code: `int buscaBinaria(const vector<int>& v, int alvo) {
    int esquerda = 0;
    int direita = v.size() - 1;

    while (esquerda <= direita) {
        int meio = esquerda + (direita - esquerda) / 2;

        if (v[meio] == alvo) {
            return meio;
        }

        if (v[meio] < alvo) {
            esquerda = meio + 1;
        } else {
            direita = meio - 1;
        }
    }

    return -1;
}`
  },
  {
    name: 'BFS (Busca em Largura)',
    icon: '🌊',
    description: 'Travessia de grafos camada por camada',
    complexity: 'Tempo: O(V + E), Espaço: O(V)',
    component: markRaw(BFSVisualization),
    enhancedComponent: markRaw(BFSEnhanced),
    explanation: `
      <p>BFS explora o grafo camada por camada a partir de um vértice inicial.</p>
      <h3>Características:</h3>
      <ul>
        <li>Usa uma fila para gerenciar vértices</li>
        <li>Encontra o menor caminho em grafos não ponderados</li>
        <li>Visita vértices por nível de distância</li>
      </ul>
      <h3>Aplicações:</h3>
      <ul>
        <li>Menor caminho em grafos não ponderados</li>
        <li>Testar bipartição de grafos</li>
        <li>Encontrar componentes conexos</li>
      </ul>
    `,
    code: `void bfs(int start_node) {
    queue<int> q;
    q.push(start_node);
    visited[start_node] = true;

    while (!q.empty()) {
        int u = q.front();
        q.pop();

        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}`
  },
  {
    name: 'Two Pointers',
    icon: '👉👉',
    description: 'Dois ponteiros para otimizar buscas',
    complexity: 'Tempo: O(n), Espaço: O(1)',
    component: markRaw(TwoPointersVisualization),
    enhancedComponent: markRaw(TwoPointersEnhanced),
    explanation: `
      <p>Two Pointers usa dois índices para percorrer estruturas, reduzindo O(n²) para O(n).</p>
      <h3>Padrões:</h3>
      <ul>
        <li><strong>Convergência:</strong> Ponteiros nas extremidades movendo-se ao centro</li>
        <li><strong>Perseguição:</strong> Ambos na mesma direção mantendo janela válida</li>
      </ul>
      <h3>Aplicações:</h3>
      <ul>
        <li>Encontrar par com soma específica</li>
        <li>Remover duplicatas in-place</li>
        <li>Mesclar arrays ordenados</li>
      </ul>
    `,
    code: `// Encontrar par com soma igual a alvo
pair<int,int> encontraPar(vector<int>& v, int alvo) {
    int esq = 0;
    int dir = v.size() - 1;

    while (esq < dir) {
        int soma = v[esq] + v[dir];

        if (soma == alvo) {
            return {esq, dir};
        } else if (soma < alvo) {
            esq++;
        } else {
            dir--;
        }
    }

    return {-1, -1};
}`
  }
]

const selectAlgorithm = (algo) => {
  selected.value = algo
  activeTab.value = 'visual'
}
</script>

<style scoped>
.algorithms {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.intro {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
}

.algorithms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.algo-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.algo-card:hover {
  transform: translateY(-4px);
  border-color: #42b883;
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.2);
}

.algo-card h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.algo-card p {
  color: #666;
  margin-bottom: 1rem;
}

.complexity {
  font-size: 0.9rem;
  color: #42b883;
  font-family: monospace;
}

.detail-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.detail-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.tabs button {
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-primary);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--text-base);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-base);
}

.tabs button:hover:not(.active) {
  background: var(--color-neutral-50);
  border-color: var(--color-neutral-300);
}

.tabs button.active {
  background: var(--color-secondary-600);
  color: var(--color-text-inverse);
  border-color: var(--color-secondary-600);
}

.tabs button.enhanced-tab {
  border: 2px solid var(--color-primary-600);
  background: var(--color-surface);
  color: var(--color-primary-700);
  font-weight: var(--font-weight-semibold);
}

.tabs button.enhanced-tab:hover:not(.active) {
  background: var(--color-primary-50);
  border-color: var(--color-primary-700);
}

.tabs button.enhanced-tab.active {
  background: linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-700) 100%);
  color: var(--color-text-inverse);
  border: none;
}

.enhanced-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1.5rem;
  border-radius: 8px;
  color: white;
  margin-bottom: 2rem;
}

.enhanced-banner h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
}

.enhanced-banner p {
  margin: 0;
  opacity: 0.95;
  line-height: 1.6;
}

.explanation {
  line-height: 1.6;
  color: #333;
}

.explanation h3 {
  color: #2c3e50;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.explanation ul,
.explanation ol {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.explanation li {
  margin-bottom: 0.5rem;
}

.code-section pre {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
}
</style>
