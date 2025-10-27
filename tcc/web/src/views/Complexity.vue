<template>
  <div class="complexity">
    <h1>Complexidade de Algoritmos</h1>
    <p class="intro">
      A complexidade de algoritmos é fundamental para avaliar a eficiência de soluções
      em programação competitiva.
    </p>

    <div class="section">
      <h2>Notação Big O</h2>
      <p>
        A notação Big O descreve o comportamento assintótico de um algoritmo,
        mostrando como o tempo de execução ou espaço cresce em função do tamanho da entrada.
      </p>

      <div class="complexity-table">
        <div class="table-header">
          <div>Complexidade</div>
          <div>Tamanho máximo de n</div>
          <div>Nome</div>
        </div>
        <div class="table-row" @click="selectComplexity('O(1)')">
          <div><code>O(1)</code></div>
          <div>Qualquer n</div>
          <div>Constante</div>
        </div>
        <div class="table-row" @click="selectComplexity('O(log n)')">
          <div><code>O(log n)</code></div>
          <div>n ≤ 10¹⁸</div>
          <div>Logarítmica</div>
        </div>
        <div class="table-row" @click="selectComplexity('O(n)')">
          <div><code>O(n)</code></div>
          <div>n ≤ 10⁸</div>
          <div>Linear</div>
        </div>
        <div class="table-row" @click="selectComplexity('O(n log n)')">
          <div><code>O(n log n)</code></div>
          <div>n ≤ 10⁶</div>
          <div>Linearítmica</div>
        </div>
        <div class="table-row" @click="selectComplexity('O(n²)')">
          <div><code>O(n²)</code></div>
          <div>n ≤ 10⁴</div>
          <div>Quadrática</div>
        </div>
      </div>
    </div>

    <div class="section" v-if="selectedComplexity">
      <h2>Exemplo: {{ selectedComplexity }}</h2>
      <div class="code-example">
        <pre><code>{{ getComplexityExample(selectedComplexity) }}</code></pre>
      </div>
      <div class="visualization">
        <h3>Visualização do Crescimento</h3>
        <div class="chart">
          <div
            v-for="n in [10, 100, 1000, 10000]"
            :key="n"
            class="bar"
            :style="{ height: getBarHeight(selectedComplexity, n) + 'px' }"
          >
            <span class="bar-label">n={{ formatNumber(n) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>Escolhendo a Complexidade</h2>
      <div class="decision-guide">
        <div class="guide-item">
          <strong>n ≤ 5.000</strong> → Use O(n²)
        </div>
        <div class="guide-item">
          <strong>n ≤ 10⁶</strong> → Use O(n log n)
        </div>
        <div class="guide-item">
          <strong>n ≤ 10⁸</strong> → Use O(n)
        </div>
        <div class="guide-item">
          <strong>n > 10⁸</strong> → Use O(log n) ou O(1)
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedComplexity = ref('O(n)')

const selectComplexity = (complexity) => {
  selectedComplexity.value = complexity
}

const getComplexityExample = (complexity) => {
  const examples = {
    'O(1)': `// Acesso direto por índice: O(1)
int elemento = v[2];

// Operações aritméticas: O(1)
int soma = a + b;`,

    'O(log n)': `// Busca binária - divide o espaço pela metade
while (esquerda <= direita) {
    int meio = (esquerda + direita) / 2;

    if (v[meio] == alvo) return meio;

    if (v[meio] < alvo)
        esquerda = meio + 1;
    else
        direita = meio - 1;
}`,

    'O(n)': `// Laço simples percorrendo n elementos
for (int i = 0; i < n; i++) {
    soma += v[i];  // O(1) executado n vezes
}`,

    'O(n log n)': `// Merge Sort - divisão e conquista
void mergeSort(vector<int>& v, int inicio, int fim) {
    if (inicio >= fim) return;

    int meio = (inicio + fim) / 2;
    mergeSort(v, inicio, meio);
    mergeSort(v, meio + 1, fim);
    merge(v, inicio, meio, fim);
}`,

    'O(n²)': `// Laços duplamente aninhados
for (int i = 0; i < n; i++) {
    for (int j = i + 1; j < n; j++) {
        if (v[i] == v[j]) return true;
    }
}`
  }
  return examples[complexity] || ''
}

const getBarHeight = (complexity, n) => {
  const operations = {
    'O(1)': 1,
    'O(log n)': Math.log2(n),
    'O(n)': n / 100,
    'O(n log n)': (n * Math.log2(n)) / 1000,
    'O(n²)': (n * n) / 100000
  }
  return Math.min(operations[complexity] || 1, 300)
}

const formatNumber = (n) => {
  if (n >= 1000) return (n / 1000) + 'k'
  return n
}
</script>

<style scoped>
.complexity {
  max-width: 1000px;
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

.section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.section h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.complexity-table {
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background: #2c3e50;
  color: white;
  padding: 1rem;
  font-weight: bold;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background 0.2s;
}

.table-row:hover {
  background: #e8f5e9;
}

code {
  background: #f0f0f0;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}

.code-example {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1rem 0;
}

.code-example pre {
  margin: 0;
  font-family: 'Courier New', monospace;
}

.visualization {
  margin-top: 2rem;
}

.chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 320px;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.bar {
  width: 80px;
  background: linear-gradient(to top, #42b883, #35495e);
  border-radius: 4px 4px 0 0;
  position: relative;
  transition: all 0.3s ease;
}

.bar-label {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.9rem;
  white-space: nowrap;
}

.decision-guide {
  display: grid;
  gap: 1rem;
}

.guide-item {
  background: #e8f5e9;
  padding: 1rem;
  border-left: 4px solid #42b883;
  border-radius: 4px;
}
</style>
