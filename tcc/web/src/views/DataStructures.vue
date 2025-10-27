<template>
  <div class="data-structures">
    <h1>Estruturas de Dados</h1>
    <p class="intro">
      Estruturas de dados da STL (Standard Template Library) do C++ são fundamentais
      para programação competitiva.
    </p>

    <div class="structures-grid">
      <div
        v-for="structure in structures"
        :key="structure.name"
        class="structure-card"
        @click="selectStructure(structure)"
      >
        <h3>{{ structure.icon }} {{ structure.name }}</h3>
        <p>{{ structure.description }}</p>
        <div class="complexity">{{ structure.complexity }}</div>
      </div>
    </div>

    <div v-if="selected" class="detail-section">
      <h2>{{ selected.icon }} {{ selected.name }}</h2>

      <div class="tabs">
        <button
          :class="{ active: activeTab === 'visual' }"
          @click="activeTab = 'visual'"
        >
          Visualização
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

      <div v-if="activeTab === 'code'" class="code-section">
        <pre><code>{{ selected.code }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, markRaw } from 'vue'
import VectorVisualization from '../components/structures/VectorVisualization.vue'
import QueueVisualization from '../components/structures/QueueVisualization.vue'
import StackVisualization from '../components/structures/StackVisualization.vue'

const activeTab = ref('visual')
const selected = ref(null)

const structures = [
  {
    name: 'Vector',
    icon: '📊',
    description: 'Array dinâmico com acesso O(1)',
    complexity: 'Acesso: O(1), Inserção: O(1) amortizado',
    component: markRaw(VectorVisualization),
    code: `vector<int> v;          // Declaração
v.push_back(10);        // Inserção: O(1) amortizado
int x = v[0];           // Acesso: O(1)
int tam = v.size();     // Tamanho: O(1)
v.pop_back();           // Remove último: O(1)`
  },
  {
    name: 'Queue',
    icon: '📥',
    description: 'Fila FIFO (First In, First Out)',
    complexity: 'Todas operações: O(1)',
    component: markRaw(QueueVisualization),
    code: `queue<int> q;           // Declaração
q.push(10);             // Inserção: O(1)
int x = q.front();      // Acesso ao primeiro: O(1)
q.pop();                // Remove primeiro: O(1)
bool vazia = q.empty(); // Verifica se vazia: O(1)`
  },
  {
    name: 'Stack',
    icon: '📚',
    description: 'Pilha LIFO (Last In, First Out)',
    complexity: 'Todas operações: O(1)',
    component: markRaw(StackVisualization),
    code: `stack<int> s;           // Declaração
s.push(10);             // Inserção: O(1)
int x = s.top();        // Acesso ao topo: O(1)
s.pop();                // Remove topo: O(1)
bool vazia = s.empty(); // Verifica se vazia: O(1)`
  },
  {
    name: 'Set',
    icon: '🔢',
    description: 'Conjunto ordenado sem duplicatas',
    complexity: 'Inserção/Busca/Remoção: O(log n)',
    component: markRaw(VectorVisualization),
    code: `set<int> s;             // Declaração
s.insert(10);           // Inserção: O(log n)
bool existe = s.count(5); // Busca: O(log n)
s.erase(10);            // Remoção: O(log n)`
  },
  {
    name: 'Map',
    icon: '🗺️',
    description: 'Associação chave-valor ordenada',
    complexity: 'Inserção/Busca/Remoção: O(log n)',
    component: markRaw(VectorVisualization),
    code: `map<int,int> m;         // Declaração
m[10] = 5;              // Inserção: O(log n)
int val = m[10];        // Acesso: O(log n)
bool existe = m.count(10); // Busca: O(log n)`
  },
  {
    name: 'Priority Queue',
    icon: '⬆️',
    description: 'Heap binário (maior/menor primeiro)',
    complexity: 'Inserção/Remoção: O(log n), Topo: O(1)',
    component: markRaw(VectorVisualization),
    code: `priority_queue<int> pq; // Max-heap
pq.push(10);            // Inserção: O(log n)
int maior = pq.top();   // Acesso ao maior: O(1)
pq.pop();               // Remove maior: O(log n)`
  }
]

const selectStructure = (structure) => {
  selected.value = structure
  activeTab.value = 'visual'
}
</script>

<style scoped>
.data-structures {
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

.structures-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.structure-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.structure-card:hover {
  transform: translateY(-4px);
  border-color: #42b883;
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.2);
}

.structure-card h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.structure-card p {
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

.code-section pre {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
}
</style>
