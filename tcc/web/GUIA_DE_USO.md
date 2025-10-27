# Guia de Uso - Plataforma Interativa de Programação Competitiva

## 🚀 Início Rápido

### 1. Instalação e Execução

```bash
# Clone ou acesse o diretório do projeto
cd web

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev

# Acesse no navegador
http://localhost:5174
```

## 📖 Navegação pela Plataforma

### Página Inicial (Home)
- **Visão geral** do material didático
- **Cards de navegação** para cada seção principal
- **Framework ACC** explicado visualmente

### Seção Complexidade
1. **Tabela interativa** com as principais complexidades
2. **Clique em uma complexidade** para ver:
   - Exemplo de código em C++
   - Visualização gráfica de crescimento
   - Análise prática
3. **Guia de decisão** para escolher a complexidade adequada

### Seção Estruturas de Dados
1. **Selecione uma estrutura** (Vector, Queue, Stack, etc.)
2. **Abas disponíveis**:
   - **Visualização**: Interaja com a estrutura em tempo real
   - **Código**: Veja a implementação em C++

#### Como usar as visualizações:

**Vector:**
- Digite um valor e clique em `push_back()` para adicionar
- Clique em `pop_back()` para remover o último elemento
- Veja a capacidade aumentar dinamicamente

**Queue:**
- `push()`: Adiciona elemento no BACK (final)
- `pop()`: Remove elemento do FRONT (início)
- Observe a animação FIFO (First In, First Out)

**Stack:**
- `push()`: Adiciona elemento no TOPO
- `pop()`: Remove elemento do TOPO
- Observe a animação LIFO (Last In, First Out)

### Seção Algoritmos
1. **Selecione um algoritmo** (Busca Binária, BFS, Two Pointers)
2. **Abas disponíveis**:
   - **Visualização**: Veja o algoritmo executando passo a passo
   - **Explicação**: Entenda o conceito
   - **Código**: Implementação em C++

#### Como usar as visualizações:

**Busca Binária:**
1. Digite o valor alvo
2. Clique em "Buscar"
3. Observe os ponteiros (L, R, M) se movendo
4. Veja o espaço de busca sendo reduzido pela metade

**BFS (Busca em Largura):**
1. Clique em "Iniciar BFS"
2. Ajuste a velocidade com o slider
3. Observe a fila e os nós sendo visitados
4. Veja as distâncias sendo calculadas

**Two Pointers:**
1. Escolha o padrão (Convergência ou Perseguição)
2. Digite a soma alvo
3. Clique em "Buscar Par"
4. Observe os ponteiros LEFT e RIGHT se movendo

### Seção Problemas
1. **Selecione um problema** da lista
2. **Framework ACC**:
   - **Algoritmo**: Leia o enunciado e análise
   - **Código**: Veja a implementação completa
   - **Conquista**: Teste interativamente com suas entradas

#### Como resolver problemas:

**Atenção à Reunião:**
1. Digite N (número de diretores)
2. Digite K (duração máxima)
3. Clique em "Resolver"
4. Veja a modelagem matemática passo a passo
5. Confira a verificação da resposta

**Ginástica:**
1. Digite T (minutos), M (mín), N (máx)
2. Clique em "Resolver"
3. Observe a evolução do vetor DP
4. Veja o resultado final com explicação

**Mania de Par:**
1. Escolha um dos 3 exemplos pré-configurados ou crie seu próprio grafo
2. Configure o número de cidades (C) e estradas (V)
3. Adicione/remova estradas com origem, destino e custo
4. Clique em "Resolver com Dijkstra"
5. Veja a visualização do grafo com estados PAR/ÍMPAR
6. Confira a tabela de distâncias para cada cidade
7. Entenda como a duplicação de estados funciona

## 💡 Dicas de Uso

### Para Estudantes Iniciantes
1. **Comece pela seção Complexidade** para entender Big O
2. **Explore as Estruturas de Dados** interativamente
3. **Experimente os Algoritmos** com diferentes valores
4. **Pratique com os Problemas** seguindo o framework ACC

### Para Professores
- Use as visualizações em aulas presenciais
- Demonstre conceitos abstratos de forma visual
- Incentive alunos a manipular as estruturas
- Use os problemas como exercícios práticos

### Para Preparação de Competições
1. **Revise a complexidade** antes de resolver problemas
2. **Entenda as estruturas** que cada problema requer
3. **Estude os algoritmos** com as visualizações
4. **Resolva os problemas** e compare com as soluções

## 🎯 Fluxo de Aprendizado Recomendado

```
1. Complexidade (Big O)
   ↓
2. Estruturas de Dados Básicas (Vector, Queue, Stack)
   ↓
3. Algoritmo: Busca Binária
   ↓
4. Problema: Atenção à Reunião (Ad-Hoc)
   ↓
5. Estruturas Avançadas (Set, Map, Priority Queue)
   ↓
6. Algoritmos: BFS e Two Pointers
   ↓
7. Problema: Ginástica (Programação Dinâmica)
   ↓
8. Algoritmo: BFS em Grafos
   ↓
9. Problema: Mania de Par (Grafos + Dijkstra)
```

## 🔧 Funcionalidades Interativas

### Controles Comuns
- **Botões de ação**: Execute operações nas estruturas
- **Campos de entrada**: Forneça valores personalizados
- **Velocidade**: Ajuste a velocidade das animações (quando disponível)
- **Reset**: Reinicie a visualização ao estado inicial

### Elementos Visuais
- 🟢 **Verde**: Estado ativo/correto
- 🔴 **Vermelho**: Elemento sendo removido/processado
- 🟡 **Amarelo**: Elemento destacado/atual
- ⚪ **Cinza**: Elemento inativo/eliminado

## 📱 Responsividade

A plataforma é responsiva e funciona em:
- 💻 **Desktop**: Experiência completa
- 📱 **Tablet**: Layout adaptado
- 📱 **Mobile**: Versão otimizada (recomenda-se desktop para melhor experiência)

## 🆘 Solução de Problemas

### A aplicação não inicia
```bash
# Reinstale as dependências
rm -rf node_modules
npm install
npm run dev
```

### Erros de visualização
- Limpe o cache do navegador (Ctrl+Shift+R)
- Use um navegador moderno (Chrome, Firefox, Edge)

### Animações lentas
- Ajuste o slider de velocidade
- Feche outras abas do navegador

## 📚 Recursos Adicionais

### Para aprender mais:
- **Vídeoaulas** (mencionadas no TCC)
- **Plataformas de prática**: Beecrowd, Codeforces, Neps Academy
- **Livros referenciados**: Cormen, Halim & Halim

### Sugestões de Estudo
1. Use as visualizações junto com os vídeos
2. Pratique no Beecrowd após cada seção
3. Participe de contests no Codeforces
4. Junte-se à comunidade da LAPC

---

**Dúvidas ou Sugestões?**
Entre em contato com a Liga Acadêmica de Programação Competitiva (LAPC) - Unoesc Joaçaba
