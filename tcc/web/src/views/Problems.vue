<template>
  <div class="problems">
    <h1>Problemas Resolvidos</h1>
    <p class="intro">
      Soluções interativas de problemas da Maratona SBC aplicando o Framework ACC.
    </p>

    <div class="problems-grid">
      <div
        v-for="problem in problems"
        :key="problem.id"
        class="problem-card"
        @click="selectProblem(problem)"
      >
        <div class="problem-header">
          <h3>{{ problem.name }}</h3>
          <span class="category">{{ problem.category }}</span>
        </div>
        <div class="problem-info">
          <span class="year">{{ problem.year }}</span>
          <span class="difficulty" :class="problem.difficulty">{{ problem.difficulty }}</span>
        </div>
        <p>{{ problem.summary }}</p>
      </div>
    </div>

    <div v-if="selected" class="detail-section">
      <h2>{{ selected.name }}</h2>
      <div class="problem-meta">
        <span class="meta-item">Ano: {{ selected.year }}</span>
        <span class="meta-item">Categoria: {{ selected.category }}</span>
        <span class="meta-item" :class="selected.difficulty">Dificuldade: {{ selected.difficulty }}</span>
      </div>

      <div class="acc-framework">
        <div class="acc-step" :class="{ active: accStep === 'algorithm' }" @click="accStep = 'algorithm'">
          <h3>1. Algoritmo</h3>
          <p>Conceituação e Intuição</p>
        </div>
        <div class="acc-step" :class="{ active: accStep === 'code' }" @click="accStep = 'code'">
          <h3>2. Código</h3>
          <p>Implementação</p>
        </div>
        <div class="acc-step" :class="{ active: accStep === 'conquest' }" @click="accStep = 'conquest'">
          <h3>3. Conquista</h3>
          <p>Aplicação e Teste</p>
        </div>
      </div>

      <div class="content-area">
        <div v-if="accStep === 'algorithm'" class="algorithm-explanation">
          <h3>Enunciado</h3>
          <div v-html="selected.statement"></div>

          <h3>Análise</h3>
          <div v-html="selected.analysis"></div>
        </div>

        <div v-if="accStep === 'code'" class="code-implementation">
          <h3>Implementação em C++</h3>
          <pre><code>{{ selected.code }}</code></pre>

          <div class="complexity-analysis">
            <h4>Análise de Complexidade</h4>
            <p><strong>Tempo:</strong> {{ selected.timeComplexity }}</p>
            <p><strong>Espaço:</strong> {{ selected.spaceComplexity }}</p>
          </div>
        </div>

        <div v-if="accStep === 'conquest'" class="conquest-section">
          <h3>Teste Interativo</h3>
          <component :is="selected.component" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, markRaw } from 'vue'
import AtencaoReuniaoSolver from '../components/problems/AtencaoReuniaoSolver.vue'
import GinasticaSolver from '../components/problems/GinasticaSolver.vue'
import ManiaParSolver from '../components/problems/ManiaParSolver.vue'

const accStep = ref('algorithm')
const selected = ref(null)

const problems = [
  {
    id: 1,
    name: 'Atenção à Reunião',
    year: '2024',
    category: 'Ad-Hoc',
    difficulty: 'Fácil',
    summary: 'Calcular o tempo máximo de discurso em uma reunião com intervalos',
    statement: `
      <p>Vinicius participa de uma reunião com N diretores, onde cada diretor discursará pelo mesmo tempo.
      Entre dois discursos consecutivos há um intervalo de 1 minuto.</p>
      <p>Dado que a reunião deve durar no máximo K minutos, determine o tempo máximo que cada diretor pode falar.</p>
      <p><strong>Entrada:</strong></p>
      <ul>
        <li>N: número de diretores (1 ≤ N ≤ 100)</li>
        <li>K: duração máxima da reunião em minutos (1 ≤ K ≤ 1000)</li>
      </ul>
    `,
    analysis: `
      <p>A modelagem matemática é fundamental:</p>
      <ul>
        <li>Tempo de discursos: N × T</li>
        <li>Tempo de intervalos: (N-1) × 1 = N - 1</li>
        <li>Tempo total: N × T + (N-1) ≤ K</li>
      </ul>
      <p>Resolvendo: T = ⌊(K - N + 1) / N⌋</p>
    `,
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int N, K;
    cin >> N >> K;

    // Tempo máximo = (K - intervalos) / N
    int tempoMaximo = (K - N + 1) / N;

    cout << tempoMaximo << endl;

    return 0;
}`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    component: markRaw(AtencaoReuniaoSolver)
  },
  {
    id: 2,
    name: 'Ginástica',
    year: '2017',
    category: 'Programação Dinâmica',
    difficulty: 'Médio',
    summary: 'Contar sequências válidas de níveis de dificuldade em exercícios',
    statement: `
      <p>Conte quantas sequências de T minutos são possíveis, onde:</p>
      <ul>
        <li>Cada minuto tem dificuldade entre M e N</li>
        <li>O nível deve mudar ±1 a cada minuto</li>
        <li>Não pode sair do intervalo [M, N]</li>
      </ul>
      <p>Retorne o resultado módulo 10⁹ + 7</p>
    `,
    analysis: `
      <p>Usamos Programação Dinâmica para evitar força bruta (2^49 casos):</p>
      <ul>
        <li>Estado: dp[t][d] = sequências que terminam no minuto t, nível d</li>
        <li>Transição: dp[t][d] vem de dp[t-1][d-1] e dp[t-1][d+1]</li>
        <li>Base: dp[1][d] = 1 para todo d em [M, N]</li>
      </ul>
      <p>A resposta é a soma de dp[T][d] para todo d.</p>
    `,
    code: `#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007;

int main() {
    int T, M, N;
    cin >> T >> M >> N;

    int size = N - M + 1;
    vector<long long> dp(size, 1);

    for (int t = 2; t <= T; ++t) {
        vector<long long> dp_novo(size, 0);
        for (int i = 0; i < size; ++i) {
            int d = M + i;
            if (d == M) {
                dp_novo[i] = dp[i + 1];
            } else if (d == N) {
                dp_novo[i] = dp[i - 1];
            } else {
                dp_novo[i] = (dp[i - 1] + dp[i + 1]) % MOD;
            }
        }
        dp = dp_novo;
    }

    long long result = 0;
    for (int i = 0; i < size; ++i) {
        result = (result + dp[i]) % MOD;
    }

    cout << result << endl;

    return 0;
}`,
    timeComplexity: 'O(T × (N-M))',
    spaceComplexity: 'O(N-M)',
    component: markRaw(GinasticaSolver)
  },
  {
    id: 3,
    name: 'Mania de Par',
    year: '2015',
    category: 'Grafos',
    difficulty: 'Médio',
    summary: 'Encontrar o menor caminho com número par de arestas usando Dijkstra',
    statement: `
      <p>Patrícia tem mania de que tudo seja par. Ela só viaja por caminhos onde
      o número total de pedágios seja PAR.</p>
      <p>Dado um grafo com C cidades e V estradas bidirecionais, cada uma com um custo,
      encontre o menor custo para ir da cidade 1 até a cidade C, passando por um
      número PAR de pedágios.</p>
      <p><strong>Entrada:</strong></p>
      <ul>
        <li>C: número de cidades (2 ≤ C ≤ 10.000)</li>
        <li>V: número de estradas (0 ≤ V ≤ 50.000)</li>
        <li>V linhas com: u v g (cidades u e v conectadas com custo g)</li>
      </ul>
      <p><strong>Saída:</strong> Menor custo com número par de pedágios, ou -1 se impossível</p>
    `,
    analysis: `
      <p>O Dijkstra tradicional não rastreia o número de arestas. A solução é
      <strong>duplicar o espaço de estados</strong>:</p>
      <ul>
        <li>Estado (v, PAR): menor custo para v com número par de arestas</li>
        <li>Estado (v, ÍMPAR): menor custo para v com número ímpar de arestas</li>
      </ul>
      <p><strong>Transição:</strong> Uma aresta u→v inverte a paridade:</p>
      <ul>
        <li>(u, PAR) + aresta → (v, ÍMPAR)</li>
        <li>(u, ÍMPAR) + aresta → (v, PAR)</li>
      </ul>
      <p>Iniciamos em (1, PAR) com custo 0 e buscamos dist[C][PAR].</p>
    `,
    code: `#include <iostream>
#include <vector>
#include <queue>
#include <tuple>

using ll = long long;
using state = std::tuple<ll, int, int>; // {custo, vertice, paridade}

const int MAXC = 10005;
const ll INFINITO = 1e18;

int C, V;
std::vector<std::pair<int, int>> adj[MAXC];
ll dist[MAXC][2]; // dist[v][0] -> par, dist[v][1] -> impar

void dijkstra() {
    for (int i = 1; i <= C; ++i) {
        dist[i][0] = dist[i][1] = INFINITO;
    }

    std::priority_queue<state, std::vector<state>, std::greater<state>> pq;

    dist[1][0] = 0;
    pq.emplace(0, 1, 0);

    while (!pq.empty()) {
        auto [d_u, u, paridade_u] = pq.top();
        pq.pop();

        if (d_u > dist[u][paridade_u]) continue;

        for (auto& edge : adj[u]) {
            int v = edge.first;
            int w = edge.second;
            int nova_paridade = !paridade_u;

            if (dist[u][paridade_u] + w < dist[v][nova_paridade]) {
                dist[v][nova_paridade] = dist[u][paridade_u] + w;
                pq.emplace(dist[v][nova_paridade], v, nova_paridade);
            }
        }
    }
}

int main() {
    std::cin >> C >> V;
    for (int i = 0; i < V; ++i) {
        int u, v, g;
        std::cin >> u >> v >> g;
        adj[u].push_back({v, g});
        adj[v].push_back({u, g});
    }

    dijkstra();

    ll resultado = dist[C][0];
    std::cout << (resultado == INFINITO ? -1 : resultado) << std::endl;

    return 0;
}`,
    timeComplexity: 'O(V log C)',
    spaceComplexity: 'O(C + V)',
    component: markRaw(ManiaParSolver)
  }
]

const selectProblem = (problem) => {
  selected.value = problem
  accStep.value = 'algorithm'
}
</script>

<style scoped>
.problems {
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

.problems-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.problem-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.problem-card:hover {
  transform: translateY(-4px);
  border-color: #42b883;
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.2);
}

.problem-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 0.75rem;
}

.problem-header h3 {
  color: #2c3e50;
  margin: 0;
}

.category {
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
}

.problem-info {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.year {
  color: #999;
  font-size: 0.9rem;
}

.difficulty {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
}

.difficulty.Fácil {
  background: #d4edda;
  color: #155724;
}

.difficulty.Médio {
  background: #fff3cd;
  color: #856404;
}

.difficulty.Difícil {
  background: #f8d7da;
  color: #721c24;
}

.detail-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.detail-section h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.problem-meta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e0e0e0;
}

.meta-item {
  font-size: 0.95rem;
  color: #666;
}

.acc-framework {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.acc-step {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s;
}

.acc-step:hover {
  border-color: #42b883;
}

.acc-step.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.acc-step h3 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.acc-step p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

.content-area {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  min-height: 400px;
}

.algorithm-explanation h3,
.code-implementation h3,
.conquest-section h3 {
  color: #2c3e50;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.algorithm-explanation h3:first-child,
.code-implementation h3:first-child,
.conquest-section h3:first-child {
  margin-top: 0;
}

.code-implementation pre {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  margin: 1rem 0;
}

.complexity-analysis {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  margin-top: 1rem;
}

.complexity-analysis h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.complexity-analysis p {
  margin: 0.5rem 0;
  font-family: monospace;
  color: #42b883;
}
</style>
