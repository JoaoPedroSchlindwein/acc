<template>
  <div class="interactive-demo">
    <div class="demo-header">
      <h1>🎮 Demonstração de Interatividade Avançada</h1>
      <p class="subtitle">
        Veja as melhorias implementadas para aumentar o engajamento e aprendizado ativo
      </p>
    </div>

    <div class="improvements-showcase">
      <div class="improvement-card">
        <div class="improvement-icon">⏯️</div>
        <h3>Controle Passo a Passo</h3>
        <ul>
          <li>▶ Play/Pause a qualquer momento</li>
          <li>⏭ Avançar/Voltar um passo</li>
          <li>🎚️ Controle de velocidade (0.5x a 2x)</li>
          <li>📊 Timeline navegável</li>
        </ul>
      </div>

      <div class="improvement-card">
        <div class="improvement-icon">🧪</div>
        <h3>Casos de Teste Rápidos</h3>
        <ul>
          <li>📌 Exemplos pré-configurados</li>
          <li>📭 Teste casos extremos (vazio, único elemento)</li>
          <li>📊 Arrays grandes (100+ elementos)</li>
          <li>❌ Elementos não encontrados</li>
        </ul>
      </div>

      <div class="improvement-card">
        <div class="improvement-icon">💡</div>
        <h3>Explicações Contextuais</h3>
        <ul>
          <li>💬 Narração do que está acontecendo</li>
          <li>📝 Destaque da linha de código atual</li>
          <li>💭 Dicas educacionais em cada passo</li>
          <li>🎯 Estatísticas em tempo real</li>
        </ul>
      </div>

      <div class="improvement-card">
        <div class="improvement-icon">📊</div>
        <h3>Feedback Visual Aprimorado</h3>
        <ul>
          <li>🎨 Estados coloridos claros</li>
          <li>✨ Animações suaves</li>
          <li>📈 Progresso visível</li>
          <li>🎯 Hover interativo nos elementos</li>
        </ul>
      </div>
    </div>

    <div class="demo-section">
      <h2>Experimente Agora: Algoritmos Interativos</h2>
      <p>
        Estas versões aprimoradas permitem que você controle completamente a execução dos algoritmos,
        pausando para analisar, voltando passos para revisar, e ajustando a velocidade conforme sua necessidade.
      </p>

      <div class="algorithm-tabs">
        <button
          v-for="algo in algorithms"
          :key="algo.id"
          @click="selectedAlgo = algo.id"
          :class="{ active: selectedAlgo === algo.id }"
          class="algo-tab"
        >
          {{ algo.icon }} {{ algo.name }}
        </button>
      </div>

      <div class="algo-content">
        <BinarySearchEnhanced v-if="selectedAlgo === 'binary'" />
        <BFSEnhanced v-if="selectedAlgo === 'bfs'" />
        <TwoPointersEnhanced v-if="selectedAlgo === 'twopointers'" />
      </div>
    </div>

    <div class="comparison-section">
      <h2>⚡ Antes vs Depois</h2>
      <div class="comparison-grid">
        <div class="comparison-item">
          <h3>❌ Antes</h3>
          <ul>
            <li>Animação automática do início ao fim</li>
            <li>Sem controle de pausar</li>
            <li>Velocidade fixa</li>
            <li>Difícil revisar um passo específico</li>
            <li>Dados limitados</li>
          </ul>
        </div>
        <div class="comparison-item success">
          <h3>✅ Depois</h3>
          <ul>
            <li>Controle total: play/pause/anterior/próximo</li>
            <li>Pausar e analisar a qualquer momento</li>
            <li>Velocidade ajustável (0.5x - 2x)</li>
            <li>Timeline navegável para qualquer passo</li>
            <li>Casos de teste rápidos e customizáveis</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="next-steps">
      <h2>🚀 Próximas Melhorias Planejadas</h2>
      <div class="next-steps-grid">
        <div class="next-step-card">
          <h4>🎮 Modo Desafio</h4>
          <p>Usuário prevê o próximo passo e ganha pontos por acertos</p>
          <span class="status planning">Em Planejamento</span>
        </div>
        <div class="next-step-card">
          <h4>✏️ Editor de Dados</h4>
          <p>Modificar array clicando nos valores, arrastar para reordenar</p>
          <span class="status planning">Em Planejamento</span>
        </div>
        <div class="next-step-card">
          <h4>📊 Comparação Lado a Lado</h4>
          <p>Executar 2 algoritmos simultaneamente (ex: Busca Linear vs Binária)</p>
          <span class="status planning">Em Planejamento</span>
        </div>
        <div class="next-step-card">
          <h4>🐛 Debugger Visual</h4>
          <p>Breakpoints no código, inspect de variáveis, watch expressions</p>
          <span class="status planning">Em Planejamento</span>
        </div>
      </div>
    </div>

    <div class="feedback-section">
      <h2>💬 Compartilhe sua Opinião</h2>
      <p>
        Essas melhorias tornam o aprendizado mais efetivo? Que outras funcionalidades você gostaria de ver?
      </p>
      <div class="feedback-actions">
        <button class="btn-feedback">📝 Dar Feedback</button>
        <button class="btn-feedback">⭐ Sugerir Melhoria</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BinarySearchEnhanced from '../components/algorithms/BinarySearchEnhanced.vue'
import BFSEnhanced from '../components/algorithms/BFSEnhanced.vue'
import TwoPointersEnhanced from '../components/algorithms/TwoPointersEnhanced.vue'

const selectedAlgo = ref('binary')

const algorithms = [
  { id: 'binary', name: 'Busca Binária', icon: '🔍' },
  { id: 'bfs', name: 'BFS', icon: '🌊' },
  { id: 'twopointers', name: 'Two Pointers', icon: '👉👉' }
]
</script>

<style scoped>
.interactive-demo {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.demo-header {
  text-align: center;
  margin-bottom: 3rem;
}

.demo-header h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
}

/* Improvements Showcase */
.improvements-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.improvement-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
  transition: all 0.3s;
}

.improvement-card:hover {
  transform: translateY(-4px);
  border-color: #42b883;
  box-shadow: 0 8px 16px rgba(66, 184, 131, 0.2);
}

.improvement-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.improvement-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.improvement-card ul {
  list-style: none;
  padding: 0;
}

.improvement-card li {
  padding: 0.5rem 0;
  color: #666;
  line-height: 1.6;
}

/* Demo Section */
.demo-section {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 3rem;
}

.demo-section h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.demo-section p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.algorithm-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.algo-tab {
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-primary);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--text-base);
  font-weight: var(--font-weight-semibold);
  transition: all var(--transition-base);
}

.algo-tab:hover:not(.active) {
  background: var(--color-neutral-50);
  border-color: var(--color-primary-300);
  transform: translateY(-2px);
}

.algo-tab.active {
  background: linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-700) 100%);
  color: var(--color-text-inverse);
  border: none;
}

.algo-content {
  margin-top: 1rem;
}

/* Comparison Section */
.comparison-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 3rem;
}

.comparison-section h2 {
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.comparison-item {
  background: #ffebee;
  padding: 2rem;
  border-radius: 8px;
  border-left: 4px solid #e74c3c;
}

.comparison-item.success {
  background: #e8f5e9;
  border-left-color: #42b883;
}

.comparison-item h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.comparison-item ul {
  list-style: none;
  padding: 0;
}

.comparison-item li {
  padding: 0.5rem 0;
  color: #333;
  line-height: 1.6;
}

/* Next Steps */
.next-steps {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 3rem 2rem;
  border-radius: 12px;
  color: white;
  margin-bottom: 3rem;
}

.next-steps h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.next-steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.next-step-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.next-step-card h4 {
  margin-bottom: 0.75rem;
  font-size: 1.2rem;
}

.next-step-card p {
  margin-bottom: 1rem;
  line-height: 1.6;
  opacity: 0.9;
}

.status {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status.planning {
  background: rgba(255, 193, 7, 0.3);
  color: #fff;
}

/* Feedback Section */
.feedback-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
}

.feedback-section h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.feedback-section p {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.feedback-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-feedback {
  padding: 0.75rem 2rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-feedback:hover {
  background: #35a372;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .improvements-showcase {
    grid-template-columns: 1fr;
  }

  .comparison-grid {
    grid-template-columns: 1fr;
  }

  .next-steps-grid {
    grid-template-columns: 1fr;
  }
}
</style>
