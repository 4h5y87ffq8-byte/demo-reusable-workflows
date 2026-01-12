# 🎯 Sistema de Geração Automática de Repositórios

```mermaid
flowchart TD
    Start([👤 Desenvolvedor]) --> Issue[📝 Criar Issue<br/>new-repository]
    Issue --> Form[📋 Preencher Formulário<br/>Stack, Deploy, DB]
    Form --> Submit[✅ Submeter Issue]
    
    Submit --> Trigger{🔄 GitHub Actions<br/>Detecta Issue}
    
    Trigger --> Parse[🔍 Parse Issue Body<br/>Extrair Dados]
    Parse --> Validate{✔️ Validar<br/>Dados}
    
    Validate -->|❌ Inválido| Comment1[💬 Comentar Erro<br/>na Issue]
    Comment1 --> End1([❌ Fim])
    
    Validate -->|✅ Válido| Comment2[💬 Comentar<br/>Processando...]
    Comment2 --> Generate[🏗️ Gerar Repositório<br/>via API]
    
    Generate --> CreateRepo[📦 Criar Repo<br/>no GitHub]
    CreateRepo --> AddFiles[📄 Adicionar Arquivos<br/>Templates]
    
    AddFiles --> Dockerfile{🐳 Precisa<br/>Docker?}
    Dockerfile -->|✅ Sim| Docker[📄 Adicionar<br/>Dockerfile]
    Dockerfile -->|❌ Não| Terraform{🏗️ Precisa<br/>Terraform?}
    Docker --> Terraform
    
    Terraform -->|✅ Sim| TF[📄 Adicionar<br/>infra/*.tf]
    Terraform -->|❌ Não| Workflows{🔄 Configurar<br/>CI/CD?}
    TF --> Workflows
    
    Workflows -->|✅ Sim| GHA[📄 Adicionar<br/>Workflows]
    Workflows -->|❌ Não| Features
    GHA --> Features
    
    Features[✨ Adicionar Features<br/>SonarQube, OWASP, etc]
    Features --> Success[✅ Repositório Criado]
    
    Success --> Comment3[💬 Comentar Sucesso<br/>com Link]
    Comment3 --> Label[🏷️ Adicionar Label<br/>completed]
    Label --> Close[🔒 Fechar Issue<br/>após 5min]
    Close --> Notify[📧 Notificar<br/>Desenvolvedor]
    Notify --> End2([✅ Concluído])

    style Start fill:#e1f5ff
    style Issue fill:#fff3cd
    style Generate fill:#d4edda
    style Success fill:#d4edda
    style End2 fill:#d4edda
    style Comment1 fill:#f8d7da
    style End1 fill:#f8d7da
```

## 📊 Arquitetura do Sistema

```mermaid
graph TB
    subgraph "GitHub Repository"
        IT[📝 Issue Template<br/>new-repository.yml]
        WF[⚙️ Workflow<br/>repo-generator.yml]
        JS[🔧 Script<br/>generate-repository.js]
        CFG[⚙️ Config<br/>templates-config.js]
    end
    
    subgraph "Execution Flow"
        IT -->|Cria| ISS[📋 Issue]
        ISS -->|Aciona| WF
        WF -->|Parseia| PARSE[🔍 Parser]
        PARSE -->|Extrai| DATA[📊 Dados]
        DATA -->|Passa para| JS
        JS -->|Lê| CFG
    end
    
    subgraph "GitHub API"
        JS -->|POST| API1[🔌 Create Repo]
        API1 -->|Retorna| REPO[📦 Novo Repo]
        JS -->|PUT| API2[🔌 Create Files]
        API2 -->|Popula| REPO
    end
    
    subgraph "Generated Repository"
        REPO --> SRC[📁 src/]
        REPO --> DOCKER[🐳 Dockerfile]
        REPO --> TERRA[🏗️ infra/]
        REPO --> GHA[🔄 .github/]
        REPO --> README[📖 README.md]
    end
    
    style IT fill:#fff3cd
    style WF fill:#d4edda
    style JS fill:#cfe2ff
    style REPO fill:#d4edda
```

## 🔄 Fluxo de Dados

```mermaid
sequenceDiagram
    actor Dev as 👤 Desenvolvedor
    participant GH as 📦 GitHub
    participant Issue as 📝 Issue
    participant Actions as ⚙️ Actions
    participant Script as 🔧 Script
    participant API as 🔌 API

    Dev->>GH: Abre "Novo Repositório"
    GH->>Dev: Mostra formulário
    Dev->>Issue: Preenche e submete
    Issue->>Actions: Trigger on issues.opened
    
    Actions->>Actions: Parse issue body
    Actions->>Script: Executa generate-repository.js
    
    Script->>API: POST /repos (criar repo)
    API->>Script: Retorna repo criado
    
    loop Para cada arquivo
        Script->>Script: Gera conteúdo
        Script->>API: PUT /contents/{path}
        API->>Script: Confirmação
    end
    
    Script->>Actions: Sucesso
    Actions->>Issue: Comenta resultado
    Actions->>Issue: Adiciona label
    Actions->>Issue: Fecha após 5min
    
    Issue->>Dev: Notificação
```

## 📦 Mapeamento de Templates

```mermaid
mindmap
  root((Templates))
    Stacks
      Java
        Spring Boot
        Maven/Gradle
        JUnit
      Node.js
        Express
        npm/yarn
        Jest
      Python
        FastAPI
        pip/poetry
        pytest
      .NET
        ASP.NET Core
        NuGet
        xUnit
      Go
        Standard lib
        go mod
        go test
    
    Deployment
      AWS
        ECS
        EKS
        Lambda
      Azure
        ACI
        AKS
      GCP
        Cloud Run
        GKE
      On Premise
        Docker
        VM
    
    Databases
      Relational
        PostgreSQL
        MySQL
      NoSQL
        MongoDB
        DynamoDB
      Cache
        Redis
        Memcached
    
    Features
      Docker
        Dockerfile
        Compose
      IaC
        Terraform
        CloudFormation
      Quality
        SonarQube
        ESLint
      Security
        OWASP
        Snyk
```

## 🗂️ Estrutura de Arquivos Gerados

```
novo-repositorio/
├── 📁 .github/
│   ├── 📁 workflows/
│   │   ├── feature.yml          # CI para features
│   │   ├── develop.yml          # CI/CD para develop
│   │   └── deploy.yml           # Deploy production
│   ├── 📁 ISSUE_TEMPLATE/
│   │   ├── bug.yml
│   │   └── feature.yml
│   └── 📄 pull_request_template.md
│
├── 📁 src/                      # Código fonte
│   ├── 📁 main/
│   │   ├── 📁 java|js|py/       # Código da aplicação
│   │   └── 📁 resources/        # Configurações
│   └── 📁 test/                 # Testes
│
├── 📁 infra/                    # Infraestrutura como código
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── 📁 ecs|eks|lambda/       # Configs específicas
│
├── 📁 docs/                     # Documentação
│   ├── architecture.md
│   └── api.md
│
├── 🐳 Dockerfile                # Container definition
├── 🐳 docker-compose.yml        # Local development
├── 📦 pom.xml|package.json      # Dependencies
├── 📖 README.md                 # Documentação principal
├── 📄 .gitignore
├── 📄 .dockerignore
└── 📝 CHANGELOG.md
```

## 🎯 Matriz de Compatibilidade

| Stack | ECS | EKS | Lambda | On-Prem |
|-------|-----|-----|--------|---------|
| Java | ✅ | ✅ | ✅ | ✅ |
| Node.js | ✅ | ✅ | ✅ | ✅ |
| Python | ✅ | ✅ | ✅ | ✅ |
| .NET | ✅ | ✅ | ❌ | ✅ |
| Go | ✅ | ✅ | ✅ | ✅ |

## 📈 Timeline de Execução

```
┌─────────────────────────────────────────────────────────────┐
│ Tempo  │ Ação                                                │
├────────┼─────────────────────────────────────────────────────┤
│ t+0s   │ 📝 Issue criada                                     │
│ t+5s   │ ⚙️  Workflow iniciado                                │
│ t+10s  │ 🔍 Dados parseados                                   │
│ t+15s  │ ✅ Validação concluída                               │
│ t+20s  │ 💬 Primeiro comentário                               │
│ t+30s  │ 🏗️  Repositório criado                               │
│ t+45s  │ 📄 Arquivos sendo adicionados                        │
│ t+90s  │ 📦 Template completo                                 │
│ t+120s │ ✅ Sucesso! Link postado                             │
│ t+5m   │ 🔒 Issue fechada automaticamente                     │
└─────────────────────────────────────────────────────────────┘
```

## 🔐 Fluxo de Segurança

```mermaid
graph LR
    A[🔑 PAT Token] --> B{Validar<br/>Escopos}
    B -->|✅ OK| C[Criar Repo]
    B -->|❌ Falha| D[Rejeitar]
    
    C --> E{Validar<br/>Nome}
    E -->|✅ Único| F[Prosseguir]
    E -->|❌ Existe| G[Erro]
    
    F --> H[Sanitizar<br/>Inputs]
    H --> I[Gerar<br/>Arquivos]
    I --> J[Configurar<br/>Branch Protection]
    J --> K[Habilitar<br/>Security Features]
    K --> L[✅ Completo]
    
    style A fill:#fff3cd
    style L fill:#d4edda
    style D fill:#f8d7da
    style G fill:#f8d7da
```

---

**Legenda:**
- 📝 Issue/Template
- ⚙️ Workflow/Automação
- 🔧 Script/Código
- 🔌 API/Integração
- 📦 Repositório
- 🐳 Docker
- 🏗️ Infraestrutura
- ✅ Sucesso
- ❌ Erro
