<template>
  <div class="atencao-reuniao-solver">
    <div class="problem-statement">
      <h4>Atenção à Reunião (2024)</h4>
      <p>
        Calcule o tempo máximo que cada diretor pode falar, considerando que há
        intervalos de 1 minuto entre os discursos.
      </p>
    </div>

    <div class="input-section">
      <h4>Entrada</h4>
      <div class="inputs">
        <label>
          N (número de diretores):
          <input v-model.number="N" type="number" min="1" max="100" />
        </label>
        <label>
          K (duração máxima em minutos):
          <input v-model.number="K" type="number" min="1" max="1000" />
        </label>
        <button @click="solve" class="btn-solve">Resolver</button>
      </div>
    </div>

    <div v-if="solved" class="solution-section">
      <h4>Solução</h4>

      <div class="explanation">
        <h5>Modelagem Matemática:</h5>
        <div class="formula">
          <p><strong>Tempo total de discursos:</strong> N × T</p>
          <p><strong>Número de intervalos:</strong> N - 1</p>
          <p><strong>Tempo total de intervalos:</strong> (N - 1) × 1 = N - 1</p>
          <p><strong>Restrição:</strong> N × T + (N - 1) ≤ K</p>
        </div>

        <h5>Resolvendo para T:</h5>
        <div class="steps">
          <div class="step">N × T + (N - 1) ≤ K</div>
          <div class="step">N × T ≤ K - (N - 1)</div>
          <div class="step">N × T ≤ K - N + 1</div>
          <div class="step">T ≤ (K - N + 1) / N</div>
          <div class="step final">T = ⌊(K - N + 1) / N⌋ = ⌊({{ K }} - {{ N }} + 1) / {{ N }}⌋</div>
        </div>
      </div>

      <div class="result">
        <div class="result-value">
          <strong>Resposta:</strong> {{ tempoMaximo }} minutos
        </div>
      </div>

      <div class="verification">
        <h5>Verificação:</h5>
        <table>
          <tr>
            <td>Tempo de discursos:</td>
            <td>{{ N }} × {{ tempoMaximo }} = {{ N * tempoMaximo }} minutos</td>
          </tr>
          <tr>
            <td>Tempo de intervalos:</td>
            <td>{{ N - 1 }} minutos</td>
          </tr>
          <tr>
            <td>Tempo total:</td>
            <td>{{ N * tempoMaximo + (N - 1) }} minutos</td>
          </tr>
          <tr class="validation" :class="{ valid: N * tempoMaximo + (N - 1) <= K }">
            <td>Verificação:</td>
            <td>
              {{ N * tempoMaximo + (N - 1) }} ≤ {{ K }}
              {{ N * tempoMaximo + (N - 1) <= K ? '✓' : '✗' }}
            </td>
          </tr>
        </table>
      </div>

      <div class="code-section">
        <h5>Código C++:</h5>
        <pre><code>#include &lt;bits/stdc++.h&gt;
using namespace std;

int main() {
    int N, K;
    cin &gt;&gt; N &gt;&gt; K;

    // Calcula o tempo máximo de cada discurso
    int tempoMaximo = (K - N + 1) / N;

    cout &lt;&lt; tempoMaximo &lt;&lt; endl;

    return 0;
}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const N = ref(7)
const K = ref(120)
const solved = ref(false)

const tempoMaximo = computed(() => {
  return Math.floor((K.value - N.value + 1) / N.value)
})

const solve = () => {
  solved.value = true
}
</script>

<style scoped>
.atencao-reuniao-solver {
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
  width: 150px;
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

.btn-solve:hover {
  background: #35a372;
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

.formula {
  background: white;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
}

.formula p {
  margin: 0.5rem 0;
  font-family: monospace;
}

.steps {
  background: white;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
}

.step {
  padding: 0.5rem;
  margin: 0.5rem 0;
  font-family: monospace;
  border-left: 3px solid #e0e0e0;
  padding-left: 1rem;
}

.step.final {
  border-left-color: #42b883;
  background: #e8f5e9;
  font-weight: 600;
}

.result {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  border-radius: 8px;
  margin: 1.5rem 0;
  text-align: center;
}

.result-value {
  color: white;
  font-size: 1.5rem;
}

.verification table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.verification td {
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
}

.verification tr.validation {
  font-weight: 600;
}

.verification tr.validation.valid {
  background: #d4edda;
  color: #155724;
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
