# Changelog - Histórico de Atualizações

## [1.1.0] - 2025-10-27

### ✨ Novos Recursos

#### Problema de Grafos: Mania de Par (2015)
- **Novo solver interativo** para o problema "Mania de Par"
- **Conceito demonstrado**: Duplicação de estados no Dijkstra
- **Funcionalidades**:
  - 3 exemplos pré-configurados (fácil, médio, impossível)
  - Editor de grafo customizável
  - Adicionar/remover estradas dinamicamente
  - Validação de entrada em tempo real
  - Visualização SVG do grafo:
    - Nós coloridos (início em verde, fim em azul)
    - Arestas com pesos visíveis
    - Layout circular automático
  - Tabela de distâncias com estados PAR e ÍMPAR
  - Explicação visual da duplicação de estados
  - Código C++ completo com Dijkstra otimizado
  - Análise de complexidade detalhada

### 📚 Detalhes Técnicos

**Componente**: `ManiaParSolver.vue`
- Implementação completa do algoritmo de Dijkstra com paridade
- Visualização de grafo usando SVG nativo
- Sistema de presets para facilitar testes
- Interface intuitiva para construção de grafos personalizados

**Conceito Educacional**:
- Demonstra a técnica de **duplicação de estados**
- Mostra como adaptar algoritmos clássicos para restrições adicionais
- Ilustra a transição de estados: (cidade, paridade)
- Ensina quando usar Dijkstra modificado vs. tradicional

### 🎨 Melhorias Visuais
- Estados PAR e ÍMPAR com cores distintas (verde/amarelo)
- Grafo circular com posicionamento automático de nós
- Tabela de distâncias com células coloridas
- Resultado destacado com gradiente roxo
- Caso impossível destacado em vermelho

---

## [1.0.0] - 2025-10-26

### 🎉 Lançamento Inicial

#### Páginas Implementadas
1. **Home** - Apresentação do material didático
2. **Complexidade** - Análise de Big O com visualizações
3. **Estruturas de Dados** - Vector, Queue, Stack interativos
4. **Algoritmos** - Busca Binária, BFS, Two Pointers
5. **Problemas** - Atenção à Reunião, Ginástica

#### Componentes de Visualização

**Estruturas de Dados**:
- `VectorVisualization.vue` - Array dinâmico interativo
- `QueueVisualization.vue` - Fila FIFO animada
- `StackVisualization.vue` - Pilha LIFO vertical

**Algoritmos**:
- `BinarySearchVisualization.vue` - Busca binária passo a passo
- `BFSVisualization.vue` - Busca em largura em grafos
- `TwoPointersVisualization.vue` - Técnica dos dois ponteiros

**Problemas**:
- `AtencaoReuniaoSolver.vue` - Problema Ad-Hoc
- `GinasticaSolver.vue` - Programação Dinâmica

#### Recursos
- ✅ Navegação com Vue Router
- ✅ Design responsivo
- ✅ Animações suaves
- ✅ Código C++ integrado
- ✅ Framework ACC implementado
- ✅ Documentação completa

#### Documentação
- `README.md` - Documentação técnica
- `GUIA_DE_USO.md` - Tutorial para usuários
- `ROADMAP.md` - Plano de melhorias futuras

---

## Próximas Atualizações Planejadas

### [1.2.0] - Planejado
- [ ] Implementar Set e Map com visualizações
- [ ] Adicionar DFS (Busca em Profundidade)
- [ ] Problema: Comedores de Pipocas (Busca Binária na Resposta)
- [ ] Modo escuro
- [ ] PWA (Progressive Web App)

### [2.0.0] - Futuro
- [ ] Estruturas avançadas (Segment Tree, Trie)
- [ ] Mais algoritmos de grafos (Dijkstra básico, Kruskal, Prim)
- [ ] Sistema de autenticação
- [ ] Editor de código integrado
- [ ] Backend com API

---

## Formato do Changelog

Este changelog segue o formato [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

### Tipos de Mudanças
- **Adicionado** para novos recursos
- **Modificado** para mudanças em recursos existentes
- **Descontinuado** para recursos que serão removidos
- **Removido** para recursos removidos
- **Corrigido** para correções de bugs
- **Segurança** para vulnerabilidades
