<template>
  <div class="home">
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <div class="hero-badge">
            <svg class="hero-badge-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            TCC 2025 - Material Didático
          </div>
          <h1 class="hero-title">Guia de Programação Competitiva</h1>
          <p class="hero-subtitle">
            Material didático interativo para iniciantes em competições de programação.
            Aprenda algoritmos, estruturas de dados e resolva problemas reais da Maratona SBC.
          </p>
          <div class="hero-actions">
            <router-link to="/demo-interativa" class="btn btn-primary btn-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              Começar Demo Interativa
            </router-link>
            <router-link to="/algoritmos" class="btn btn-outline btn-lg">
              Explorar Algoritmos
            </router-link>
          </div>
        </div>
      </section>

      <!-- Feature Banner -->
      <section class="feature-banner">
        <div class="feature-banner-content">
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="3"></circle>
              <line x1="12" y1="1" x2="12" y2="5"></line>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="7.05" y2="7.05"></line>
              <line x1="16.95" y1="16.95" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="5" y2="12"></line>
              <line x1="19" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="7.05" y2="16.95"></line>
              <line x1="16.95" y1="7.05" x2="19.78" y2="4.22"></line>
            </svg>
          </div>
          <div class="feature-text">
            <h3>Visualizações Interativas Avançadas!</h3>
            <p>Controle completo da execução: pause, volte, avance e ajuste a velocidade dos algoritmos em tempo real.</p>
          </div>
          <router-link to="/demo-interativa" class="feature-cta">
            Ver Demo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </router-link>
        </div>
      </section>

      <!-- Topics Grid -->
      <section class="topics-section">
        <div class="section-header">
          <h2 class="section-title">Explore os Tópicos</h2>
          <p class="section-subtitle">
            Conteúdo estruturado seguindo o framework ACC (Algoritmo, Código, Conquista)
          </p>
        </div>

        <div class="topics-grid">
          <router-link to="/complexidade" class="topic-card card card-interactive">
            <div class="topic-icon" style="--icon-color: var(--color-primary-600)">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <h3 class="topic-title">Complexidade</h3>
            <p class="topic-description">Entenda a notação Big O e análise de algoritmos com exemplos interativos</p>
            <span class="badge badge-primary">Fundamental</span>
          </router-link>

          <router-link to="/estruturas" class="topic-card card card-interactive">
            <div class="topic-icon" style="--icon-color: var(--color-secondary-600)">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </div>
            <h3 class="topic-title">Estruturas de Dados</h3>
            <p class="topic-description">Visualize Vector, Queue, Stack, Set, Map, Priority Queue e mais da STL</p>
            <span class="badge badge-secondary">Essencial</span>
          </router-link>

          <router-link to="/algoritmos" class="topic-card card card-interactive">
            <div class="topic-icon" style="--icon-color: var(--color-accent-600)">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1v6m0 6v6m8.66-15l-3 5.2m-11.32 0l-3-5.2m0 17.32l3-5.2m11.32 0l3 5.2"></path>
              </svg>
            </div>
            <h3 class="topic-title">Algoritmos</h3>
            <p class="topic-description">Busca Binária, BFS, Two Pointers, Prefix Sum e técnicas fundamentais</p>
            <span class="badge badge-accent">Avançado</span>
          </router-link>

          <router-link to="/problemas" class="topic-card card card-interactive">
            <div class="topic-icon" style="--icon-color: var(--color-error-600)">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
            </div>
            <h3 class="topic-title">Problemas Resolvidos</h3>
            <p class="topic-description">Soluções interativas de problemas reais da Maratona SBC</p>
            <span class="badge badge-primary">Prática</span>
          </router-link>
        </div>
      </section>

      <!-- Framework Section -->
      <section class="framework-section">
        <div class="section-header">
          <h2 class="section-title">Framework ACC</h2>
          <p class="section-subtitle">
            Metodologia estruturada para aprendizado de algoritmos
          </p>
        </div>

        <div class="framework-grid">
          <div class="framework-card">
            <div class="framework-number">1</div>
            <h3 class="framework-title">Algoritmo</h3>
            <p class="framework-description">Conceituação e Intuição</p>
            <ul class="framework-list">
              <li>Entenda o problema</li>
              <li>Visualize a solução</li>
              <li>Analise complexidade</li>
            </ul>
          </div>

          <div class="framework-card">
            <div class="framework-number">2</div>
            <h3 class="framework-title">Código</h3>
            <p class="framework-description">Codificação e Implementação</p>
            <ul class="framework-list">
              <li>Implemente em C++</li>
              <li>Use a STL</li>
              <li>Otimize o código</li>
            </ul>
          </div>

          <div class="framework-card">
            <div class="framework-number">3</div>
            <h3 class="framework-title">Conquista</h3>
            <p class="framework-description">Aplicação e Validação</p>
            <ul class="framework-list">
              <li>Resolva problemas</li>
              <li>Teste casos extremos</li>
              <li>Valide a solução</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="stats-section">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">10+</div>
            <div class="stat-label">Estruturas de Dados</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">15+</div>
            <div class="stat-label">Algoritmos</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">20+</div>
            <div class="stat-label">Visualizações</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">3</div>
            <div class="stat-label">Problemas da Maratona</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* ===== Container ===== */
.home {
  min-height: 100vh;
}

.home-container {
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
}

/* ===== Hero Section ===== */
.hero {
  padding: var(--spacing-3xl) 0;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
  background-color: var(--color-primary-50);
  color: var(--color-primary-700);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-xl);
}

.hero-badge-icon {
  flex-shrink: 0;
}

.hero-title {
  font-size: var(--text-5xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: var(--line-height-tight);
  margin-bottom: var(--spacing-lg);
}

.hero-subtitle {
  font-size: var(--text-xl);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-2xl);
}

.hero-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
}

/* ===== Feature Banner ===== */
.feature-banner {
  margin-bottom: var(--spacing-3xl);
}

.feature-banner-content {
  background: linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-700) 100%);
  color: var(--color-text-inverse);
  padding: var(--spacing-xl);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
  box-shadow: var(--shadow-lg);
  flex-wrap: wrap;
}

.feature-icon {
  flex-shrink: 0;
  opacity: 0.9;
}

.feature-text {
  flex: 1;
  min-width: 300px;
}

.feature-text h3 {
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-sm);
}

.feature-text p {
  font-size: var(--text-base);
  opacity: 0.95;
  line-height: var(--line-height-relaxed);
}

.feature-cta {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-xl);
  background-color: rgba(255, 255, 255, 0.2);
  color: var(--color-text-inverse);
  text-decoration: none;
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-semibold);
  backdrop-filter: blur(10px);
  transition: all var(--transition-base);
  white-space: nowrap;
}

.feature-cta:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* ===== Sections ===== */
.topics-section,
.framework-section {
  margin-bottom: var(--spacing-3xl);
}

.section-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.section-title {
  font-size: var(--text-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
}

.section-subtitle {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
}

/* ===== Topics Grid ===== */
.topics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
}

.topic-card {
  padding: var(--spacing-xl);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.topic-icon {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-lg);
  background-color: var(--color-neutral-100);
  color: var(--icon-color);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-sm);
  border: 2px solid var(--color-border);
}

.topic-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
}

.topic-description {
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  flex: 1;
  margin: 0;
}

/* ===== Framework Grid ===== */
.framework-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-xl);
}

.framework-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}

.framework-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}

.framework-number {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
  color: var(--color-text-inverse);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-lg);
}

.framework-title {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}

.framework-description {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
}

.framework-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.framework-list li {
  color: var(--color-text-secondary);
  padding-left: var(--spacing-lg);
  position: relative;
}

.framework-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--color-primary-600);
  font-weight: var(--font-weight-bold);
}

/* ===== Stats Section ===== */
.stats-section {
  margin-bottom: var(--spacing-3xl);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-xl);
}

.stat-card {
  text-align: center;
  padding: var(--spacing-xl);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.stat-number {
  font-size: var(--text-5xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-600);
  line-height: var(--line-height-tight);
  margin-bottom: var(--spacing-sm);
}

.stat-label {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .home-container {
    padding: 0 var(--spacing-md);
  }

  .hero {
    padding: var(--spacing-2xl) 0;
  }

  .hero-title {
    font-size: var(--text-3xl);
  }

  .hero-subtitle {
    font-size: var(--text-lg);
  }

  .feature-banner-content {
    flex-direction: column;
    text-align: center;
    padding: var(--spacing-lg);
  }

  .feature-text {
    min-width: auto;
  }

  .topics-grid,
  .framework-grid,
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: var(--text-3xl);
  }
}

@media (max-width: 640px) {
  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .hero-actions .btn {
    width: 100%;
  }

  .stat-number {
    font-size: var(--text-4xl);
  }
}
</style>
