# Arquitetura do Sistema

## 🏗️ Visão Geral

Sistema de automação para criação de repositórios baseado em **GitHub Issues Forms** e **GitHub Actions**.

```
┌─────────────────────────────────────────────────────────────────┐
│                         FLUXO COMPLETO                           │
└─────────────────────────────────────────────────────────────────┘

1. Developer                    2. GitHub                3. Automation
   │                               │                         │
   ├─> Preenche Issue Form        │                         │
   │   (.github/ISSUE_TEMPLATE)   │                         │
   │                               │                         │
   └─────────────────────────────>│                         │
                                   │                         │
                                   ├─> Cria Issue            │
                                   │   (com labels)          │
                                   │                         │
                                   ├─> Trigger Workflow      │
                                   │   (repo-generator.yml)  │
                                   │                         │
                                   └───────────────────────>│
                                                             │
                                                             ├─> Parse Issue
                                                             │   (stefanbuck/parser)
                                                             │
                                                             ├─> Update Title
                                                             │   (dynamic naming)
                                                             │
                                                             ├─> Validate Data
                                                             │   (naming, required)
                                                             │
                                                             ├─> Create Repo
                                                             │   (GitHub API)
                                                             │
                                                             ├─> Generate Files
                                                             │   (templates)
                                                             │
                                                             ├─> Initial Commit
                                                             │   (push code)
                                                             │
                                                             ├─> Configure Repo
                                                             │   (settings, topics)
                                                             │
                                                             └─> Comment Status
                                                                 (✅ Success)
```

---

## 📁 Estrutura de Arquivos

```
demo-reusable-workflows/
│
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── 01-new-repo-app.yml          # Form para aplicações
│   │   ├── 02-new-repo-infra.yml        # Form para infraestrutura
│   │   └── config.yml                   # Config dos templates
│   │
│   ├── workflows/
│   │   └── repo-generator.yml           # Workflow principal
│   │
│   └── scripts/
│       ├── generate-repository.js       # Lógica de criação
│       ├── templates-config.js          # Configuração de templates
│       └── validate-naming.js           # Validação de nomes
│
├── docs/
│   └── wiki/
│       ├── Home.md                      # Página inicial
│       ├── Naming-Conventions.md        # Convenções
│       ├── Troubleshooting.md           # Resolução de problemas
│       ├── FAQ.md                       # Perguntas frequentes
│       └── Architecture.md              # Este arquivo
│
└── templates/
    ├── java-17/                         # Template Java
    │   ├── src/
    │   ├── pom.xml
    │   ├── Dockerfile
    │   └── .github/workflows/
    │
    ├── nodejs-24/                       # Template Node.js
    │   ├── src/
    │   ├── package.json
    │   ├── Dockerfile
    │   └── .github/workflows/
    │
    └── terraform-aws/                   # Template Terraform
        ├── main.tf
        ├── variables.tf
        ├── outputs.tf
        └── .github/workflows/
```

---

## 🔄 Componentes Principais

### 1. Issue Forms (Templates)

**Localização:** `.github/ISSUE_TEMPLATE/*.yml`

**Responsabilidade:**
- Coletar informações estruturadas do usuário
- Validar campos obrigatórios (client-side)
- Adicionar labels automaticamente
- Gerar formato padronizado

**Tipos:**
- `01-new-repo-app.yml` - Aplicações
- `02-new-repo-infra.yml` - Infraestrutura

**Tecnologia:** GitHub Issue Forms (YAML)

---

### 2. Workflow Orchestrator

**Localização:** `.github/workflows/repo-generator.yml`

**Responsabilidade:**
- Disparar automação quando issue é criada
- Orquestrar todos os steps
- Gerenciar erros e retry
- Atualizar issue com status

**Trigger:**
```yaml
on:
  issues:
    types: [opened, edited]
```

**Filtros:**
```yaml
if: contains(github.event.issue.labels.*.name, 'new-repository')
```

**Steps:**
1. Checkout do código
2. Setup Node.js
3. Parse da issue
4. Update do título
5. Validação de dados
6. Criação do repositório
7. Comentário de status

**Tecnologia:** GitHub Actions

---

### 3. Issue Parser

**Action:** `stefanbuck/github-issue-parser@v3`

**Responsabilidade:**
- Converter markdown da issue em JSON estruturado
- Extrair valores dos campos
- Sanitizar inputs

**Input:**
```markdown
### Nome do Repositório
anteros-receiver-financial

### Stack Tecnológica
Java 17
```

**Output:**
```json
{
  "repo_name": "anteros-receiver-financial",
  "stack": "Java 17"
}
```

---

### 4. Repository Generator

**Localização:** `.github/scripts/generate-repository.js`

**Responsabilidade:**
- Criar repositório via GitHub API
- Gerar estrutura de arquivos
- Fazer commit inicial
- Configurar settings do repo

**Principais Funções:**

```javascript
async function createRepository(data) {
  // 1. Validar nome
  validateName(data.repo_name);
  
  // 2. Montar nome completo
  const fullName = buildFullName(data);
  
  // 3. Criar via API
  const repo = await octokit.repos.createInOrg({
    org: 'your-org',
    name: fullName,
    description: data.repo_description,
    private: data.visibility === 'Private',
    auto_init: false
  });
  
  // 4. Gerar arquivos
  const files = await generateFileStructure(data);
  
  // 5. Commit inicial
  await commitFiles(repo, files);
  
  // 6. Configurar topics
  await setTopics(repo, data);
  
  return repo;
}
```

**Tecnologia:** Node.js 20 + Octokit (GitHub API)

---

### 5. Template Engine

**Localização:** `.github/scripts/templates-config.js`

**Responsabilidade:**
- Mapear stack → template
- Substituir variáveis
- Gerar arquivos específicos

**Estrutura:**

```javascript
const templates = {
  'Java 17': {
    files: [
      'pom.xml',
      'src/main/java/App.java',
      'Dockerfile',
      '.github/workflows/ci.yml'
    ],
    variables: {
      PROJECT_NAME: '{{repo_name}}',
      GROUP_ID: 'com.company.{{domain}}',
      VERSION: '1.0.0-SNAPSHOT'
    }
  },
  'Node.js 24.12.0': {
    files: [
      'package.json',
      'src/index.js',
      'Dockerfile',
      '.github/workflows/ci.yml'
    ],
    variables: {
      NAME: '{{repo_name}}',
      VERSION: '1.0.0'
    }
  }
};
```

---

### 6. Naming Validator

**Localização:** `.github/scripts/validate-naming.js`

**Responsabilidade:**
- Validar formato do nome
- Verificar caracteres proibidos
- Sugerir correções

**Regras:**

```javascript
const rules = {
  pattern: /^[a-z0-9-]+$/,
  maxLength: 63,
  forbiddenChars: ['_', ' ', '@', '#'],
  mustStartWith: /^[a-z0-9]/,
  mustEndWith: /[a-z0-9]$/,
  noConsecutiveHyphens: /--/
};
```

---

## 🔐 Segurança

### Secrets Necessários

```yaml
PAT_TOKEN:
  description: Personal Access Token com permissões
  scopes:
    - repo (full control)
    - workflow
    - admin:org (create repos)
  expiration: 90 days
  rotation: automated
```

### Permissões do Workflow

```yaml
permissions:
  issues: write      # Comentar e atualizar issues
  contents: write    # Ler templates
  actions: read      # Executar workflows
```

### Validações de Segurança

1. **Input Sanitization:** Todos inputs são sanitizados
2. **Name Validation:** Previne path traversal
3. **Rate Limiting:** Máximo 5 repos por hora por usuário
4. **Audit Log:** Todas criações são logadas
5. **Approval Flow:** Repos críticos requerem aprovação

---

## 📊 Fluxo de Dados

### 1. Issue Creation
```
Developer → GitHub UI → Issue Form → Structured Data
```

### 2. Data Parsing
```
Issue Body (Markdown) → Parser → JSON → Validation → Clean Data
```

### 3. Repository Creation
```
Clean Data → Template Selection → File Generation → API Call → New Repo
```

### 4. Initial Setup
```
New Repo → File Commit → Settings Config → Topics → Teams → Ready
```

### 5. Notification
```
Success/Failure → Issue Comment → Slack Notification → Email (optional)
```

---

## ⚡ Performance

### Métricas Alvo

- **Time to Repository:** < 5 minutos
- **Workflow Duration:** < 3 minutos
- **Success Rate:** > 95%
- **Concurrent Jobs:** 10 simultâneos

### Otimizações

1. **Caching:** Node modules e dependencies
2. **Parallel Steps:** Parse e validação simultâneos
3. **Batch Operations:** Múltiplos arquivos em um commit
4. **CDN Templates:** Templates em cache

---

## 🔄 Fluxo de Erro

```
┌─────────────────────────────────────────────────────────┐
│                    ERROR HANDLING                        │
└─────────────────────────────────────────────────────────┘

Error Detected
    │
    ├─> Validation Error
    │   ├─> Comment on Issue (explain)
    │   ├─> Add label "validation-failed"
    │   └─> Wait for user fix
    │
    ├─> API Error (Transient)
    │   ├─> Retry (3x with backoff)
    │   └─> If still fails → Permanent Error
    │
    ├─> API Error (Permanent)
    │   ├─> Comment on Issue (error details)
    │   ├─> Add label "creation-failed"
    │   ├─> Notify Platform Team
    │   └─> Manual intervention required
    │
    └─> Timeout
        ├─> Cancel workflow
        ├─> Comment on Issue
        └─> Retry button available
```

---

## 🧪 Testing

### Levels

1. **Unit Tests:** Scripts individuais
2. **Integration Tests:** Workflow completo (sandbox)
3. **E2E Tests:** Issue → Repository (staging org)

### Test Repos

```
test-repos/
├── a5x-app-crx-test-java
├── a5x-app-pos-test-nodejs
└── a5x-infra-terraform-test
```

Criados e destruídos automaticamente.

---

## 📈 Monitoramento

### Métricas Coletadas

- Repositórios criados por dia/semana/mês
- Tempo médio de criação
- Taxa de sucesso/falha
- Stacks mais usadas
- Domínios mais populares
- Erros mais comuns

### Alertas

- ❌ Taxa de falha > 10%
- ⏱️ Tempo de criação > 10 minutos
- 🔥 > 3 falhas consecutivas
- 💾 Espaço de armazenamento baixo

---

## 🚀 Roadmap Técnico

### Q1 2026
- [ ] Dashboard de métricas
- [ ] Integração com Backstage
- [ ] Auto-scaling de workflows

### Q2 2026
- [ ] Templates Python e Go
- [ ] Multi-cloud support (Azure, GCP)
- [ ] Cost estimation automática

### Q3 2026
- [ ] AI-assisted template selection
- [ ] Auto-documentation generation
- [ ] Dependency vulnerability scanning

---

## 📚 Tecnologias Utilizadas

| Componente | Tecnologia | Versão |
|------------|------------|--------|
| Issue Forms | GitHub YAML | - |
| Workflow | GitHub Actions | - |
| Runtime | Node.js | 20.x |
| API Client | Octokit | 3.x |
| Parser | stefanbuck/parser | 3.x |
| Templates | Handlebars | 4.x |
| Validation | Joi | 17.x |

---

## 🔗 Integrações

### Atuais
- ✅ GitHub API
- ✅ Slack (notificações)
- ✅ GitHub Actions

### Planejadas
- 🔄 Backstage (service catalog)
- 🔄 Jira (ticket linking)
- 🔄 AWS (auto-provision resources)
- 🔄 Datadog (monitoring)

---

**Última atualização:** Janeiro 2026  
**Versão:** 1.0  
**Arquiteto:** Platform Engineering Team
