# Guia Rápido - Gerador de Repositórios

## 🎯 Início Rápido (5 minutos)

### 1. Configurar Token (uma vez)

```bash
# 1. Gere um PAT token em: https://github.com/settings/tokens
# 2. Selecione escopos: repo, workflow, admin:org
# 3. No seu repositório: Settings → Secrets → New secret
#    Nome: PAT_TOKEN
#    Valor: seu_token_aqui
```

### 2. Criar Novo Repositório

1. **Abra uma Issue**
   - Vá em: `Issues` → `New Issue`
   - Selecione: **"🚀 Novo Repositório"**

2. **Preencha o Formulário**
   ```
   Nome: minha-api-usuarios
   Stack: Java (Spring Boot)
   Deploy: AWS ECS (Container)
   Database: PostgreSQL
   ```

3. **Submeta e Aguarde**
   - ⏱️ ~3-5 minutos
   - 💬 Você receberá comentários com o progresso
   - 🔗 Link do novo repo será postado

## 📸 Preview Visual

### Issue Form
```
┌─────────────────────────────────────────┐
│ 🚀 Novo Repositório                     │
├─────────────────────────────────────────┤
│ Nome: [minha-api-usuarios            ]  │
│                                         │
│ Stack: [Java (Spring Boot)       ▼]    │
│                                         │
│ Deploy: [AWS ECS (Container)     ▼]    │
│                                         │
│ Database: [PostgreSQL            ▼]    │
│                                         │
│ Features:                               │
│ ☑ Docker e Docker Compose              │
│ ☑ Terraform                             │
│ ☑ SonarQube                             │
│                                         │
│ [Submit New Issue]                      │
└─────────────────────────────────────────┘
```

### Resultado (Estrutura Gerada)
```
minha-api-usuarios/
├── .github/
│   ├── workflows/
│   │   ├── feature-java.yml
│   │   └── develop-java.yml
│   └── ISSUE_TEMPLATE/
├── src/
│   ├── main/
│   │   ├── java/
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── infra/
│   ├── main.tf
│   ├── variables.tf
│   └── ecs/
│       └── task-definition.json
├── Dockerfile
├── docker-compose.yml
├── pom.xml
├── README.md
└── .gitignore
```

## 🎨 Exemplos de Uso

### Exemplo 1: API Java com ECS
```yaml
Nome: servico-pagamentos
Descrição: API REST para processamento de pagamentos
Stack: Java (Spring Boot)
Deployment: AWS ECS (Container)
Database: PostgreSQL
CI/CD: GitHub Actions (Completo)
Features: Docker, Terraform, SonarQube, OWASP
```

**Resultado**: Repositório com Spring Boot, Dockerfile multi-stage, Terraform para ECS, workflows completos (feature, develop, deploy), integração com SonarQube e security scans.

### Exemplo 2: Frontend Node.js
```yaml
Nome: dashboard-admin
Descrição: Dashboard administrativo React
Stack: Node.js (Express)
Deployment: AWS Lambda (Serverless)
Database: DynamoDB
CI/CD: GitHub Actions (Básico)
Features: Docker, Pre-commit Hooks, README com badges
```

**Resultado**: Repositório Node.js com Express, configuração serverless para Lambda, DynamoDB local para dev, linting e prettier configurados.

### Exemplo 3: Microserviço Python
```yaml
Nome: ml-prediction-service
Descrição: Serviço de predições ML
Stack: Python (FastAPI)
Deployment: AWS EKS (Kubernetes)
Database: Redis
CI/CD: GitHub Actions (Completo)
Features: Docker, Kubernetes manifests, Jacoco
```

**Resultado**: FastAPI com Kubernetes deployments, Redis para cache, helm charts, CI/CD com deploy automático no EKS.

## 🔍 Monitoramento

### Ver Status da Criação

```bash
# Via CLI
gh issue view 123  # número da issue

# Via Web
# Vá em: Actions → Workflow runs
```

### Comentários Esperados na Issue

1. **Inicial** (imediato)
   ```
   🚀 Solicitação Recebida!
   
   Configurações:
   - 📦 Repositório: minha-api-usuarios
   - 💻 Stack: Java (Spring Boot)
   ...
   ⏳ Status: Em processamento...
   ```

2. **Sucesso** (~3-5 min)
   ```
   ✅ Repositório Criado com Sucesso!
   
   🔗 Link: https://github.com/org/minha-api-usuarios
   
   Próximos Passos:
   1. Clone o repositório
   2. Configure secrets
   3. Comece a desenvolver! 🚀
   ```

3. **Erro** (se houver problema)
   ```
   ❌ Erro na Criação do Repositório
   
   Verifique:
   - ✓ Nome válido
   - ✓ Repo não existe
   - ✓ Permissões adequadas
   ```

## ⚡ Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| "Repository already exists" | Use nome diferente |
| "Token permission denied" | Regenere PAT com escopos corretos |
| Workflow não inicia | Verifique label `new-repository` na issue |
| Arquivos não criados | Veja logs em Actions tab |

## 🎓 Próximos Passos

Após criar seu repositório:

### 1. Clone e Configure
```bash
git clone https://github.com/org/seu-repo.git
cd seu-repo
```

### 2. Configure Secrets (se usando AWS)
```bash
# Via CLI
gh secret set AWS_ACCESS_KEY_ID
gh secret set AWS_SECRET_ACCESS_KEY
gh secret set AWS_REGION

# Ou via Web: Settings → Secrets → Actions
```

### 3. Personalize
- Edite README.md com detalhes específicos
- Ajuste configurações em `application.properties`
- Adicione dependências necessárias

### 4. Desenvolva
```bash
# Crie branch
git checkout -b feature/minha-feature

# Desenvolva e commite
git add .
git commit -m "feat: adiciona nova funcionalidade"

# Push (aciona CI)
git push origin feature/minha-feature
```

## 📚 Documentação Completa

- 📖 [Documentação Completa](REPO_GENERATOR.md)
- 🔧 [Configuração de Templates](templates-config.js)
- 🎯 [Issue Template](.github/ISSUE_TEMPLATE/new-repository.yml)
- 🤖 [Script Gerador](.github/scripts/generate-repository.js)

## 💡 Dicas

- ✅ Use nomes descritivos e kebab-case
- ✅ Preencha todos os campos obrigatórios
- ✅ Revise configurações antes de submeter
- ✅ Configure secrets antes de fazer deploy
- ✅ Leia o README gerado no novo repo

## 🆘 Suporte

- 📝 Abra issue com label `support`
- 💬 Entre em contato com time DevOps
- 📖 Consulte documentação completa

---

**Tempo médio de criação**: 3-5 minutos
**Taxa de sucesso**: >95%
**Repositórios criados**: [contador automático]
