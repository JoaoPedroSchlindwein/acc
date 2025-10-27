<template>
  <div class="ginastica-solver">
    <div class="problem-statement">
      <h4>Ginástica (2017)</h4>
      <p>
        Conte quantas sequências de T minutos são possíveis, onde cada minuto tem
        dificuldade entre M e N, e o nível muda ±1 a cada minuto.
      </p>
    </div>

    <div class="input-section">
      <h4>Entrada</h4>
      <div class="inputs">
        <label>
          T (minutos):
          <input v-model.number="T" type="number" min="1" max="10" />
        </label>
        <label>
          M (nível mínimo):
          <input v-model.number="M" type="number" min="1" max="20" />
        </label>
        <label>
          N (nível máximo):
          <input v-model.number="N" type="number" min="1" max="20" />
        </label>
        <button @click="solve" :disabled="M >= N" class="btn-solve">
          Resolver
        </button>
      </div>
      <p v-if="M >= N" class="warning">⚠ M deve ser menor que N</p>
    </div>

    <div v-if="solved" class="solution-section">
      <h4>Solução com Programação Dinâmica</h4>

      <div class="explanation">
        <h5>Conceito:</h5>
        <p>
          Usamos um vetor dp onde dp[i] conta quantas sequências terminam no nível M+i.
        </p>
        <p>
          <strong>Regras de transição:</strong>
        </p>
        <ul>
          <li>Se d = M, só pode vir de M+1 (descer)</li>
          <li>Se d = N, só pode vir de N-1 (subir)</li>
          <li>Para outros d, pode vir de d-1 ou d+1</li>
        </ul>
      </div>

      <div class="visualization">
        <h5>Evolução do vetor DP:</h5>
        <div v-for="(state, minute) in dpStates" :key="minute" class="dp-state">
          <div class="minute-label">Minuto {{ minute + 1 }}</div>
          <div class="dp-array">
            <div
              v-for="(value, index) in state"
              :key="index"
              class="dp-cell"
              :class="{ active: value > 0 }"
            >
              <div class="level-label">{{ M + index }}</div>
              <div class="dp-value">{{ value }}</div>
            </div>
          </div>
          <div v-if="minute < dpStates.length - 1" class="arrow">↓</div>
        </div>
      </div>

      <div class="result">
        <div class="result-value">
          <strong>Resposta:</strong> {{ result }} sequências válidas
        </div>
        <div class="result-formula">
          Soma: {{ dpStates[dpStates.length - 1].join(' + ') }} = {{ result }}
        </div>
      </div>

      <div class="code-section">
        <h5>Código C++:</h5>
        <pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

const long long MOD = 1000000007;

int main() {
    int T, M, N;
    cin &gt;&gt; T &gt;&gt; M &gt;&gt; N;

    int size = N - M + 1;
    vector&lt;long long&gt; dp(size, 1);

    for (int t = 2; t &lt;= T; ++t) {
        vector&lt;long long&gt; dp_novo(size, 0);
        for (int i = 0; i &lt; size; ++i) {
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
    for (int i = 0; i &lt; size; ++i) {
        result = (result + dp[i]) % MOD;
    }

    cout &lt;&lt; result &lt;&lt; endl;

    return 0;
}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const T = ref(3)
const M = ref(2)
const N = ref(5)
const solved = ref(false)

const MOD = 1000000007

const dpStates = computed(() => {
  if (!solved.value || M.value >= N.value) return []

  const size = N.value - M.value + 1
  const states = []

  // Minuto 1: todos os níveis têm 1 sequência
  let dp = Array(size).fill(1)
  states.push([...dp])

  // Minutos 2 a T
  for (let t = 2; t <= T.value; t++) {
    const dp_novo = Array(size).fill(0)

    for (let i = 0; i < size; i++) {
      const d = M.value + i

      if (d === M.value) {
        // Só pode vir de M+1
        dp_novo[i] = dp[i + 1]
      } else if (d === N.value) {
        // Só pode vir de N-1
        dp_novo[i] = dp[i - 1]
      } else {
        // Pode vir de d-1 ou d+1
        dp_novo[i] = (dp[i - 1] + dp[i + 1]) % MOD
      }
    }

    dp = [...dp_novo]
    states.push([...dp])
  }

  return states
})

const result = computed(() => {
  if (dpStates.value.length === 0) return 0

  const lastState = dpStates.value[dpStates.value.length - 1]
  return lastState.reduce((sum, val) => (sum + val) % MOD, 0)
})

const solve = () => {
  if (M.value < N.value) {
    solved.value = true
  }
}
</script>

<style scoped>
.ginastica-solver {
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

.inputs {
  display: flex;
  gap: 1.5rem;
  align-items: flex-end;
  flex-wrap: wrap;
}

.inputs label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 500;
}

.inputs input {
  padding: 0.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  width: 120px;
}

.warning {
  color: #e74c3c;
  margin-top: 1rem;
  font-weight: 500;
}

.btn-solve {
  padding: 0.5rem 2rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-solve:hover:not(:disabled) {
  background: #35a372;
}

.btn-solve:disabled {
  background: #ccc;
  cursor: not-allowed;
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

.explanation {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
}

.explanation ul {
  margin-left: 1.5rem;
  margin-top: 0.5rem;
}

.explanation li {
  margin: 0.5rem 0;
}

.visualization {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
}

.dp-state {
  margin: 1.5rem 0;
}

.minute-label {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.75rem;
}

.dp-array {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.dp-cell {
  min-width: 60px;
  padding: 0.75rem;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  text-align: center;
}

.dp-cell.active {
  border-color: #42b883;
  background: #e8f5e9;
}

.level-label {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.dp-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  font-family: monospace;
}

.arrow {
  text-align: center;
  font-size: 1.5rem;
  color: #42b883;
  margin: 0.5rem 0;
}

.result {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  border-radius: 8px;
  margin: 1.5rem 0;
  text-align: center;
  color: white;
}

.result-value {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.result-formula {
  font-family: monospace;
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
}
</style>
