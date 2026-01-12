# 📋 Exemplos de Uso - Gerador de Repositórios

Exemplos práticos de como preencher o formulário de criação de repositórios para diferentes cenários.

## 🎯 Cenário 1: API REST Java com AWS ECS

### Caso de Uso
Microserviço de gestão de usuários para aplicação enterprise.

### Formulário
```yaml
Nome do Repositório: user-management-api
Descrição: API REST para gerenciamento de usuários e permissões
Stack: Java (Spring Boot)
Deployment: AWS ECS (Container)
Database: PostgreSQL
CI/CD: GitHub Actions (Completo - Feature, Develop, Release)

Features:
☑ Docker e Docker Compose
☑ Terraform (Infraestrutura como Código)
☑ SonarQube (Análise de Qualidade)
☑ OWASP Dependency Check (Segurança)
☑ Jacoco (Cobertura de Código)
☑ Pre-commit Hooks
☑ README com badges
☑ Contributing Guidelines

Visibilidade: Private
Time/Squad: Backend Squad
```

### Resultado Esperado
```
user-management-api/
├── src/main/java/com/example/usermanagement/
│   ├── controller/UserController.java
│   ├── service/UserService.java
│   ├── repository/UserRepository.java
│   └── model/User.java
├── src/main/resources/
│   ├── application.properties
│   └── db/migration/
├── infra/
│   ├── main.tf
│   ├── ecs/task-definition.json
│   └── rds.tf
├── Dockerfile (multi-stage)
├── docker-compose.yml (com PostgreSQL)
└── .github/workflows/
    ├── feature-java.yml
    ├── develop-java.yml
    └── deploy-ecs.yml
```

---

## 🎯 Cenário 2: Frontend React com Lambda

### Caso de Uso
Dashboard administrativo serverless com backend em Lambda.

### Formulário
```yaml
Nome do Repositório: admin-dashboard-frontend
Descrição: Dashboard administrativo React com backend serverless
Stack: Node.js (Express)
Deployment: AWS Lambda (Serverless)
Database: DynamoDB
CI/CD: GitHub Actions (Completo - Feature, Develop, Release)

Features:
☑ Docker e Docker Compose
☑ Terraform (Infraestrutura como Código)
☐ SonarQube (Análise de Qualidade)
☐ OWASP Dependency Check (Segurança)
☐ Jacoco (Cobertura de Código)
☑ Pre-commit Hooks
☑ README com badges
☐ Contributing Guidelines

Visibilidade: Private
Time/Squad: Frontend Squad
```

### Resultado Esperado
```
admin-dashboard-frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── utils/
├── lambda/
│   ├── handler.js
│   └── functions/
├── infra/
│   ├── main.tf
│   ├── lambda/
│   └── dynamodb.tf
├── package.json
├── serverless.yml
└── .github/workflows/
    ├── feature-frontend.yml
    └── deploy-lambda.yml
```

---

## 🎯 Cenário 3: API Python ML com Kubernetes

### Caso de Uso
Serviço de Machine Learning para predições em tempo real.

### Formulário
```yaml
Nome do Repositório: ml-prediction-service
Descrição: Serviço de predições ML em tempo real usando FastAPI
Stack: Python (FastAPI)
Deployment: AWS EKS (Kubernetes)
Database: Redis
CI/CD: GitHub Actions (Completo - Feature, Develop, Release)

Features:
☑ Docker e Docker Compose
☑ Terraform (Infraestrutura como Código)
☑ SonarQube (Análise de Qualidade)
☐ OWASP Dependency Check (Segurança)
☐ Jacoco (Cobertura de Código)
☑ Pre-commit Hooks
☑ README com badges
☑ Contributing Guidelines

Visibilidade: Private
Time/Squad: Data Science Team
```

### Resultado Esperado
```
ml-prediction-service/
├── app/
│   ├── main.py
│   ├── models/
│   ├── routers/
│   └── services/
├── k8s/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── hpa.yaml
│   └── ingress.yaml
├── infra/
│   ├── main.tf
│   └── eks/
├── requirements.txt
├── Dockerfile
└── .github/workflows/
    ├── feature-python.yml
    └── deploy-eks.yml
```

---

## 🎯 Cenário 4: Legacy App On-Premise

### Caso de Uso
Migração de aplicação .NET legada para containers.

### Formulário
```yaml
Nome do Repositório: legacy-erp-service
Descrição: Sistema ERP legado migrado para containers
Stack: .NET Core
Deployment: On Premise
Database: MySQL
CI/CD: Jenkins

Features:
☑ Docker e Docker Compose
☐ Terraform (Infraestrutura como Código)
☐ SonarQube (Análise de Qualidade)
☐ OWASP Dependency Check (Segurança)
☐ Jacoco (Cobertura de Código)
☐ Pre-commit Hooks
☑ README com badges
☐ Contributing Guidelines

Visibilidade: Private
Time/Squad: Legacy Systems Team
```

### Resultado Esperado
```
legacy-erp-service/
├── Controllers/
├── Services/
├── Models/
├── appsettings.json
├── Dockerfile
├── docker-compose.yml (MySQL)
├── Jenkinsfile
└── deploy/
    └── deploy.sh
```

---

## 🎯 Cenário 5: Microserviço Go com Cloud Run

### Caso de Uso
API de alta performance em Go para processamento de eventos.

### Formulário
```yaml
Nome do Repositório: event-processor-api
Descrição: API de processamento de eventos de alta performance
Stack: Go
Deployment: Google Cloud Run
Database: Redis
CI/CD: GitHub Actions (Básico - Build e Test)

Features:
☑ Docker e Docker Compose
☑ Terraform (Infraestrutura como Código)
☐ SonarQube (Análise de Qualidade)
☐ OWASP Dependency Check (Segurança)
☐ Jacoco (Cobertura de Código)
☑ Pre-commit Hooks
☑ README com badges
☐ Contributing Guidelines

Visibilidade: Private
Time/Squad: Platform Team
```

### Resultado Esperado
```
event-processor-api/
├── cmd/api/
│   └── main.go
├── internal/
│   ├── handler/
│   ├── service/
│   └── repository/
├── pkg/
├── infra/
│   ├── main.tf
│   └── cloudrun/
├── go.mod
├── go.sum
├── Dockerfile
└── .github/workflows/
    └── ci.yml
```

---

## 🎯 Cenário 6: Multi-Stack com Azure

### Caso de Uso
Sistema multi-camadas com frontend e backend separados.

### Backend (Issue 1)
```yaml
Nome do Repositório: ecommerce-backend-api
Descrição: Backend da plataforma de e-commerce
Stack: Java (Spring Boot)
Deployment: Azure Container Instances
Database: PostgreSQL
CI/CD: GitHub Actions (Completo - Feature, Develop, Release)

Features: [Todos marcados]
Visibilidade: Private
Time/Squad: Backend Squad
```

### Frontend (Issue 2)
```yaml
Nome do Repositório: ecommerce-frontend-web
Descrição: Frontend web da plataforma de e-commerce
Stack: Node.js (Express)
Deployment: Azure Container Instances
Database: Nenhum
CI/CD: GitHub Actions (Completo - Feature, Develop, Release)

Features: [Docker, Pre-commit, README]
Visibilidade: Private
Time/Squad: Frontend Squad
```

---

## 📊 Comparação de Configurações

| Cenário | Stack | Deploy | DB | Terraform | Docker | CI/CD |
|---------|-------|--------|----|-----------| -------|-------|
| API Java Enterprise | Java | ECS | PostgreSQL | ✅ | ✅ | Completo |
| Dashboard Serverless | Node.js | Lambda | DynamoDB | ✅ | ✅ | Completo |
| ML Service | Python | EKS | Redis | ✅ | ✅ | Completo |
| Legacy App | .NET | On-Prem | MySQL | ❌ | ✅ | Jenkins |
| High Performance API | Go | Cloud Run | Redis | ✅ | ✅ | Básico |
| E-commerce Backend | Java | Azure ACI | PostgreSQL | ✅ | ✅ | Completo |

---

## 🎨 Templates de Issues Prontos

### Template: Microserviço Básico
```markdown
**Nome**: meu-servico-api
**Descrição**: Descrição do serviço
**Stack**: Java (Spring Boot)
**Deploy**: AWS ECS (Container)
**DB**: PostgreSQL
**CI/CD**: GitHub Actions (Completo)
**Features**: Docker, Terraform, SonarQube, Pre-commit, README
**Visibilidade**: Private
**Team**: Meu Time
```

### Template: Frontend Moderno
```markdown
**Nome**: meu-app-frontend
**Descrição**: Aplicação frontend React
**Stack**: Node.js (Express)
**Deploy**: AWS Lambda (Serverless)
**DB**: Nenhum
**CI/CD**: GitHub Actions (Completo)
**Features**: Docker, Pre-commit, README, Contributing
**Visibilidade**: Private
**Team**: Frontend Team
```

### Template: Data Processing
```markdown
**Nome**: data-processor
**Descrição**: Processamento de dados em lote
**Stack**: Python (FastAPI)
**Deploy**: AWS Lambda (Serverless)
**DB**: DynamoDB
**CI/CD**: GitHub Actions (Básico)
**Features**: Docker, README
**Visibilidade**: Private
**Team**: Data Team
```

---

## 🔍 Checklist Pré-Criação

Antes de submeter a issue, verifique:

- [ ] Nome do repositório é único e descritivo
- [ ] Descrição é clara e concisa
- [ ] Stack selecionada é apropriada para o caso de uso
- [ ] Deployment target está alinhado com infraestrutura disponível
- [ ] Database escolhido atende aos requisitos
- [ ] Features selecionadas são realmente necessárias
- [ ] Time/Squad está correto
- [ ] Visibilidade (public/private) é adequada
- [ ] Você tem permissão para criar o repositório

---

## 💡 Dicas de Nomenclatura

### Boas Práticas
✅ `user-authentication-api`
✅ `payment-processor-service`
✅ `admin-dashboard-frontend`
✅ `ml-prediction-engine`

### Evite
❌ `my-project`
❌ `test123`
❌ `NewRepo`
❌ `api_service`

### Padrões Recomendados
- Use kebab-case (hífens)
- Seja descritivo
- Inclua tipo (api, service, frontend, etc)
- Máximo 50 caracteres
- Sem espaços ou caracteres especiais

---

## 🚀 Próximos Passos Após Criação

1. **Clone o Repositório**
   ```bash
   git clone https://github.com/org/seu-novo-repo.git
   cd seu-novo-repo
   ```

2. **Configure Secrets**
   ```bash
   gh secret set AWS_ACCESS_KEY_ID
   gh secret set AWS_SECRET_ACCESS_KEY
   gh secret set DATABASE_URL
   ```

3. **Personalize**
   - Ajuste README.md
   - Configure application.properties
   - Adicione dependências específicas

4. **Desenvolva**
   ```bash
   git checkout -b feature/minha-feature
   # Desenvolva...
   git commit -m "feat: nova funcionalidade"
   git push
   ```

5. **CI/CD Automático**
   - Pull Request criado
   - Workflows executam automaticamente
   - Merge após aprovação
   - Deploy automático (se configurado)

---

## 📚 Recursos Adicionais

- [📖 Guia Rápido](QUICKSTART.md)
- [📘 Documentação Completa](REPO_GENERATOR.md)
- [🏗️ Arquitetura](ARCHITECTURE.md)
- [⚙️ Configuração](templates-config.js)

---

**Última atualização**: Janeiro 2026
**Versão**: 1.0.0
