# 🎉 Nova Funcionalidade: Problema "Mania de Par"

## 📊 Resumo da Implementação

Foi adicionado o **terceiro problema resolvido** à plataforma: **Mania de Par (2015)**, um problema de grafos que demonstra uma técnica avançada de Dijkstra com duplicação de estados.

---

## 🎯 Características Principais

### 1. **Problema Real da Maratona SBC**
- Problema da **Primeira Fase de 2015**
- Categoria: **Grafos**
- Dificuldade: **Médio**
- Conceito: **Dijkstra com Restrição de Paridade**

### 2. **Solver Interativo Completo**

#### 🎮 Interface de Entrada
- **3 exemplos pré-configurados**:
  - Exemplo 1: Caso simples (resposta: 5)
  - Exemplo 2: Caso impossível (resposta: -1)
  - Exemplo 3: Caso médio (resposta: 7)

- **Editor de grafo customizável**:
  - Configure número de cidades (C) e estradas (V)
  - Adicione estradas com origem, destino e custo
  - Remova estradas dinamicamente
  - Validação em tempo real

#### 📈 Visualização do Grafo
- **SVG interativo** com layout circular automático
- **Nós coloridos**:
  - 🟢 Verde: Cidade inicial (1)
  - 🔵 Azul: Cidade destino (C)
  - ⚪ Branco: Cidades intermediárias
- **Arestas rotuladas** com custos visíveis
- **Posicionamento automático** baseado no número de cidades

#### 📊 Tabela de Distâncias
- Visualização dos **dois estados** para cada cidade:
  - 🟢 **Estado PAR**: Distância com número par de arestas
  - 🟡 **Estado ÍMPAR**: Distância com número ímpar de arestas
- Valores ∞ para estados inalcançáveis
- Destaque da resposta final

#### 💡 Explicação do Conceito
- **Duplicação de estados** explicada visualmente
- Diagrama mostrando:
  - Estado (v, PAR)
  - Estado (v, ÍMPAR)
  - Transições entre estados
- Exemplo prático de como funciona

---

## 🔧 Implementação Técnica

### Componente Principal
**Arquivo**: `src/components/problems/ManiaParSolver.vue`

**Tamanho**: ~700 linhas de código

**Funcionalidades**:
```vue
- Gerenciamento de estado do grafo
- Implementação do algoritmo de Dijkstra
- Visualização SVG responsiva
- Sistema de presets
- Validação de entrada
- Cálculo de posições de nós
- Renderização de arestas
```

### Algoritmo Implementado

```javascript
// Pseudocódigo simplificado
function dijkstra() {
  // Inicializar dist[cidade][paridade] = ∞
  dist[1][0] = 0  // Cidade inicial com 0 arestas (PAR)

  priority_queue.push({ cost: 0, city: 1, parity: 0 })

  while (priority_queue não vazia) {
    { cost, city, parity } = priority_queue.pop()

    para cada vizinho v com custo w:
      nova_paridade = !parity  // Inverte a paridade
      novo_custo = cost + w

      se novo_custo < dist[v][nova_paridade]:
        dist[v][nova_paridade] = novo_custo
        priority_queue.push({ novo_custo, v, nova_paridade })
  }

  return dist[C][0]  // Resposta: estado PAR da cidade C
}
```

### Código C++ Completo
- Implementação otimizada usando `std::priority_queue`
- Uso de `tuple` para gerenciar estados
- Complexidade: **O(V log C)**
- Espaço: **O(C + V)**

---

## 📚 Valor Educacional

### Conceitos Demonstrados

1. **Duplicação de Estados**
   - Quando usar: Problemas com restrições adicionais
   - Como implementar: Expandir o espaço de estados
   - Exemplos: Paridade, cores, turnos

2. **Adaptação de Algoritmos Clássicos**
   - Dijkstra tradicional vs. modificado
   - Como adicionar dimensões ao estado
   - Tradeoff entre complexidade e funcionalidade

3. **Modelagem de Problemas**
   - Transformar restrições em estados
   - Identificar transições válidas
   - Garantir corretude do algoritmo

### Aplicações Práticas
- Problemas com restrições de paridade
- Jogos com turnos alternados
- Problemas com múltiplos tipos de recursos
- Otimização com restrições complexas

---

## 🎨 Interface do Usuário

### Layout Responsivo
- **Desktop**: Visualização completa com grafo largo
- **Tablet**: Layout adaptado
- **Mobile**: Componentes empilhados (recomenda-se desktop)

### Cores e Feedback Visual
- 🟢 **Verde**: Estados PAR, cidade inicial, sucesso
- 🟡 **Amarelo**: Estados ÍMPAR, destaque
- 🔵 **Azul**: Cidade destino
- 🔴 **Vermelho**: Impossível, erro
- 🟣 **Roxo**: Resultado final

### Animações
- Transições suaves entre estados
- Destaque de elementos importantes
- Feedback visual ao clicar botões

---

## 📖 Documentação Atualizada

### Arquivos Modificados
1. ✅ `README.md` - Adicionado "Mania de Par" à lista de problemas
2. ✅ `GUIA_DE_USO.md` - Instruções de uso do novo problema
3. ✅ `CHANGELOG.md` - Registro detalhado da atualização (v1.1.0)
4. ✅ `Problems.vue` - Adicionado à lista de problemas
5. ✅ `ManiaParSolver.vue` - Novo componente criado

### Novo Conteúdo
- 📄 `CHANGELOG.md` - Histórico de versões
- 📄 `NOVA_FUNCIONALIDADE.md` - Este documento

---

## 🚀 Como Usar

### Opção 1: Exemplos Pré-configurados
1. Acesse a seção **Problemas**
2. Clique em **"Mania de Par"**
3. Clique em um dos botões de exemplo:
   - **Exemplo 1**: Caso básico com 4 cidades
   - **Exemplo 2**: Caso impossível (sem estradas)
   - **Exemplo 3**: Caso com 5 cidades
4. Clique em **"Resolver com Dijkstra"**
5. Explore a visualização e a tabela

### Opção 2: Grafo Customizado
1. Configure C (cidades) e V (estradas)
2. Para cada estrada:
   - Digite cidade origem (u)
   - Digite cidade destino (v)
   - Digite custo (g)
3. Use **"+ Adicionar Estrada"** para mais estradas
4. Use **"×"** para remover estradas indesejadas
5. Clique em **"Resolver com Dijkstra"**

---

## 🎓 Integração com o TCC

### Alinhamento com a Seção 7.3
O problema implementa exatamente a solução apresentada na **Seção 7.3** do TCC:
- ✅ Enunciado completo
- ✅ Análise do problema
- ✅ Modelagem com duplicação de estados
- ✅ Implementação em C++
- ✅ Análise de complexidade
- ✅ Casos de teste validados

### Framework ACC Aplicado
1. **Algoritmo**: Explicação da duplicação de estados
2. **Código**: Implementação completa em C++
3. **Conquista**: Solver interativo com visualização

---

## 📊 Estatísticas da Implementação

- **Linhas de código**: ~700
- **Componentes Vue**: 1 novo (ManiaParSolver)
- **Arquivos modificados**: 5
- **Arquivos criados**: 2
- **Tempo de desenvolvimento**: ~1 hora
- **Exemplos incluídos**: 3
- **Casos de teste**: 3

---

## 🔮 Próximos Passos

Com esta implementação, a plataforma agora possui:
- ✅ 3 problemas resolvidos completos
- ✅ 3 categorias diferentes (Ad-Hoc, DP, Grafos)
- ✅ Visualizações interativas para todos
- ✅ Framework ACC em todos

### Sugestões de Expansão
1. Adicionar mais casos de teste
2. Implementar visualização do caminho solução
3. Adicionar animação passo a passo do Dijkstra
4. Permitir editar grafo visualmente (drag and drop)
5. Exportar configuração do grafo

---

## ✅ Conclusão

O problema **"Mania de Par"** foi implementado com sucesso, adicionando uma demonstração interativa completa de um algoritmo de grafos avançado. A implementação:

- ✨ É **educacionalmente rica**
- 🎨 Possui **visualização atraente**
- 💻 Tem **código bem documentado**
- 🎯 Está **alinhada ao TCC**
- 📚 Segue o **Framework ACC**

A plataforma agora oferece uma experiência de aprendizado completa em programação competitiva, cobrindo desde conceitos básicos até algoritmos avançados! 🎉
