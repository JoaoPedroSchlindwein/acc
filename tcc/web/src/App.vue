<template>
  <div id="app">
    <header class="header">
      <div class="header-container">
        <router-link to="/" class="logo">
          <div class="logo-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4L4 10V22L16 28L28 22V10L16 4Z" fill="currentColor" opacity="0.2"/>
              <path d="M16 4L4 10M16 4L28 10M16 4V28M4 10V22M28 10V22M4 22L16 28M28 22L16 28" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="16" cy="16" r="3" fill="currentColor"/>
            </svg>
          </div>
          <span class="logo-text">Programação Competitiva</span>
        </router-link>

        <button class="mobile-menu-btn" @click="toggleMobileMenu" aria-label="Toggle menu">
          <svg v-if="!mobileMenuOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <nav class="nav" :class="{ 'nav-open': mobileMenuOpen }">
          <router-link to="/" class="nav-link" @click="closeMobileMenu">
            <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Início
          </router-link>
          <router-link to="/complexidade" class="nav-link" @click="closeMobileMenu">
            <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            Complexidade
          </router-link>
          <router-link to="/estruturas" class="nav-link" @click="closeMobileMenu">
            <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Estruturas
          </router-link>
          <router-link to="/algoritmos" class="nav-link" @click="closeMobileMenu">
            <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6m8.66-15l-3 5.2m-11.32 0l-3-5.2m0 17.32l3-5.2m11.32 0l3 5.2"></path>
            </svg>
            Algoritmos
          </router-link>
          <router-link to="/problemas" class="nav-link" @click="closeMobileMenu">
            <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Problemas
          </router-link>
          <router-link to="/demo-interativa" class="nav-link nav-link-featured" @click="closeMobileMenu">
            <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            Demo Interativa
            <span class="badge badge-accent">Novo</span>
          </router-link>
        </nav>
      </div>
    </header>

    <main class="main">
      <router-view />
    </main>

    <footer class="footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-section">
            <h3 class="footer-title">Sobre o Projeto</h3>
            <p class="footer-text">
              Material didático interativo desenvolvido como Trabalho de Conclusão de Curso
              para apoiar estudantes iniciantes em programação competitiva.
            </p>
          </div>
          <div class="footer-section">
            <h3 class="footer-title">Navegação</h3>
            <ul class="footer-links">
              <li><router-link to="/">Início</router-link></li>
              <li><router-link to="/complexidade">Complexidade</router-link></li>
              <li><router-link to="/estruturas">Estruturas de Dados</router-link></li>
              <li><router-link to="/algoritmos">Algoritmos</router-link></li>
              <li><router-link to="/problemas">Problemas</router-link></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3 class="footer-title">Instituição</h3>
            <p class="footer-text">
              <strong>Universidade do Oeste de Santa Catarina</strong><br>
              (Unoesc)
            </p>
            <p class="footer-text">
              <strong>Liga Acadêmica de Programação Competitiva</strong><br>
              (LAPC)
            </p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 TCC - Programação Competitiva. Desenvolvido para fins educacionais.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<style scoped>
/* ===== Layout Principal ===== */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ===== Header ===== */
.header {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
}

.header-container {
  max-width: var(--container-2xl);
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* ===== Logo ===== */
.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  text-decoration: none;
  color: var(--color-text-primary);
  font-weight: var(--font-weight-bold);
  font-size: var(--text-lg);
  transition: color var(--transition-base);
}

.logo:hover {
  color: var(--color-primary-600);
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary-600);
}

.logo-text {
  display: none;
}

@media (min-width: 640px) {
  .logo-text {
    display: inline;
  }
}

/* ===== Mobile Menu Button ===== */
.mobile-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm);
  background: transparent;
  border: none;
  color: var(--color-text-primary);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: background-color var(--transition-base);
}

.mobile-menu-btn:hover {
  background-color: var(--color-neutral-100);
}

@media (min-width: 768px) {
  .mobile-menu-btn {
    display: none;
  }
}

/* ===== Navigation ===== */
.nav {
  display: none;
  gap: var(--spacing-sm);
}

@media (min-width: 768px) {
  .nav {
    display: flex;
  }
}

@media (max-width: 767px) {
  .nav {
    position: fixed;
    top: 73px;
    left: 0;
    right: 0;
    background-color: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    box-shadow: var(--shadow-lg);
    flex-direction: column;
    padding: var(--spacing-md);
    gap: var(--spacing-xs);
    max-height: 0;
    overflow: hidden;
    transition: max-height var(--transition-base);
  }

  .nav.nav-open {
    display: flex;
    max-height: 500px;
  }
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  text-decoration: none;
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  font-size: var(--text-sm);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
  white-space: nowrap;
  position: relative;
}

.nav-link:hover {
  color: var(--color-primary-600);
  background-color: var(--color-primary-50);
}

.nav-link.router-link-active {
  color: var(--color-primary-700);
  background-color: var(--color-primary-50);
  font-weight: var(--font-weight-semibold);
}

.nav-link-featured {
  color: var(--color-primary-600);
  font-weight: var(--font-weight-semibold);
}

.nav-link-featured:hover {
  background-color: var(--color-primary-100);
  color: var(--color-primary-700);
}

.nav-icon {
  flex-shrink: 0;
}

/* ===== Main Content ===== */
.main {
  flex: 1;
  padding: var(--spacing-2xl) 0;
  background-color: var(--color-background-alt);
}

/* ===== Footer ===== */
.footer {
  background-color: var(--color-neutral-900);
  color: var(--color-neutral-300);
  padding: var(--spacing-3xl) 0 var(--spacing-xl);
  margin-top: auto;
}

.footer-container {
  max-width: var(--container-2xl);
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-2xl);
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.footer-title {
  font-size: var(--text-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-inverse);
  margin-bottom: var(--spacing-sm);
}

.footer-text {
  font-size: var(--text-sm);
  line-height: var(--line-height-relaxed);
  color: var(--color-neutral-400);
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.footer-links a {
  color: var(--color-neutral-400);
  text-decoration: none;
  font-size: var(--text-sm);
  transition: color var(--transition-base);
}

.footer-links a:hover {
  color: var(--color-text-inverse);
}

.footer-bottom {
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--color-neutral-800);
  text-align: center;
  color: var(--color-neutral-500);
  font-size: var(--text-sm);
}

/* ===== Responsive Adjustments ===== */
@media (max-width: 640px) {
  .header-container {
    padding: var(--spacing-md);
  }

  .main {
    padding: var(--spacing-xl) 0;
  }

  .footer {
    padding: var(--spacing-2xl) 0 var(--spacing-md);
  }

  .footer-container {
    padding: 0 var(--spacing-md);
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }
}
</style>
